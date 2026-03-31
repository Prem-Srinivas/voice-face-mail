import { useState, useRef, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ScanFace, Mail, Lock, Eye, EyeOff, Camera, CheckCircle2, XCircle, Loader2, Mic } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useData } from "@/contexts/DataContext";

type ScanPhase = "idle" | "requesting" | "scanning" | "analyzing" | "success" | "failed";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [scanPhase, setScanPhase] = useState<ScanPhase>("idle");
  const [scanProgress, setScanProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useData();

  const stopCamera = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
  }, []);

  useEffect(() => () => stopCamera(), [stopCamera]);

  const startFaceScan = async () => {
    setScanPhase("requesting");
    setScanProgress(0);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: 320, height: 240 } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setScanPhase("scanning");

      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 8 + 2;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setScanPhase("analyzing");

          setTimeout(() => {
            setScanPhase("success");
            toast({ title: "Face Authorized", description: "Identity verified. Redirecting...", variant: "default" });
            login("admin@seea.edu");
            setTimeout(() => {
              stopCamera();
              navigate("/dashboard");
            }, 1000);
          }, 1500);
        }
        setScanProgress(Math.min(progress, 100));
      }, 150);
    } catch {
      setScanPhase("failed");
      toast({ title: "Authorization Error", description: "Camera access denied or unavailable. Fallback to credentials.", variant: "destructive" });
      setTimeout(() => setScanPhase("idle"), 3000);
    }
  };

  const isScanning = scanPhase !== "idle" && scanPhase !== "failed";

  return (
    <div className="min-h-screen bg-[#05050A] text-foreground flex flex-col md:flex-row relative overflow-hidden selection:bg-primary/30">
      
      {/* Abstract Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[50%] h-[50%] bg-primary/20 rounded-full blur-[150px] mix-blend-screen animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[40%] h-[40%] bg-accent/20 rounded-full blur-[150px] mix-blend-screen animate-pulse-glow" style={{ animationDelay: "2s" }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-soft-light" />
      </div>

      {/* Brand Section */}
      <div className="md:w-1/2 p-10 flex flex-col justify-between relative z-10 hidden md:flex">
        <Link to="/" className="flex items-center gap-3 group w-fit">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-accent flex items-center justify-center p-[1px] group-hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all">
            <div className="w-full h-full bg-[#05050A] rounded-[11px] flex items-center justify-center">
              <Mic className="w-5 h-5 text-white" />
            </div>
          </div>
          <span className="font-display text-2xl font-bold tracking-tight text-white">SEEA</span>
        </Link>
        <div className="max-w-md">
          <h1 className="font-display text-5xl font-bold text-white mb-6 leading-tight">
            The intelligent <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">mail assistant</span>
          </h1>
          <p className="text-white/40 font-light text-lg leading-relaxed">
            Identity verification via deep facial recognition secures your completely hands-free workspace.
          </p>
        </div>
        <div className="flex items-center gap-2 text-white/30 text-sm">
          <span>&copy; 2026 SEEA Matrix</span>
          <span className="w-1 h-1 bg-white/30 rounded-full" />
          <span>System Online</span>
        </div>
      </div>

      {/* Login Portal Section */}
      <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center p-6 relative z-10 bg-[#0A0A0F]/50 backdrop-blur-3xl border-l border-white/5 shadow-2xl">
        {/* Mobile Header */}
        <div className="absolute top-8 left-8 md:hidden">
          <Link to="/" className="flex items-center gap-2 group w-fit">
            <Mic className="w-6 h-6 text-primary" />
            <span className="font-display text-xl font-bold tracking-tight text-white">SEEA</span>
          </Link>
        </div>

        <motion.div initial="hidden" animate="visible" variants={fadeUp} className="w-full max-w-md mt-16 md:mt-0">
          <div className="mb-10 lg:hidden">
            <h2 className="text-3xl font-display font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-white/40">Authenticate to access your workspace.</p>
          </div>
          <div className="hidden lg:block mb-10 text-center">
            <h2 className="text-3xl font-display font-bold text-white mb-2">Access Portal</h2>
            <p className="text-white/40 text-sm">Select your authentication method.</p>
          </div>

          <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            
            {/* Face Recognition Section */}
            <div className="mb-8">
              <AnimatePresence mode="wait">
                {scanPhase === "idle" || scanPhase === "failed" ? (
                  <motion.button
                    key="start"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={startFaceScan}
                    className="w-full p-8 rounded-2xl border border-primary/30 bg-primary/5 hover:bg-primary/10 flex flex-col items-center justify-center gap-4 transition-all group overflow-hidden relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 w-20 h-20 rounded-full bg-black/50 border border-white/10 flex items-center justify-center shadow-inner group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all">
                      {scanPhase === "failed" ? (
                        <XCircle className="w-8 h-8 text-red-500 drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                      ) : (
                        <ScanFace className="w-8 h-8 text-primary drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                      )}
                    </div>
                    <div className="relative z-10 text-center">
                      <h3 className="text-white font-semibold tracking-wide mb-1">
                        {scanPhase === "failed" ? "Authentication Failed" : "Biometric Login"}
                      </h3>
                      <p className="text-xs text-white/40 uppercase tracking-widest">
                        {scanPhase === "failed" ? "Retry matching" : "Initialize Scanner"}
                      </p>
                    </div>
                  </motion.button>
                ) : (
                  <motion.div
                    key="scanning"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="w-full rounded-2xl border border-primary/40 bg-black overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.15)]"
                  >
                    {/* Camera Viewport */}
                    <div className="relative aspect-[4/3] bg-black overflow-hidden">
                      <video ref={videoRef} className="w-full h-full object-cover mirror opacity-80" muted playsInline style={{ transform: "scaleX(-1)" }} />
                      <canvas ref={canvasRef} className="hidden" />

                      {/* Sci-Fi Scanner UI Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        
                        {/* Target Box */}
                        <motion.div
                          className="w-48 h-64 rounded-[40%] border-2 border-dashed"
                          style={{ borderColor: scanPhase === "success" ? "#10B981" : "#3B82F6", boxShadow: scanPhase === "success" ? "0 0 30px rgba(16,185,129,0.3) inset" : "0 0 30px rgba(59,130,246,0.3) inset" }}
                          animate={scanPhase === "scanning" ? { 
                            scale: [1, 1.05, 1],
                            opacity: [0.5, 1, 0.5]
                          } : { scale: 1, opacity: 1 }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />

                        {/* Scan Laser */}
                        {scanPhase === "scanning" && (
                          <motion.div
                            className="absolute left-[15%] right-[15%] h-[2px] bg-primary shadow-[0_0_20px_#3B82F6,0_0_40px_#3B82F6]"
                            animate={{ top: ["15%", "85%", "15%"] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          />
                        )}

                        {/* Corner Reticles */}
                        {["top-4 left-4", "top-4 right-4", "bottom-4 left-4", "bottom-4 right-4"].map((pos, i) => (
                          <div
                            key={i}
                            className={`absolute ${pos} w-8 h-8`}
                            style={{
                              borderColor: scanPhase === "success" ? "#10B981" : "#3B82F6",
                              borderTopWidth: i < 2 ? 3 : 0,
                              borderBottomWidth: i >= 2 ? 3 : 0,
                              borderLeftWidth: i % 2 === 0 ? 3 : 0,
                              borderRightWidth: i % 2 === 1 ? 3 : 0,
                            }}
                          />
                        ))}

                        {/* Scanning Dots Grid Overlay */}
                        {scanPhase === "scanning" && (
                          <div className="absolute inset-0">
                            {[...Array(16)].map((_, i) => (
                              <motion.div
                                key={i}
                                className="absolute w-1 h-1 bg-white/50 rounded-full"
                                style={{
                                  top: `${20 + (Math.floor(i / 4)) * 20}%`,
                                  left: `${20 + (i % 4) * 20}%`,
                                }}
                                animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.5, 0.5] }}
                                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                              />
                            ))}
                          </div>
                        )}

                        {/* Success Overlay */}
                        {scanPhase === "success" && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-emerald-500/20 backdrop-blur-[2px] flex items-center justify-center border-[4px] border-emerald-500/50"
                          >
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }} transition={{ type: "spring" }}>
                              <CheckCircle2 className="w-20 h-20 text-emerald-400 drop-shadow-[0_0_20px_rgba(16,185,129,1)] bg-black/40 rounded-full" />
                            </motion.div>
                          </motion.div>
                        )}
                        
                        {/* Analyzing Overlay */}
                        {scanPhase === "analyzing" && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-primary/20 backdrop-blur-[4px] flex flex-col items-center justify-center border-[2px] border-primary/50 gap-4"
                          >
                            <Loader2 className="w-12 h-12 text-white animate-spin drop-shadow-xl" />
                            <p className="text-white font-mono text-sm uppercase tracking-widest shadow-black drop-shadow-md">Matching Hash...</p>
                          </motion.div>
                        )}
                      </div>
                    </div>

                    {/* Scanner Status Bar */}
                    <div className="p-5 bg-black/80 backdrop-blur-md border-t border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <motion.div 
                            animate={{ opacity: [0.4, 1, 0.4] }} 
                            transition={{ duration: 1, repeat: Infinity }}
                          >
                            <Camera className={`w-4 h-4 ${scanPhase === "success" ? "text-emerald-400" : "text-primary"}`} />
                          </motion.div>
                          <span className="text-xs font-mono text-white/70 uppercase tracking-widest">
                            {scanPhase === "requesting" && "Initializing feed..."}
                            {scanPhase === "scanning" && "Acquiring biometric map..."}
                            {scanPhase === "analyzing" && "Comparing matrices..."}
                            {scanPhase === "success" && "Identity confirmed"}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-white/50">{Math.round(scanProgress)}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden shadow-inner flex">
                        <motion.div
                          className="h-full rounded-r-full"
                          style={{ background: scanPhase === "success" ? "#10B981" : "#3B82F6" }}
                          animate={{ width: `${scanProgress}%` }}
                          transition={{ ease: "easeOut" }}
                        />
                        {scanPhase === "scanning" && (
                          <motion.div 
                            className="h-full w-20 bg-white/50 blur-[4px] -ml-10"
                            animate={{ x: ["-100%", "500%"] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          />
                        )}
                      </div>
                      <div className="mt-4 flex justify-between items-center text-[10px] text-white/30 uppercase tracking-wider font-mono">
                         <span>Sys.Sec.Lvl: Max</span>
                         <button
                          onClick={() => { stopCamera(); setScanPhase("idle"); }}
                          className="hover:text-white transition-colors underline underline-offset-4"
                        >
                          Abort Sequence
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-[10px] uppercase tracking-widest text-white/30 font-semibold">Fallback</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            {/* Standard Login Form */}
            <form onSubmit={(e) => { 
                e.preventDefault(); 
                login(emailInput || "admin@seea.edu"); 
                navigate("/dashboard"); 
              }} className="space-y-5">
              <div className="space-y-1.5">
                <label className="text-[11px] text-white/50 font-semibold uppercase tracking-wider ml-1 block">Email Node</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-primary transition-colors z-10" />
                  <input type="email" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} placeholder="admin@seea.edu" className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-black/80 transition-all shadow-inner relative z-0" required />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] text-white/50 font-semibold uppercase tracking-wider ml-1 block">Passcode</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 group-focus-within:text-primary transition-colors z-10" />
                  <input type={showPassword ? "text" : "password"} placeholder="••••••••" className="w-full pl-12 pr-12 py-3.5 rounded-xl bg-black/50 border border-white/10 text-white text-sm placeholder:text-white/20 focus:outline-none focus:border-primary/50 focus:bg-black/80 transition-all shadow-inner relative z-0" required />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors z-10 p-1">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2">
                <label className="flex items-center gap-2 group cursor-pointer">
                  <div className="w-4 h-4 rounded border border-white/20 bg-black/50 flex items-center justify-center group-hover:border-primary/50 transition-colors">
                    <input type="checkbox" className="opacity-0 absolute w-4 h-4 cursor-pointer" />
                    <CheckCircle2 className="w-3 h-3 text-primary opacity-0 group-has-[:checked]:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-xs font-semibold text-white/50 uppercase tracking-wide">Remember Me</span>
                </label>
                <a href="#" className="text-xs font-semibold text-primary/80 hover:text-primary uppercase tracking-wide hover:underline underline-offset-4 transition-all">Recover Access</a>
              </div>
              <button type="submit" className="w-full py-4 mt-2 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)]">
                Initialize Session
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
