import { createContext, useContext, useState, useCallback, useRef, ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { parseVoiceCommand, addToHistory, type ParsedCommand, type CommandIntent } from "@/lib/voiceCommandEngine";

interface VoiceAssistantState {
  isListening: boolean;
  isProcessing: boolean;
  lastCommand: ParsedCommand | null;
  transcript: string;
  startListening: () => void;
  stopListening: () => void;
  toggleListening: () => void;
  processCommand: (text: string) => void;
  speakFeedback: (text: string) => void;
  isSpeaking: boolean;
  stopSpeaking: () => void;
  isSupported: boolean;
}

const VoiceAssistantContext = createContext<VoiceAssistantState | null>(null);

export const useVoiceAssistant = () => {
  const ctx = useContext(VoiceAssistantContext);
  if (!ctx) throw new Error("useVoiceAssistant must be used within VoiceAssistantProvider");
  return ctx;
};

const INTENT_LABELS: Record<CommandIntent, string> = {
  send_email: "Send Email",
  read_emails: "Read Emails",
  reply_email: "Reply to Email",
  delete_email: "Delete Email",
  search_email: "Search Emails",
  open_inbox: "Open Inbox",
  open_starred: "Open Starred",
  schedule_email: "Schedule Email",
  open_settings: "Open Settings",
  open_profile: "Open Profile",
  open_dashboard: "Open Dashboard",
  logout: "Logout",
  login: "Login",
  unknown: "Unknown Command",
};

export const VoiceAssistantProvider = ({ children }: { children: ReactNode }) => {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastCommand, setLastCommand] = useState<ParsedCommand | null>(null);
  const [transcript, setTranscript] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const tts = useTextToSpeech({ rate: 1.1 });

  const isSupported = typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  const processCommand = useCallback((text: string) => {
    setIsProcessing(true);
    const parsed = parseVoiceCommand(text);
    setLastCommand(parsed);

    let feedback = "";
    let success = true;

    switch (parsed.intent) {
      case "send_email":
        feedback = parsed.recipient
          ? `Opening email composer for ${parsed.recipient}`
          : "Opening email composer";
        navigate("/dashboard/send", { state: { recipient: parsed.recipient, subject: parsed.subject, message: parsed.message } });
        break;
      case "read_emails":
        feedback = "Opening your emails";
        navigate("/dashboard/read");
        break;
      case "reply_email":
        feedback = "Opening reply composer";
        navigate("/dashboard/read");
        break;
      case "delete_email":
        feedback = "Opening inbox to delete email";
        navigate("/dashboard/read");
        break;
      case "search_email":
        feedback = parsed.searchQuery
          ? `Searching for: ${parsed.searchQuery}`
          : "Opening email search";
        navigate("/dashboard/read", { state: { searchQuery: parsed.searchQuery } });
        break;
      case "open_inbox":
        feedback = "Opening your inbox";
        navigate("/dashboard/read");
        break;
      case "open_starred":
        feedback = "Opening starred emails";
        navigate("/dashboard/read", { state: { filter: "starred" } });
        break;
      case "schedule_email":
        feedback = parsed.scheduleTime
          ? `Scheduling email for ${parsed.scheduleTime}`
          : "Opening email scheduler";
        navigate("/dashboard/send", { state: { scheduled: true, scheduleTime: parsed.scheduleTime } });
        break;
      case "open_settings":
        feedback = "Opening settings";
        navigate("/dashboard/settings");
        break;
      case "open_profile":
        feedback = "Opening your profile";
        navigate("/dashboard/profile");
        break;
      case "open_dashboard":
        feedback = "Opening dashboard";
        navigate("/dashboard");
        break;
      case "logout":
        feedback = "Logging you out. Goodbye!";
        setTimeout(() => navigate("/"), 1500);
        break;
      case "login":
        feedback = "Logging you in.";
        setTimeout(() => navigate("/dashboard"), 500);
        break;
      default:
        feedback = "Sorry, I didn't understand that command. Please try again.";
        success = false;
        break;
    }

    addToHistory({ command: text, intent: parsed.intent, confidence: parsed.confidence, success });

    toast({
      title: success ? `🎤 ${INTENT_LABELS[parsed.intent]}` : "🤔 Unknown Command",
      description: feedback,
      variant: success ? "default" : "destructive",
    });

    tts.speak(feedback);
    setIsProcessing(false);
  }, [navigate, toast, tts]);

  const startListening = useCallback(() => {
    if (!isSupported) {
      toast({ title: "Not supported", description: "Speech recognition is not available in this browser.", variant: "destructive" });
      return;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SR();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    recognition.onresult = (event: any) => {
      let finalTranscript = "";
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }
      setTranscript(finalTranscript || interimTranscript);
      if (finalTranscript) {
        processCommand(finalTranscript);
      }
    };

    recognition.onend = () => {
      // In a continuous listening setup, if it ends we might want to restart it 
      // unless user explicitly stopped it. We can rely on a state ref.
      setIsListening(false);
    };
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event);
      if (event.error !== "no-speech") {
        setIsListening(false);
        toast({ title: "Voice error", description: "Could not recognize speech. Please try again.", variant: "destructive" });
      }
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
    setTranscript("");
  }, [isSupported, processCommand, toast]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const toggleListening = useCallback(() => {
    if (isListening) stopListening();
    else startListening();
  }, [isListening, startListening, stopListening]);

  return (
    <VoiceAssistantContext.Provider value={{
      isListening,
      isProcessing,
      lastCommand,
      transcript,
      startListening,
      stopListening,
      toggleListening,
      processCommand,
      speakFeedback: tts.speak,
      isSpeaking: tts.isSpeaking,
      stopSpeaking: tts.stop,
      isSupported,
    }}>
      {children}
    </VoiceAssistantContext.Provider>
  );
};
