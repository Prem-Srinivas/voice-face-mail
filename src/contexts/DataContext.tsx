import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";

export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  phone: string;
};

export type Email = {
  id: number;
  fromName: string;
  fromEmail: string;
  toEmail: string;
  subject: string;
  preview: string;
  body: string;
  time: string;
  unread: boolean;
  starred: boolean;
  isSpam?: boolean;
};

const MOCK_USERS: User[] = [
  { id: "1", name: "Admin User", email: "admin@seea.edu", role: "Administrator", phone: "+1 (555) 123-4567" },
  { id: "2", name: "Sarah Chen", email: "sarah@seea.edu", role: "ML Engineer", phone: "+1 (555) 987-6543" },
  { id: "3", name: "John Smith", email: "john@seea.edu", role: "Project Lead", phone: "+1 (555) 345-6789" },
];

const INITIAL_EMAILS: Email[] = [
  { id: 1, fromName: "Sarah Chen", fromEmail: "sarah@seea.edu", toEmail: "admin@seea.edu", subject: "Project Update - Q4 Report", preview: "Hi, I wanted to share the latest progress on the Q4 report...", body: "Hi, I wanted to share the latest progress on the Q4 report. The data analysis is complete and we are on track for the deadline.", time: "10:30 AM", unread: true, starred: true },
  { id: 2, fromName: "John Smith", fromEmail: "john@seea.edu", toEmail: "admin@seea.edu", subject: "Meeting Tomorrow", preview: "Just a reminder that we have a team meeting scheduled for tomorrow at 2 PM...", body: "Just a reminder that we have a team meeting scheduled for tomorrow at 2 PM in conference room B. Please prepare your status updates.", time: "09:15 AM", unread: true, starred: false },
  { id: 3, fromName: "Admin User", fromEmail: "admin@seea.edu", toEmail: "sarah@seea.edu", subject: "Re: Project Update", preview: "Great work on the Q4 report. I have a few suggestions...", body: "Great work on the Q4 report. I have a few suggestions for the executive summary. Let's discuss them.", time: "11:00 AM", unread: true, starred: false },
  { id: 4, fromName: "Admin User", fromEmail: "admin@seea.edu", toEmail: "john@seea.edu", subject: "Performance Review", preview: "Please submit your self-evaluation by Friday.", body: "Please submit your self-evaluation by Friday. Let me know if you need any assistance or template.", time: "Yesterday", unread: false, starred: true },
  { id: 5, fromName: "Dev Team", fromEmail: "dev@seea.edu", toEmail: "admin@seea.edu", subject: "Sprint Review Notes", preview: "Here are the notes from our sprint review. We completed 15 out of 18 story points...", body: "Here are the notes from our sprint review. We completed 15 out of 18 story points this sprint. The remaining 3 points have been carried over.", time: "Yesterday", unread: false, starred: false },
  { id: 6, fromName: "System", fromEmail: "noreply@seea.edu", toEmail: "john@seea.edu", subject: "Security Alert", preview: "Login from new device detected...", body: "We noticed a new login from a device in New York. If this was you, ignore this message. Otherwise, change your password immediately.", time: "2 days ago", unread: true, starred: false, isSpam: true },
];

type DataContextType = {
  currentUser: User | null;
  login: (email: string) => boolean;
  logout: () => void;
  emails: Email[];
  myInbox: Email[];
  mySent: Email[];
  sendEmail: (toEmail: string, subject: string, body: string) => void;
  markAsRead: (id: number) => void;
  toggleStar: (id: number) => void;
  deleteEmail: (id: number) => void;
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem("seea_user");
    return saved ? JSON.parse(saved) : null;
  });
  
  const [emails, setEmails] = useState<Email[]>(() => {
    const saved = localStorage.getItem("seea_emails");
    return saved ? JSON.parse(saved) : INITIAL_EMAILS;
  });

  const { toast } = useToast();

  useEffect(() => {
    if (currentUser) localStorage.setItem("seea_user", JSON.stringify(currentUser));
    else localStorage.removeItem("seea_user");
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("seea_emails", JSON.stringify(emails));
  }, [emails]);

  const login = (email: string) => {
    // Face scan login defaults to admin or uses whatever is passed if we want.
    // Standard login parses the email
    const user = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      return true;
    }
    // Fallback if not found, let's just log them in as a new user or deny.
    // For the sake of demonstration, we'll allow unknown emails to login as themselves.
    const newUser = { id: Date.now().toString(), name: email.split("@")[0], email, role: "User", phone: "+1 (555) 000-0000" };
    setCurrentUser(newUser);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const sendEmail = (toEmail: string, subject: string, body: string) => {
    if (!currentUser) return;
    const newEmail: Email = {
      id: Date.now(),
      fromName: currentUser.name,
      fromEmail: currentUser.email,
      toEmail: toEmail.toLowerCase(),
      subject: subject || "(No Subject)",
      preview: body.slice(0, 50) + (body.length > 50 ? "..." : ""),
      body,
      time: "Just now",
      unread: true,
      starred: false
    };
    setEmails(prev => [newEmail, ...prev]);
    toast({ title: "Transmission Sent", description: `Successfully dispatched to ${toEmail}` });
  };

  const markAsRead = (id: number) => {
    setEmails(prev => prev.map(e => e.id === id ? { ...e, unread: false } : e));
  };

  const toggleStar = (id: number) => {
    setEmails(prev => prev.map(e => e.id === id ? { ...e, starred: !e.starred } : e));
  };

  const deleteEmail = (id: number) => {
    setEmails(prev => prev.filter(e => e.id !== id));
    toast({ title: "Email Deleted", description: "The message has been purged." });
  };

  const myInbox = emails.filter(e => currentUser && e.toEmail.toLowerCase() === currentUser.email.toLowerCase());
  const mySent = emails.filter(e => currentUser && e.fromEmail.toLowerCase() === currentUser.email.toLowerCase());

  return (
    <DataContext.Provider value={{ currentUser, login, logout, emails, myInbox, mySent, sendEmail, markAsRead, toggleStar, deleteEmail }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
