import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Volume2, VolumeX, Star, Trash2, Reply, SkipForward, SkipBack, Inbox, MailOpen, AlertTriangle, Fingerprint } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useToast } from "@/hooks/use-toast";
import { useData } from "@/contexts/DataContext";

const ReadEmail = () => {
  const { myInbox, markAsRead, toggleStar, deleteEmail } = useData();
  const [activeTab, setActiveTab] = useState("Inbox");
  
  const displayedEmails = myInbox.filter(e => {
    if (activeTab === "Unread") return e.unread;
    if (activeTab === "Starred") return e.starred;
    if (activeTab === "Spam") return e.isSpam;
    return !e.isSpam; // Inbox shows non-spam
  });

  const [selected, setSelected] = useState<number | null>(displayedEmails[0]?.id || null);
  const selectedEmail = displayedEmails.find((e) => e.id === selected);
  const { toast } = useToast();
  const tts = useTextToSpeech();

  const handleReadAloud = () => {
    if (!selectedEmail) return;
    if (!tts.isSupported) {
      toast({ title: "Module Offline", description: "Text-to-speech matrix unavailable.", variant: "destructive" });
      return;
    }
    if (tts.isSpeaking) {
      tts.stop();
    } else {
      const fullText = `Email from ${selectedEmail.fromName}. Subject: ${selectedEmail.subject}. ${selectedEmail.body}`;
      tts.speak(fullText);
      markAsRead(selectedEmail.id);
      toast({ title: "Audio Transcription Active", description: `Playing: "${selectedEmail.subject}"` });
    }
  };

  const handleNavigate = (dir: "prev" | "next") => {
    if (!selected) return;
    const idx = displayedEmails.findIndex((e) => e.id === selected);
    const newIdx = dir === "prev" ? Math.max(0, idx - 1) : Math.min(displayedEmails.length - 1, idx + 1);
    tts.stop();
    setSelected(displayedEmails[newIdx].id);
    markAsRead(displayedEmails[newIdx].id);
  };

  const tabs = [
    { label: "Inbox", icon: Inbox, count: myInbox.filter(e => !e.isSpam).length, color: "primary" },
    { label: "Unread", icon: MailOpen, count: myInbox.filter(e => e.unread).length, color: "accent" },
    { label: "Starred", icon: Star, count: myInbox.filter(e => e.starred).length, color: "yellow-500" },
    { label: "Spam", icon: AlertTriangle, count: myInbox.filter(e => e.isSpam).length, color: "red-500" },
  ];

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-8rem)] flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
          <div>
            <h1 className="font-display text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-2">Inbox Stream</h1>
            <p className="text-white/40 max-w-lg text-sm">Analyze and process incoming communications.</p>
          </div>
          <div className="relative group max-w-sm w-full sm:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 group-focus-within:text-white transition-colors z-10" />
            <input placeholder="Search node network..." className="w-full pl-11 pr-4 py-3 rounded-full bg-black/50 border border-white/10 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all shadow-inner" />
          </div>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 shrink-0 custom-scrollbar">
          {tabs.map((t) => (
            <button
              key={t.label}
              onClick={() => setActiveTab(t.label)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all shrink-0 ${
                activeTab === t.label ? `bg-white/10 text-white border border-white/20 shadow-lg` : "bg-black/40 text-white/50 border border-white/5 hover:text-white hover:bg-white/5"
              }`}
            >
              <t.icon className={`w-4 h-4 ${activeTab === t.label ? `text-${t.color}` : "text-white/40"}`} />
              {t.label}
              <span className={`text-xs ml-1 px-2 py-0.5 rounded-full ${activeTab === t.label ? `bg-${t.color}/20 text-${t.color}` : "bg-white/10"}`}>{t.count}</span>
            </button>
          ))}
        </div>

        <div className="flex-1 min-h-0 flex flex-col lg:flex-row gap-6">
          {/* Email List */}
          <div className="lg:w-1/3 flex border border-white/5 bg-[#0A0A0F]/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-xl flex-col shrink-0">
            <div className="p-4 border-b border-white/5 bg-black/20 flex items-center justify-between">
              <span className="text-xs font-semibold text-white/40 uppercase tracking-widest">{activeTab} Stream</span>
              <Fingerprint className="w-4 h-4 text-white/20" />
            </div>
            <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-2">
              {displayedEmails.map((e) => (
                <button
                  key={e.id}
                  onClick={() => { tts.stop(); setSelected(e.id); markAsRead(e.id); }}
                  className={`w-full text-left p-4 rounded-xl transition-all relative group overflow-hidden ${
                    selected === e.id ? "bg-white/10 border border-white/20 shadow-md" : "bg-transparent border border-transparent hover:bg-white/5 hover:border-white/10"
                  }`}
                >
                  {selected === e.id && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-primary rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />}
                  
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-sm tracking-wide ${e.unread ? "font-bold text-white" : "font-medium text-white/70"}`}>{e.fromName}</span>
                    <span className="text-[10px] uppercase font-mono text-white/40 bg-black/40 px-2 py-0.5 rounded">{e.time}</span>
                  </div>
                  <p className={`text-sm truncate mb-1.5 ${e.unread ? "text-white font-medium" : "text-white/50"}`}>{e.subject}</p>
                  <p className="text-xs text-white/30 truncate block w-full">{e.preview}</p>
                  
                  <div className="flex items-center gap-2 mt-3 justify-end">
                    {e.unread && <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.8)]" />}
                    {e.starred && <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.8)]" />}
                  </div>
                </button>
              ))}
              {displayedEmails.length === 0 && (
                 <div className="text-center p-8 text-white/30 text-sm mt-10">No messages in this folder.</div>
              )}
            </div>
          </div>

          {/* Email Reader */}
          <div className="lg:w-2/3 flex flex-col border border-white/5 bg-[#0A0A0F]/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-2xl relative">
            {selectedEmail ? (
              <div className="flex flex-col h-full bg-gradient-to-br from-transparent to-black/40">
                <div className="p-6 border-b border-white/5 bg-black/20 shrink-0">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div>
                      <h2 className="text-2xl font-display font-bold text-white mb-2 tracking-tight leading-tight">{selectedEmail.subject}</h2>
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                          <span className="text-xs font-bold text-primary">{selectedEmail.fromName[0]}</span>
                        </div>
                        <p className="text-sm text-white/50"><span className="text-white/80 font-medium">{selectedEmail.fromName}</span> &lt;{selectedEmail.fromEmail}&gt;</p>
                        <p className="text-xs text-white/30 ml-2">to me ({selectedEmail.toEmail})</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono uppercase bg-black/60 border border-white/10 px-3 py-1 rounded-full text-white/50">{selectedEmail.time}</span>
                      <button onClick={() => toggleStar(selectedEmail.id)} className="p-2 rounded-full hover:bg-white/10 text-white/40 hover:text-white transition-colors"><Star className={`w-4 h-4 ${selectedEmail.starred ? "text-yellow-500 fill-yellow-500" : ""}`} /></button>
                      <button onClick={() => { deleteEmail(selectedEmail.id); setSelected(null); }} className="p-2 rounded-full hover:bg-red-500/20 text-white/40 hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-6">
                    <button onClick={handleReadAloud} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shadow-lg ${tts.isSpeaking ? "bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.2)]" : "bg-gradient-to-r from-primary to-accent text-white hover:scale-[1.02] active:scale-[0.98] shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-primary/50"}`}>
                      {tts.isSpeaking ? <><VolumeX className="w-4 h-4" /> Terminate Audio</> : <><Volume2 className="w-4 h-4" /> Synthesize Audio</>}
                    </button>
                    <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors text-sm font-semibold">
                      <Reply className="w-4 h-4" /> Reply
                    </button>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-8">
                  <AnimatePresence>
                    {tts.isSpeaking && (
                      <motion.div
                        initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                        animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
                        exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                        className="flex items-center gap-4 p-4 rounded-xl bg-primary/10 border border-primary/20 shadow-[0_0_30px_rgba(59,130,246,0.15)] overflow-hidden"
                      >
                        <div className="flex items-center gap-1.5 shrink-0 bg-black/40 p-2 rounded-lg">
                          {[...Array(8)].map((_, i) => (
                            <motion.div key={i} className="w-1.5 bg-primary rounded-full" animate={{ height: [4, 12 + Math.random() * 16, 4] }} transition={{ duration: 0.4 + Math.random() * 0.4, repeat: Infinity }} />
                          ))}
                        </div>
                        <div>
                          <span className="text-sm font-bold text-primary tracking-wide block">AUDIO PLAYBACK ACTIVE</span>
                          <span className="text-xs text-white/50 font-mono">Synthesizing raw text stream...</span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="prose prose-invert max-w-none">
                    <p className="text-[15px] text-white/80 leading-loose font-light whitespace-pre-wrap">{selectedEmail.body}</p>
                  </div>
                </div>

                <div className="p-4 border-t border-white/5 bg-black/40 shrink-0 flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono text-white/30 tracking-widest hidden sm:block">End of Transmission</span>
                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button onClick={() => handleNavigate("prev")} className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-xs font-semibold text-white/60 hover:text-white hover:bg-white/10 transition-colors"><SkipBack className="w-3.5 h-3.5" /> Prev</button>
                    <button onClick={() => handleNavigate("next")} className="flex-1 sm:flex-none flex justify-center items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-xs font-semibold text-white/60 hover:text-white hover:bg-white/10 transition-colors">Next <SkipForward className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.9] mix-blend-soft-light" style={{backgroundSize: '200px'}}>
                 <div className="w-24 h-24 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-inner">
                    <Inbox className="w-10 h-10 text-white/20" />
                 </div>
                 <h3 className="text-xl font-display font-bold text-white mb-2 tracking-tight">Awaiting Selection</h3>
                 <p className="text-white/40 text-sm max-w-xs">Select a secure transmission from the stream to read its contents.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ReadEmail;
