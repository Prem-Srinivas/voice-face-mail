import { motion } from "framer-motion";
import { User, Mail, Phone, Shield, ScanFace, Mic, Lock, Zap, CheckCircle2 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useData } from "@/contexts/DataContext";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const Profile = () => {
  const { currentUser } = useData();
  const userName = currentUser?.name || "Unknown User";
  const initials = userName.charAt(0);

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0}>
          <h1 className="font-display text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60 mb-2">Profile Matrix</h1>
          <p className="text-white/40 text-sm">Manage your identity and authentication configurations.</p>
        </motion.div>

        {/* Identity Card */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={1} className="relative p-[1px] rounded-3xl bg-gradient-to-br from-primary/30 via-white/5 to-accent/20">
          <div className="bg-[#0A0A0F]/90 backdrop-blur-2xl p-8 rounded-[23px] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[80px]" />
            <div className="flex flex-col sm:flex-row items-center gap-8 relative z-10">
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:bg-primary/40 transition-colors" />
                <div className="w-32 h-32 rounded-full border border-white/20 bg-black/50 flex items-center justify-center relative z-10 shadow-2xl">
                  {currentUser?.role === 'Administrator' ? (
                     <User className="w-16 h-16 text-primary drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                  ) : (
                     <span className="text-5xl font-bold text-accent">{initials}</span>
                  )}
                </div>
                <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center border-4 border-[#0A0A0F] z-20">
                  <CheckCircle2 className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="text-center sm:text-left space-y-3 flex-1">
                <div>
                  <h2 className="text-3xl font-display font-bold text-white tracking-tight">{userName}</h2>
                  <p className="text-primary font-medium text-sm mt-1 flex items-center justify-center sm:justify-start gap-1">
                    <ScanFace className="w-4 h-4" /> Identity Verified • {currentUser?.role || "User"}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-2">
                  <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                    <Mail className="w-4 h-4 text-white/40" />
                    <span className="text-sm text-white/70">{currentUser?.email || "No email bound"}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                    <Phone className="w-4 h-4 text-white/40" />
                    <span className="text-sm text-white/70">{currentUser?.phone || "No phone bound"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Status Monitors */}
        <div className="grid sm:grid-cols-2 gap-6">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={2} className="p-6 rounded-2xl bg-[#0A0A0F]/80 backdrop-blur-xl border border-white/5 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                <ScanFace className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Biometric Matrix</h3>
                <p className="text-xs text-white/40 uppercase tracking-widest mt-0.5">Confidence Level</p>
              </div>
            </div>
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Status</span>
                <span className="text-sm text-emerald-400 font-medium px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">Active Enrollment</span>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1.5 font-mono text-white/50">
                  <span>Match Rate</span>
                  <span className="text-primary font-bold">99.7%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-1.5 shadow-inner">
                  <motion.div initial={{ width: 0 }} animate={{ width: "99.7%" }} transition={{ duration: 1, delay: 0.5 }} className="bg-gradient-to-r from-primary to-accent h-1.5 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={3} className="p-6 rounded-2xl bg-[#0A0A0F]/80 backdrop-blur-xl border border-white/5 relative overflow-hidden group">
            <div className="absolute right-0 top-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center border border-accent/20">
                <Shield className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-white">Security Protocol</h3>
                <p className="text-xs text-white/40 uppercase tracking-widest mt-0.5">Authorization</p>
              </div>
            </div>
            <div className="space-y-4 relative z-10">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Multi-Factor (2FA)</span>
                <span className="text-sm text-emerald-400 font-medium px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">Enforced</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Last Authenticated</span>
                <span className="text-sm font-mono text-white/80">Just now</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/60">Encryption Standard</span>
                <span className="text-sm font-mono text-white/80 flex items-center gap-1"><Zap className="w-3 h-3 text-yellow-500" /> AES-256</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Configurations */}
        <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={4} className="p-6 rounded-2xl bg-[#0A0A0F]/80 backdrop-blur-xl border border-white/5">
          <h3 className="font-display font-semibold text-white mb-6">Access Control</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center shadow-inner">
                  <Mic className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-sm font-medium text-white block">Continuous Voice Recognition</span>
                  <span className="text-xs text-white/40">Always listening for trigger phrases</span>
                </div>
              </div>
              <div className="w-12 h-6 rounded-full bg-gradient-to-r from-primary to-accent relative cursor-pointer shadow-[0_0_10px_rgba(59,130,246,0.3)] border border-primary/50">
                <div className="absolute right-1 top-0.5 w-5 h-5 rounded-full bg-white shadow-sm" />
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-black/50 border border-white/10 flex items-center justify-center shadow-inner">
                  <Lock className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <span className="text-sm font-medium text-white block">Credential Configuration</span>
                  <span className="text-xs text-white/40">Modify fallback password</span>
                </div>
              </div>
              <button className="px-4 py-2 rounded-lg bg-white/10 text-white text-xs font-semibold hover:bg-white/20 transition-all border border-white/5">
                Update Keys
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
