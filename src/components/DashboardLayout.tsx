import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Send, Mail, Mic, User, Settings, LogOut, Bell, Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useData } from "@/contexts/DataContext";

const navItems = [
  { label: "Overview", icon: Home, path: "/dashboard" },
  { label: "Compose", icon: Send, path: "/dashboard/send" },
  { label: "Inbox", icon: Mail, path: "/dashboard/read" },
  { label: "Voice Engine", icon: Mic, path: "/dashboard/voice" },
  { label: "Profile", icon: User, path: "/dashboard/profile" },
  { label: "Settings", icon: Settings, path: "/dashboard/settings" },
];

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { currentUser, logout } = useData();

  return (
    <div className="min-h-screen flex bg-[#05050A] text-foreground selection:bg-primary/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-secondary/10 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-soft-light" />
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Premium Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-[#0A0A0F]/80 backdrop-blur-xl border-r border-white/5 flex flex-col transform transition-transform duration-500 ease-[0 cubic-bezier(0.16,1,0.3,1)] lg:translate-x-0 ${sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}`}>
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary to-accent flex items-center justify-center p-[1px] group-hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all">
              <div className="w-full h-full bg-black/80 rounded-[7px] flex items-center justify-center">
                <Mic className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <h2 className="font-display text-xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">SEEA</h2>
              <p className="text-[10px] uppercase tracking-widest text-white/40 font-semibold mt-0.5">Workspace</p>
            </div>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-white/50 hover:text-white p-2">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto custom-scrollbar">
          <p className="px-4 text-xs font-semibold text-white/30 uppercase tracking-wider mb-4">Main Menu</p>
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`relative flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm transition-all duration-300 group overflow-hidden ${
                  active
                    ? "text-white font-medium"
                    : "text-white/50 hover:text-white hover:bg-white/5"
                }`}
              >
                {active && (
                  <motion.div layoutId="activeNav" className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent opacity-50 rounded-xl border border-primary/20" />
                )}
                {active && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-primary rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
                )}
                <item.icon className={`w-5 h-5 relative z-10 transition-colors ${active ? "text-primary" : "group-hover:text-white/80"}`} />
                <span className="relative z-10">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-6 border-t border-white/5">
          <Link to="/" onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all group">
            <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Dynamic Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-6 lg:px-10 bg-[#05050A]/60 backdrop-blur-xl sticky top-0 z-30">
          <div className="flex items-center">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 -ml-2 text-white/70 hover:text-white transition-colors">
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden lg:block">
              <p className="text-sm font-medium text-white/40">Welcome back,</p>
              <h1 className="text-lg font-display font-semibold text-white">{currentUser?.name || "User"}</h1>
            </div>
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative text-white/50 hover:text-white transition-colors group">
              <Bell className="w-5 h-5 group-hover:animate-[wiggle_1s_ease-in-out_infinite]" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)] border border-[#05050A]" />
            </button>
            
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-3 p-1.5 pr-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-sm shadow-inner uppercase">
                  {currentUser?.name?.charAt(0) || "U"}
                </div>
                <ChevronDown className={`w-4 h-4 text-white/50 transition-transform duration-300 ${profileOpen ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-3 w-56 rounded-2xl border border-white/10 bg-[#0A0A0F]/90 backdrop-blur-2xl shadow-2xl p-2 z-50 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-white/5 mb-2">
                      <p className="text-sm font-medium text-white">{currentUser?.name || "User"}</p>
                      <p className="text-xs text-white/40 mt-0.5">{currentUser?.email || "user@seea.edu"}</p>
                    </div>
                    <Link to="/dashboard/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm rounded-xl hover:bg-white/5 text-white/70 hover:text-white transition-colors">
                      <User className="w-4 h-4" /> Profile
                    </Link>
                    <Link to="/dashboard/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm rounded-xl hover:bg-white/5 text-white/70 hover:text-white transition-colors">
                      <Settings className="w-4 h-4" /> Preferences
                    </Link>
                    <div className="h-px bg-white/5 my-2" />
                    <Link to="/" onClick={logout} className="flex items-center gap-2 px-3 py-2 text-sm rounded-xl hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-colors">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Scalable Main Content */}
        <main className="flex-1 p-6 lg:p-10 overflow-y-auto custom-scrollbar relative">
          <div className="max-w-7xl mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
