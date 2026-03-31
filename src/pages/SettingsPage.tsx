import { motion } from "framer-motion";
import { Sun, Moon, Globe, Volume2, Bell, Eye, ShieldCheck, Database, HardDrive, Wifi, Lock, PlayCircle } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const SettingsPage = () => {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 pb-12">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <h1 className="font-display text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-2">System Config</h1>
          <p className="text-white/40 text-sm">Fine-tune your global workspace preferences and assistant parameters.</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* General & Display */}
          <div className="space-y-6">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1} className="p-6 rounded-2xl bg-[#0A0A0F]/80 backdrop-blur-xl border border-white/5 relative overflow-hidden group hover:border-primary/30 transition-colors">
              <div className="absolute right-0 top-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Sun className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Interface Theme</h3>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">Visual Identity</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 relative z-10">
                <button className="p-4 rounded-xl border border-white/5 bg-black/40 text-sm text-white/40 flex items-center justify-center gap-2 hover:bg-white/5 transition-all"><Sun className="w-4 h-4" /> Light</button>
                <button className="p-4 rounded-xl border border-primary/50 bg-primary/10 text-sm text-primary font-bold flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.15)]"><Moon className="w-4 h-4" /> Dark</button>
              </div>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={2} className="p-6 rounded-2xl bg-[#0A0A0F]/80 backdrop-blur-xl border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <Globe className="w-5 h-5 text-white/70" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Language Matrix</h3>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">Localization</p>
                </div>
              </div>
              <div className="relative">
                <select className="appearance-none w-full px-5 py-3.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:outline-none focus:border-white/30 transition-all shadow-inner">
                  <option>English (US) - Default</option>
                  <option>Spanish (ES)</option>
                  <option>French (FR)</option>
                  <option>Hindi (IN)</option>
                </select>
                <Globe className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              </div>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3} className="p-6 rounded-2xl bg-[#0A0A0F]/80 backdrop-blur-xl border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <Eye className="w-5 h-5 text-white/70" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Accessibility</h3>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">Assistive Tech</p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { label: "High Contrast Mode", state: false },
                  { label: "Screen Reader Syntax", state: true },
                  { label: "Motion Reduction", state: false }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-sm text-white/70">{item.label}</span>
                    <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${item.state ? "bg-gradient-to-r from-primary to-accent border border-primary/50" : "bg-white/10 border border-white/5"}`}>
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${item.state ? "right-0.5" : "left-0.5"}`} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Voice & System */}
          <div className="space-y-6">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4} className="p-6 rounded-2xl bg-[#0A0A0F]/80 backdrop-blur-xl border border-white/5 relative overflow-hidden group hover:border-accent/30 transition-colors">
              <div className="absolute right-0 top-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20">
                  <Volume2 className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Audio Synthesis</h3>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">Voice Parameters</p>
                </div>
              </div>
              <div className="space-y-6 relative z-10">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">WPM Rate (Speed)</span>
                    <span className="text-xs font-mono text-accent bg-accent/10 px-2 py-0.5 rounded">1.0x</span>
                  </div>
                  <div className="relative w-full h-2 bg-black/60 rounded-full border border-white/10 overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-1/2 bg-gradient-to-r from-accent/50 to-accent rounded-full" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-white/70">Output Volume</span>
                    <span className="text-xs font-mono text-white/70">80%</span>
                  </div>
                  <div className="relative w-full h-2 bg-black/60 rounded-full border border-white/10 overflow-hidden">
                    <div className="absolute left-0 top-0 bottom-0 w-4/5 bg-gradient-to-r from-white/20 to-white/70 rounded-full" />
                  </div>
                </div>
                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm font-semibold hover:bg-white/10 hover:text-white transition-colors">
                  <PlayCircle className="w-4 h-4" /> Test Voice Synthesis
                </button>
              </div>
            </motion.div>

            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={5} className="p-6 rounded-2xl bg-[#0A0A0F]/80 backdrop-blur-xl border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                  <Bell className="w-5 h-5 text-white/70" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Alert Signals</h3>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-0.5">Notifications</p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { label: "Incoming Transmissions", state: true, color: "primary" },
                  { label: "Voice Command Feedback", state: true, color: "accent" },
                  { label: "Security Anomalies", state: true, color: "red-500" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3.5 rounded-xl bg-black/40 border border-white/5">
                    <span className="text-sm text-white/70">{item.label}</span>
                    <div className={`w-10 h-5 rounded-full relative cursor-pointer border shadow-inner ${item.state ? `bg-${item.color}/20 border-${item.color}/50` : "bg-white/10 border-white/5"}`}>
                      <div className={`absolute top-0.5 w-4 h-4 rounded-full transition-transform ${item.state ? `right-0.5 bg-${item.color} shadow-[0_0_10px_currentColor]` : "left-0.5 bg-white/50"}`} />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={6} className="p-5 rounded-2xl bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20 flex items-center justify-between group cursor-pointer hover:bg-red-500/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center border border-red-500/30">
                  <ShieldCheck className="w-5 h-5 text-red-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-red-200 text-sm">Clear Secure Cache</h3>
                  <p className="text-xs text-red-400/60 mt-0.5">Purge local voice signatures</p>
                </div>
              </div>
              <Database className="w-4 h-4 text-red-400/50 group-hover:text-red-400 transition-colors" />
            </motion.div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SettingsPage;
