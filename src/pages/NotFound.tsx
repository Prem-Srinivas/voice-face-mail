import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Home, MoveLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Anomaly: Invalid matrix vector accessed:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#05050A] relative overflow-hidden text-foreground selection:bg-primary/30">
      
      {/* Background Glitch Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-red-500/10 rounded-full blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light" />
      </div>

      <div className="relative z-10 text-center max-w-lg p-8">
        <motion.div
           initial={{ opacity: 0, scale: 0.9, y: 20 }}
           animate={{ opacity: 1, scale: 1, y: 0 }}
           transition={{ duration: 0.5, type: "spring" }}
           className="relative"
        >
          {/* Glitch 404 text */}
          <div className="relative inline-block mb-6">
            <h1 className="text-8xl md:text-9xl font-display font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 select-none">
              404
            </h1>
            <h1 className="text-8xl md:text-9xl font-display font-black text-red-500 absolute top-0 left-0 -translate-x-1 translate-y-1 opacity-50 mix-blend-screen animate-[glitch_2s_infinite] select-none pointer-events-none">
              404
            </h1>
            <h1 className="text-8xl md:text-9xl font-display font-black text-cyan-500 absolute top-0 left-0 translate-x-1 -translate-y-1 opacity-50 mix-blend-screen animate-[glitch_3s_infinite_reverse] select-none pointer-events-none">
              404
            </h1>
          </div>

          <div className="flex items-center justify-center gap-3 mb-4">
             <AlertTriangle className="w-6 h-6 text-red-500" />
             <h2 className="text-2xl font-bold text-white tracking-widest uppercase">Sector Not Found</h2>
          </div>
          
          <p className="text-white/40 mb-10 text-sm leading-relaxed max-w-sm mx-auto font-mono">
            Error: Node <span className="text-red-400">"{location.pathname}"</span> does not exist in the current spatial mapping. It may have been relocated or purged.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/" className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/70 font-semibold hover:bg-white/10 hover:text-white transition-all group">
              <MoveLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </Link>
            <Link to="/dashboard" className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold hover:scale-105 active:scale-95 transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] border border-primary/50">
              <Home className="w-4 h-4" />
              Return Home
            </Link>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes glitch {
          0% { clip-path: inset(20% 0 80% 0); transform: translate(-2px, 1px); }
          20% { clip-path: inset(60% 0 10% 0); transform: translate(2px, -1px); }
          40% { clip-path: inset(40% 0 50% 0); transform: translate(-2px, 2px); }
          60% { clip-path: inset(80% 0 5% 0); transform: translate(2px, -2px); }
          80% { clip-path: inset(10% 0 70% 0); transform: translate(-1px, 1px); }
          100% { clip-path: inset(30% 0 50% 0); transform: translate(1px, -1px); }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
