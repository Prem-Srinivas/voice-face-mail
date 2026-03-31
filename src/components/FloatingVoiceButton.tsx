import { Mic, MicOff, Volume2, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useVoiceAssistant } from "@/contexts/VoiceAssistantContext";

const FloatingVoiceButton = () => {
  const [expanded, setExpanded] = useState(false);
  const va = useVoiceAssistant();

  const handleClick = () => {
    if (!expanded) {
      setExpanded(true);
      va.startListening();
    } else if (va.isListening) {
      va.stopListening();
    } else {
      va.startListening();
    }
  };

  const active = va.isListening || va.isProcessing || va.isSpeaking;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="glass-card p-4 mb-3 w-80"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-foreground font-semibold">AI Voice Assistant</p>
              <button onClick={() => { setExpanded(false); va.stopListening(); }} className="text-muted-foreground hover:text-foreground text-xs">✕</button>
            </div>

            {va.isListening && (
              <>
                <div className="flex items-center gap-1 justify-center my-3">
                  {[...Array(9)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-primary rounded-full"
                      animate={{ height: [6, 28, 6] }}
                      transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.08 }}
                    />
                  ))}
                </div>
                <p className="text-xs text-primary text-center font-medium">Listening...</p>
              </>
            )}

            {va.transcript && (
              <div className="mt-2 p-2 rounded-lg bg-muted">
                <p className="text-xs text-muted-foreground">Heard:</p>
                <p className="text-sm text-foreground">{va.transcript}</p>
              </div>
            )}

            {va.lastCommand && va.lastCommand.intent !== "unknown" && (
              <div className="mt-2 p-2 rounded-lg bg-primary/10 border border-primary/20">
                <p className="text-xs text-primary">Intent: <span className="font-semibold">{va.lastCommand.intent.replace(/_/g, " ")}</span></p>
                {va.lastCommand.recipient && <p className="text-xs text-muted-foreground">To: {va.lastCommand.recipient}</p>}
              </div>
            )}

            {va.isSpeaking && (
              <div className="mt-2 flex items-center gap-2 text-accent">
                <Volume2 className="w-4 h-4 animate-pulse" />
                <span className="text-xs">Speaking...</span>
              </div>
            )}

            <div className="mt-3 space-y-1">
              <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-wider">Try saying:</p>
              {["Send email to John", "Read my emails", "Open settings"].map((s) => (
                <p key={s} className="text-xs text-muted-foreground">"{s}"</p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all ${
          active ? "bg-primary glow-primary" : "bg-muted hover:bg-muted/80"
        }`}
      >
        {va.isProcessing ? (
          <Loader2 className="w-6 h-6 text-primary-foreground animate-spin" />
        ) : va.isListening ? (
          <MicOff className="w-6 h-6 text-primary-foreground" />
        ) : (
          <Mic className={`w-6 h-6 ${active ? "text-primary-foreground" : "text-foreground"}`} />
        )}
      </motion.button>
    </div>
  );
};

export default FloatingVoiceButton;
