import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Mic, Volume2, Lock, Eye, ScanFace, Mail, ArrowRight, Github, Linkedin, Twitter, Sparkles, BrainCircuit, Fingerprint, Activity } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] } }),
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const features = [
  { icon: ScanFace, title: "Facial Authentication", desc: "Military-grade biometric security powered by advanced neural networks.", color: "primary" },
  { icon: Mic, title: "Voice Navigation", desc: "Command your entire inbox with intuitive natural language processing.", color: "accent" },
  { icon: Volume2, title: "Speech Synthesis", desc: "Crystal-clear, human-like voice dictation for all your messages.", color: "secondary" },
  { icon: Shield, title: "Zero-Knowledge Privacy", desc: "End-to-end encryption ensures your data remains strictly yours.", color: "primary" },
  { icon: Eye, title: "Accessibility First", desc: "Built from the ground up to empower visually impaired users seamlessly.", color: "accent" },
  { icon: BrainCircuit, title: "AI Assistant", desc: "Smart contextual replies and automated sorting for maximum efficiency.", color: "secondary" },
];

const stats = [
  { value: "99.9%", label: "Biometric Accuracy", icon: Fingerprint },
  { value: "0.2s", label: "Lightning Response", icon: Activity },
  { value: "100%", label: "Hands-Free Control", icon: Mic },
  { value: "256-bit", label: "AES Encryption", icon: Lock },
];

const team = [
  { name: "Ganesh Kotha", role: "Project Lead", initials: "GK" },
  { name: "Dokala Mohan Sai Charan", role: "ML Engineer", initials: "DMSC" },
  { name: "Dr.K.Muthumayil", role: "Guide", initials: "KM" },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-[#05050A] text-foreground overflow-hidden selection:bg-primary/30">
      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] mix-blend-screen animate-float" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/20 rounded-full blur-[120px] mix-blend-screen animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[30%] left-[60%] w-[30%] h-[30%] bg-secondary/10 rounded-full blur-[120px] mix-blend-screen animate-float" style={{ animationDelay: "4s" }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />
      </div>

      {/* Modern Navbar */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-black/40 backdrop-blur-xl"
      >
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center p-[1px] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-shadow duration-500">
              <div className="w-full h-full bg-black/50 rounded-[7px] flex items-center justify-center backdrop-blur-sm">
                <Mic className="w-4 h-4 text-white" />
              </div>
            </div>
            <span className="font-display text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">SEEA</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Features</a>
            <a href="#about" className="text-sm font-medium text-white/60 hover:text-white transition-colors">About</a>
            <a href="#team" className="text-sm font-medium text-white/60 hover:text-white transition-colors">Team</a>
            <Link to="/login" className="relative group overflow-hidden rounded-full p-[1px]">
              <span className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-secondary opacity-70 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              <div className="relative bg-black/80 backdrop-blur-md px-6 py-2.5 rounded-full flex items-center gap-2 transition-all duration-300 group-hover:bg-black/40">
                <span className="text-sm font-semibold text-white">Sign In</span>
                <ArrowRight className="w-4 h-4 text-white/70 group-hover:text-white group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          </div>
        </div>
      </motion.nav>

      {/* Premium Hero Section */}
      <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-32 z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div initial="hidden" animate="visible" variants={fadeUp} custom={0} className="flex justify-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                <Sparkles className="w-4 h-4 text-accent animate-pulse" />
                <span className="text-xs font-medium text-white/80 tracking-wide uppercase">Next-Gen Email Experience</span>
              </div>
            </motion.div>
            
            <motion.h1 variants={fadeUp} custom={1} initial="hidden" animate="visible" className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8">
              <span className="text-white block">Speak your mind.</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary animate-gradient-x block mt-2 pb-2">We'll handle the rest.</span>
            </motion.h1>
            
            <motion.p variants={fadeUp} custom={2} initial="hidden" animate="visible" className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              Experience the future of communication. Navigate, compose, and manage your entire inbox using powerful voice commands and secure facial recognition.
            </motion.p>
            
            <motion.div variants={fadeUp} custom={3} initial="hidden" animate="visible" className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/login" className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-semibold hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_40px_rgba(255,255,255,0.2)]">
                Launch Assistant
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#features" className="w-full sm:w-auto px-8 py-4 rounded-full border border-white/20 text-white font-medium hover:bg-white/5 transition-colors flex items-center justify-center">
                Explore Features
              </a>
            </motion.div>
          </div>
          
          {/* Dashboard Preview Mockup */}
          <motion.div 
            variants={fadeUp} custom={4} initial="hidden" animate="visible"
            className="mt-24 relative mx-auto max-w-5xl perspective-1000"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#05050A] via-transparent to-transparent z-10" />
            <div className="rounded-2xl border border-white/10 bg-black/50 backdrop-blur-2xl overflow-hidden shadow-2xl transform rotate-x-12 scale-95 origin-bottom hover:rotate-x-0 hover:scale-100 transition-all duration-700 ease-out">
              <div className="h-12 border-b border-white/5 flex items-center px-4 gap-2 bg-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <div className="p-8 grid grid-cols-3 gap-6 opacity-70">
                <div className="col-span-1 border border-white/5 rounded-xl bg-white/5 p-6 h-64 flex flex-col justify-between">
                  <div className="w-12 h-12 rounded-full border-2 border-primary/50 border-t-primary animate-spin" />
                  <div className="space-y-3">
                    <div className="h-4 w-3/4 bg-white/10 rounded" />
                    <div className="h-3 w-1/2 bg-white/5 rounded" />
                  </div>
                </div>
                <div className="col-span-2 border border-white/5 rounded-xl bg-white/5 p-6 h-64 space-y-4">
                  <div className="h-4 w-1/4 bg-white/10 rounded" />
                  <div className="space-y-2 pt-4">
                    <div className="h-12 w-full bg-white/5 rounded-lg" />
                    <div className="h-12 w-full bg-white/5 rounded-lg" />
                    <div className="h-12 w-full bg-white/5 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section id="features" className="py-24 relative z-10 border-t border-white/5 bg-black/20">
        <div className="container mx-auto px-6">
          <div className="mb-20">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-white text-center">Beyond <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Ordinary Email</span></h2>
            <p className="text-white/50 max-w-2xl mx-auto text-center md:text-lg">Every interacting element feels natural, intuitive, and remarkably fast. No keyboard required.</p>
          </div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                className="group relative p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent hover:from-white/20 transition-colors"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity blur-xl rounded-2xl" />
                <div className="relative h-full bg-black/80 backdrop-blur-xl border border-white/5 rounded-xl p-8 overflow-hidden z-10">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-500`}>
                    <f.icon className={`w-7 h-7 text-${f.color} drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]`} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/60 transition-colors">{f.title}</h3>
                  <p className="text-white/50 leading-relaxed font-light">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 relative z-10 border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="relative group p-8 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-sm overflow-hidden text-center"
              >
                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary via-accent to-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                <s.icon className="w-8 h-8 mx-auto mb-4 text-white/20 group-hover:text-accent transition-colors" />
                <p className="font-display text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 mb-2">{s.value}</p>
                <p className="text-sm font-medium text-white/40 tracking-wider uppercase">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-32 relative z-10 border-t border-white/5 bg-gradient-to-b from-transparent to-black/50">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4 text-white">Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Innovators</span></h2>
            <p className="text-white/50 max-w-xl mx-auto">The visionary minds shaping the future of accessible communication.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {team.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="relative p-[1px] rounded-3xl bg-gradient-to-b from-white/10 to-transparent flex flex-col hover:shadow-[0_0_40px_rgba(255,255,255,0.05)] transition-shadow"
              >
                <div className="bg-[#0A0A0F] rounded-[23px] p-8 text-center h-full border border-white/5 flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 border border-white/10 flex items-center justify-center text-2xl font-bold text-white mb-6 relative group overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative z-10">{m.initials}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1 tracking-tight">{m.name}</h3>
                  <p className="text-primary font-medium text-sm px-3 py-1 bg-primary/10 rounded-full">{m.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="relative border-t border-white/10 bg-[#020205] pt-16 pb-8 z-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <Link to="/" className="flex items-center gap-2 mb-6">
                <Mic className="w-6 h-6 text-primary" />
                <span className="font-display text-2xl font-bold tracking-tight text-white">SEEA</span>
              </Link>
              <p className="text-white/40 max-w-sm font-light leading-relaxed">
                Empowering every user with seamless, hands-free email experiences powered by next-generation voice and facial recognition AI.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-6 tracking-wide">Explore</h4>
              <ul className="space-y-4">
                <li><a href="#features" className="text-white/40 hover:text-white hover:pl-2 transition-all">Features</a></li>
                <li><a href="#about" className="text-white/40 hover:text-white hover:pl-2 transition-all">About Us</a></li>
                <li><Link to="/login" className="text-white/40 hover:text-white hover:pl-2 transition-all">Sign In</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-6 tracking-wide">Connect</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white hover:scale-110 transition-all"><Github className="w-4 h-4" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white hover:scale-110 transition-all"><Linkedin className="w-4 h-4" /></a>
                <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:bg-white/10 hover:text-white hover:scale-110 transition-all"><Twitter className="w-4 h-4" /></a>
              </div>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-sm">© 2026 SEEA. All rights reserved.</p>
            <div className="flex gap-6 text-sm text-white/30">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
