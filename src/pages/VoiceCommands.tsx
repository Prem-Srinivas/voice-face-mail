import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mail, Inbox, Trash2, Reply, LogOut, Mic, MicOff, Search, Star, Clock, Settings, User, BarChart3, ChevronRight, Activity, Cpu } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useVoiceAssistant } from "@/contexts/VoiceAssistantContext";
import { getCommandStats, getCommandHistory } from "@/lib/voiceCommandEngine";

const commands = [
  { label: "Dispatch Email", desc: 'Compose and dispatch', icon: Send, example: '"Send email to Dev Team saying build deployed"' },
  { label: "Vocalize Inbox", desc: "Audio synthesis of incoming flow", icon: Mail, example: '"Read my unread transmissions"' },
  { label: "Access Node", desc: "Navigate to primary inbox", icon: Inbox, example: '"Return to inbox"' },
  { label: "Purge", desc: "Erase selected data", icon: Trash2, example: '"Delete this transmission"' },
  { label: "Respond", desc: "Draft a reply", icon: Reply, example: '"Reply system is functional"' },
  { label: "Query", desc: "Filter matrix by keyword", icon: Search, example: '"Search for access credentials"' },
  { label: "Favorites", desc: "View starred nodes", icon: Star, example: '"Open starred matrix"' },
  { label: "Delay Action", desc: "Schedule for future", icon: Clock, example: '"Schedule transmission for 0800 hours"' },
  { label: "Config", desc: "Modify system parameters", icon: Settings, example: '"Open system config"' },
  { label: "Identity", desc: "View biometric profile", icon: User, example: '"Show my profile"' },
  { label: "Terminate", desc: "End secure session", icon: LogOut, example: '"Terminate session"' },
];

const VoiceCommands = () => {
  const va = useVoiceAssistant();
  const stats = getCommandStats();
  const [showHistory, setShowHistory] = useState(false);
  const history = getCommandHistory().slice(0, 20);

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-8 pb-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <motion.div initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}}>
            <h1 className="font-display text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-2">Voice Engine</h1>
            <p className="text-white/40 text-sm">Neural interface capabilities and historic command telemetry.</p>
          </motion.div>
          <motion.button initial={{opacity: 0, scale: 0.9}} animate={{opacity: 1, scale: 1}}
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-sm font-semibold text-white/70 hover:text-white hover:bg-white/10 transition-all shadow-inner w-fit"
          >
            <Cpu className="w-4 h-4" />
            {showHistory ? "Show Capabilities" : "Show Telemetry Logs"}
          </motion.button>
        </div>

        {/* Neural Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Processed Inputs", value: stats.totalCommands, color: "text-white" },
            { label: "Active Session", value: stats.todayCommands, color: "text-emerald-400" },
            { label: "Recognition Rate", value: `${stats.successRate}%`, color: "text-primary" },
            { label: "Primary Intent", value: stats.mostUsedCommands[0]?.intent.replace(/_/g, " ").toUpperCase() || "NULL", color: "text-accent text-sm sm:text-lg" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="p-5 flex flex-col items-center justify-center rounded-2xl bg-black/40 backdrop-blur-xl border border-white/5 shadow-inner text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <p className={`font-display font-bold truncate w-full ${s.color} ${i===3?'':'text-3xl sm:text-4xl'}`}>{s.value}</p>
              <p className="text-[10px] text-white/40 uppercase tracking-widest mt-2">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Central Cortex Link */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent shadow-2xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#0A0A0F]" />
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />
          <div className="relative z-10 p-10 flex flex-col items-center justify-center min-h-[300px]">
            {/* Visualizer Backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={va.toggleListening}
              className="relative group focus:outline-none mb-8"
            >
              <motion.div animate={va.isListening ? { scale: [1, 1.4, 1], opacity: [0.5, 0.8, 0.5] } : {}} transition={{ duration: 2, repeat: Infinity }} className={`absolute inset-0 rounded-full blur-xl ${va.isListening ? "bg-primary" : "bg-white/10"}`} />
              <div className={`relative w-28 h-28 rounded-full flex items-center justify-center border-4 shadow-2xl transition-all duration-500 ${va.isListening ? "border-primary bg-black/80 shadow-[0_0_50px_rgba(59,130,246,0.5)]" : "border-white/10 bg-black/40 group-hover:border-white/20"}`}>
                {va.isListening ? <Mic className="w-12 h-12 text-primary" /> : <MicOff className="w-12 h-12 text-white/30 group-hover:text-white/50 transition-colors" />}
              </div>
            </motion.button>

            <div className="h-16 flex items-center justify-center relative w-full max-w-lg mb-4">
              <AnimatePresence mode="wait">
                {va.isListening ? (
                  <motion.div key="listening" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center">
                    <div className="flex items-center gap-1.5 h-12 mb-2">
                       {[...Array(15)].map((_, i) => (
                         <motion.div key={i} className="w-1.5 bg-gradient-to-t from-primary to-accent rounded-full" animate={{ height: [4, 10 + Math.random() * 30, 4] }} transition={{ duration: 0.4 + Math.random() * 0.6, repeat: Infinity }} />
                       ))}
                    </div>
                    <p className="text-white/60 font-mono text-sm tracking-wider uppercase">Awaiting input sequence...</p>
                  </motion.div>
                ) : (
                  <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
                    <p className="text-white/40 uppercase tracking-widest font-semibold text-sm">System Standby</p>
                    <p className="text-white/20 text-xs mt-1">Initialize link to engage NLP engine</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <AnimatePresence>
              {(va.transcript || (va.lastCommand && va.lastCommand.intent !== "unknown")) && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="w-full max-w-2xl bg-black/60 border border-white/10 rounded-2xl p-5 shadow-inner mt-4">
                  {va.transcript && (
                     <div className="mb-3">
                       <span className="text-[10px] text-primary uppercase tracking-widest font-bold bg-primary/10 px-2 py-0.5 rounded border border-primary/20 mb-2 inline-block">Transcript</span>
                       <p className="text-white text-lg font-light italic leading-relaxed">"{va.transcript}"</p>
                     </div>
                  )}
                  {va.lastCommand && va.lastCommand.intent !== "unknown" && (
                     <div className="flex items-center gap-3 pt-3 border-t border-white/5">
                        <Activity className="w-4 h-4 text-accent" />
                        <span className="text-sm text-white/40">Resolved Intent:</span>
                        <span className="text-sm text-accent font-bold uppercase tracking-wider">{va.lastCommand.intent.replace(/_/g, " ")}</span>
                     </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Render Telemetry or Capabilities */}
        <AnimatePresence mode="wait">
          {showHistory ? (
            <motion.div key="history" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="rounded-2xl bg-[#0A0A0F]/80 backdrop-blur-xl border border-white/5 p-8 shadow-xl">
              <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                <BarChart3 className="w-5 h-5 text-secondary" />
                <h2 className="font-display text-xl font-bold text-white">Event Telemetry</h2>
              </div>
              {history.length === 0 ? (
                <div className="p-10 text-center border border-dashed border-white/10 rounded-xl bg-white/5">
                  <Activity className="w-10 h-10 text-white/20 mx-auto mb-3" />
                  <p className="text-white/50 text-sm">No telemetry logs acquired. Engage the engine to compile data.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {history.map((h) => (
                    <div key={h.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl bg-black/40 border border-white/5 hover:bg-white/5 transition-colors group">
                      <div className="mb-2 sm:mb-0">
                        <p className="text-white font-medium text-sm group-hover:text-primary transition-colors">"{h.command}"</p>
                        <div className="flex items-center gap-2 mt-1.5">
                          <code className="text-[10px] text-white/40 bg-white/10 px-1.5 py-0.5 rounded uppercase tracking-widest">{h.intent.replace(/_/g, " ")}</code>
                          <span className="w-1 h-1 bg-white/20 rounded-full" />
                          <span className="text-xs text-white/40 font-mono">{new Date(h.timestamp).toLocaleTimeString()}</span>
                        </div>
                      </div>
                      <div className={`px-3 py-1.5 rounded-lg border text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 w-fit ${h.success ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-red-500/10 border-red-500/20 text-red-400"}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${h.success ? "bg-emerald-400" : "bg-red-400"}`} />
                        {h.success ? "Executed" : "Failed"}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div key="commands" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {commands.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 rounded-2xl bg-[#0A0A0F]/80 backdrop-blur-xl border border-white/5 relative overflow-hidden group hover:border-primary/30 hover:bg-[#101018] transition-all cursor-default"
                >
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shrink-0 group-hover:scale-110 transition-transform">
                      <c.icon className="w-5 h-5 text-primary drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white tracking-wide">{c.label}</h3>
                      <p className="text-xs text-white/50 leading-relaxed mt-1">{c.desc}</p>
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-black/60 border border-white/5 border-l-2 border-l-primary/50 relative group-hover:bg-black/80 transition-colors">
                    <span className="absolute -top-2 left-3 text-[9px] font-bold text-white/30 uppercase tracking-widest bg-[#0A0A0F] px-1">Trigger Phrase</span>
                    <code className="text-xs text-white/80 font-mono italic break-words leading-relaxed">{c.example}</code>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </DashboardLayout>
  );
};

export default VoiceCommands;
