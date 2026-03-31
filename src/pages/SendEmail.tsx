import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, MicOff, Paperclip, Send, Sparkles, Wand2 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useToast } from "@/hooks/use-toast";
import { useData } from "@/contexts/DataContext";

const suggestions = [
  "Try saying: 'Send email to john@seea.edu'",
  "Dictate subject hands-free: 'Subject is Quarter Report'",
  "Say 'Attach file' to open dialog",
  "Conclude with 'Send email' to dispatch",
];

type VoiceField = "to" | "subject" | "message" | null;

const fadeUp = {
  hidden: { opacity: 0, y: 15 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.4 } }),
};

const SendEmail = () => {
  const { toast } = useToast();
  const { sendEmail } = useData();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { recipient?: string; subject?: string; message?: string } | null;
  const [to, setTo] = useState(state?.recipient || "");
  const [subject, setSubject] = useState(state?.subject || "");
  const [message, setMessage] = useState(state?.message || "");

  useEffect(() => {
    if (state?.recipient) setTo(state.recipient);
    if (state?.subject) setSubject(state.subject);
    if (state?.message) setMessage(state.message);
  }, [state]);
  const [activeField, setActiveField] = useState<VoiceField>(null);

  const speech = useSpeechRecognition({
    continuous: true,
    onResult: (text) => {
      if (activeField === "to") setTo((prev) => prev + text);
      else if (activeField === "subject") setSubject((prev) => prev + text);
      else if (activeField === "message") setMessage((prev) => prev + text);
    },
  });

  const toggleVoice = (field: VoiceField) => {
    if (!speech.isSupported) {
      toast({ title: "Module Offline", description: "Voice recognition matrix unavailable.", variant: "destructive" });
      return;
    }
    if (speech.isListening && activeField === field) {
      speech.stop();
      setActiveField(null);
    } else {
      if (speech.isListening) speech.stop();
      setActiveField(field);
      // Removed exact setTimeout block, use minimal latency
      setTimeout(() => speech.start(), 100);
      toast({ title: `Audio capture active for [${field}]`, description: "Awaiting dictation...", variant: "default" });
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!to || !message) {
      toast({ title: "Validation Error", description: "Recipient and Message body are required.", variant: "destructive" });
      return;
    }
    sendEmail(to, subject, message);
    navigate("/dashboard");
  };

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <h1 className="font-display text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-2">Compose</h1>
          <p className="text-white/40 max-w-lg">Initiate secure communications using manual input or voice dictation.</p>
        </motion.div>

        <AnimatePresence>
          {speech.isListening && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative p-[1px] rounded-2xl bg-gradient-to-r from-primary to-accent"
            >
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-[15px] bg-[#0A0A0F]/90 backdrop-blur-xl">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 border border-primary/30 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  <Mic className="w-5 h-5 text-primary animate-pulse" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest bg-primary/10 px-2 py-0.5 rounded border border-primary/20">Active Dictation</span>
                    <span className="text-sm font-medium text-white/80">Target: {activeField}</span>
                  </div>
                  <p className="text-white font-mono text-sm truncate bg-black/50 px-3 py-1.5 rounded border border-white/5 mt-2">
                     &gt; {speech.transcript || "Listening..."}
                     <span className="inline-block w-2 h-4 bg-primary/80 ml-1 animate-pulse align-middle" />
                  </p>
                </div>
                <div className="flex items-center gap-1.5 h-10 w-24 px-2 justify-center bg-black/50 rounded-lg border border-white/5">
                  {[...Array(6)].map((_, i) => (
                    <motion.div key={i} className="w-1 bg-gradient-to-t from-primary to-accent rounded-full" animate={{ height: [4, 16 + Math.random() * 10, 4] }} transition={{ duration: 0.5 + Math.random() * 0.5, repeat: Infinity }} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div variants={fadeUp} custom={1} initial="hidden" animate="visible" className="lg:col-span-2 rounded-2xl bg-[#0A0A0F]/80 backdrop-blur-xl border border-white/5 p-8 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            
            <form onSubmit={handleSend} className="space-y-6 relative z-10">
              
              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider ml-1">Recipient Node</label>
                <div className="relative group flex items-center gap-2">
                  <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="recipient@seea.edu" className="flex-1 px-5 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-black/80 transition-all shadow-inner font-mono" />
                  <button type="button" onClick={() => toggleVoice("to")} className={`p-3.5 rounded-xl transition-all border ${speech.isListening && activeField === "to" ? "bg-primary/20 border-primary/50 text-primary shadow-[0_0_15px_rgba(59,130,246,0.3)]" : "bg-black/60 border-white/10 text-white/40 hover:text-white hover:border-white/20 hover:bg-black/80"}`}>
                    {speech.isListening && activeField === "to" ? <Mic className="w-5 h-5 animate-pulse" /> : <MicOff className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider ml-1">Subject Header</label>
                <div className="relative group flex items-center gap-2">
                  <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Designation / Topic" className="flex-1 px-5 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-accent/50 focus:bg-black/80 transition-all shadow-inner" />
                  <button type="button" onClick={() => toggleVoice("subject")} className={`p-3.5 rounded-xl transition-all border ${speech.isListening && activeField === "subject" ? "bg-accent/20 border-accent/50 text-accent shadow-[0_0_15px_rgba(34,211,238,0.3)]" : "bg-black/60 border-white/10 text-white/40 hover:text-white hover:border-white/20 hover:bg-black/80"}`}>
                    {speech.isListening && activeField === "subject" ? <Mic className="w-5 h-5 animate-pulse" /> : <MicOff className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider ml-1">Payload Body</label>
                <div className="relative group rounded-xl bg-black/60 border border-white/10 focus-within:border-secondary/50 focus-within:bg-black/80 transition-all shadow-inner overflow-hidden">
                  <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={10} placeholder="Initiate dictation or formulate manual input..." className="w-full bg-transparent px-5 py-4 text-white text-sm placeholder:text-white/20 focus:outline-none resize-none font-sans leading-relaxed" />
                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                     <button type="button" onClick={() => toggleVoice("message")} className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${speech.isListening && activeField === "message" ? "bg-secondary/20 border-secondary/50 text-secondary shadow-[0_0_15px_rgba(168,85,247,0.3)]" : "bg-white/5 border-white/10 text-white/50 hover:text-white hover:bg-white/10"}`}>
                      {speech.isListening && activeField === "message" ? <><Mic className="w-4 h-4 animate-pulse" /> Recording</> : <><MicOff className="w-4 h-4" /> Dictate</>}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button type="button" className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:text-white hover:bg-white/10 transition-all">
                  <Paperclip className="w-4 h-4" /> Attach File
                </button>
                <button
                  type="submit"
                  className="w-full sm:flex-1 py-3.5 rounded-xl bg-gradient-to-r from-primary via-accent to-secondary text-white font-bold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] hover:scale-[1.01] active:scale-[0.99]"
                >
                  <Send className="w-4 h-4" /> Dispatch Transmission
                </button>
              </div>
            </form>
          </motion.div>

          <motion.div variants={fadeUp} custom={2} initial="hidden" animate="visible" className="rounded-2xl bg-[#0A0A0F]/80 backdrop-blur-xl border border-white/5 p-6 h-fit relative">
            <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-white">Assistant Core</h3>
            </div>
            
            <div className="space-y-3 relative z-10">
              <p className="text-xs font-semibold text-white/30 uppercase tracking-widest mb-2 px-1">Suggested Prompts</p>
              {suggestions.map((s, i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-colors cursor-default group">
                  <Wand2 className="w-4 h-4 text-white/30 mt-0.5 group-hover:text-accent transition-colors shrink-0" />
                  <span className="text-sm text-white/60 group-hover:text-white/90 leading-relaxed">{s}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SendEmail;
