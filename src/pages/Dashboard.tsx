import { motion } from "framer-motion";
import { Mail, MailOpen, Send, Mic, TrendingUp, Clock, BarChart3, Activity, Command, Zap } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { getCommandStats } from "@/lib/voiceCommandEngine";
import { useData } from "@/contexts/DataContext";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" } }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 }
  }
};

const Dashboard = () => {
  const stats = getCommandStats();
  const { myInbox, mySent } = useData();
  const unreadCount = myInbox.filter(e => e.unread).length;

  const cards = [
    { label: "Total Emails", value: myInbox.length, icon: Mail, change: "+12%", color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
    { label: "Unread Emails", value: unreadCount, icon: MailOpen, change: "-5%", color: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
    { label: "Sent Emails", value: mySent.length, icon: Send, change: "+8%", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
    { label: "Voice Interactions", value: String(stats.totalCommands || 89), icon: Mic, change: "+24%", color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20" },
  ];

  const activities = [
    ...(stats.recentCommands.slice(0, 3).map(cmd => ({
      action: `Voice: "${cmd.command}"`,
      time: getRelativeTime(cmd.timestamp),
      icon: Activity,
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      success: cmd.success
    }))),
    { action: "Email dispatched to john@example.com", time: "2 min ago", icon: Send, color: "text-emerald-400", bg: "bg-emerald-500/10", success: true },
    { action: "Incoming message from Sarah Chen", time: "1 hour ago", icon: Mail, color: "text-blue-400", bg: "bg-blue-500/10", success: true },
    { action: "Face biometric authentication", time: "1 hour ago", icon: Zap, color: "text-amber-400", bg: "bg-amber-500/10", success: true },
    { action: "Email dispatched to team@example.com", time: "3 hours ago", icon: Send, color: "text-emerald-400", bg: "bg-emerald-500/10", success: true },
  ].slice(0, 6);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <h1 className="font-display text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-2">Overview</h1>
          <p className="text-white/50 mb-8 max-w-lg">Welcome to your intelligent workspace. Here is a snapshot of your recent communications and voice activity.</p>
        </motion.div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {cards.map((c, i) => (
            <motion.div key={c.label} variants={fadeUp} custom={i} className={`p-6 rounded-2xl bg-[#0A0A0F]/80 backdrop-blur-xl border ${c.border} relative overflow-hidden group hover:border-${c.color.split('-')[1]}-500/50 transition-colors`}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-white/50 tracking-wide uppercase mb-2">{c.label}</p>
                  <div className="flex items-baseline gap-3">
                    <p className="font-display text-4xl font-bold text-white drop-shadow-md">{c.value}</p>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${c.bg} shadow-inner`}>
                  <c.icon className={`w-6 h-6 ${c.color}`} />
                </div>
              </div>
              <div className="relative z-10 flex items-center gap-2 mt-4">
                <div className={`flex items-center gap-1 ${c.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'} bg-white/5 px-2 py-0.5 rounded-full`}>
                  <TrendingUp className={`w-3 h-3 ${c.change.startsWith('-') ? 'rotate-180' : ''}`} />
                  <span className="text-xs font-bold">{c.change}</span>
                </div>
                <span className="text-xs text-white/30 font-medium">vs last month</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" className="lg:col-span-2 rounded-2xl bg-[#0A0A0F]/80 backdrop-blur-xl border border-white/5 overflow-hidden flex flex-col">
            <div className="p-6 border-b border-white/5 flex items-center justify-between">
              <h2 className="font-display text-xl font-semibold text-white flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" /> Activity Stream
              </h2>
              <button className="text-xs font-medium text-primary hover:text-white transition-colors uppercase tracking-wider">View All</button>
            </div>
            <div className="p-4 flex-1">
              <div className="space-y-2">
                {activities.map((a, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/5 transition-all group relative overflow-hidden">
                    <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${a.bg} border border-white/5 shadow-inner`}>
                      <a.icon className={`w-5 h-5 ${a.color}`} />
                    </div>
                    <div className="flex-1 min-w-0 flex items-center justify-between">
                      <div>
                        <p className={`text-sm font-medium truncate ${a.success === false ? 'text-red-300' : 'text-white/90'}`}>{a.action}</p>
                        <p className="text-xs text-white/40 mt-1 font-mono">{a.time}</p>
                      </div>
                      {a.action.startsWith("Voice:") && (
                        <div className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-white/40 uppercase tracking-widest hidden sm:block">Command</div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="space-y-8">
            <motion.div variants={fadeUp} custom={4} initial="hidden" animate="visible" className="rounded-2xl bg-gradient-to-br from-primary/20 via-[#0A0A0F] to-accent/10 p-[1px] shadow-[0_0_30px_rgba(59,130,246,0.15)]">
              <div className="rounded-2xl bg-[#0A0A0F]/90 backdrop-blur-xl p-6 h-full relative overflow-hidden">
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
                <h2 className="font-display text-xl font-semibold text-white mb-6 flex items-center gap-2 relative z-10">
                  <Command className="w-5 h-5 text-accent" /> Intelligence
                </h2>
                <div className="space-y-4 relative z-10">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 shadow-inner group transition-colors">
                    <div className="w-2 h-2 rounded-full bg-amber-400 mb-3 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
                    <p className="text-sm text-white/80 leading-relaxed font-light">You have <span className="text-white font-semibold">{unreadCount} unread emails</span>. Say <span className="text-accent italic font-medium px-1 rounded bg-accent/10">"Read my emails"</span> to process them instantly.</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 group transition-colors">
                    <div className="w-2 h-2 rounded-full bg-primary mb-3 shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    <p className="text-sm text-white/80 leading-relaxed font-light">Tip: Master hands-free composition by saying <span className="text-primary italic font-medium px-1 rounded bg-primary/10">"Send email to John"</span> from anywhere.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {stats.mostUsedCommands.length > 0 && (
              <motion.div variants={fadeUp} custom={5} initial="hidden" animate="visible" className="rounded-2xl bg-[#0A0A0F]/80 backdrop-blur-xl border border-white/5 p-6">
                <div className="flex items-center gap-2 mb-6">
                  <BarChart3 className="w-5 h-5 text-secondary" />
                  <h2 className="font-display text-xl font-semibold text-white">Frequency</h2>
                </div>
                <div className="space-y-4">
                  {stats.mostUsedCommands.map((cmd, i) => (
                    <div key={cmd.intent} className="relative">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold text-white/60 uppercase tracking-wider">{cmd.intent.replace(/_/g, " ")}</span>
                        <span className="text-xs font-bold text-white bg-white/10 px-2 py-0.5 rounded-full">{cmd.count}</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden shadow-inner">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${(cmd.count / stats.mostUsedCommands[0].count) * 100}%` }}
                          transition={{ duration: 1, delay: i * 0.1 }}
                          className={`h-full rounded-full bg-gradient-to-r ${i === 0 ? 'from-primary to-accent' : 'from-white/20 to-white/40'}`} 
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

function getRelativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}

export default Dashboard;
