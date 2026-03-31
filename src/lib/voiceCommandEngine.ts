// Voice Command Engine - Client-side NLP intent parser

export type CommandIntent =
  | "send_email"
  | "read_emails"
  | "reply_email"
  | "delete_email"
  | "search_email"
  | "open_inbox"
  | "open_starred"
  | "schedule_email"
  | "open_settings"
  | "open_profile"
  | "open_dashboard"
  | "logout"
  | "login"
  | "unknown";

export interface ParsedCommand {
  intent: CommandIntent;
  confidence: number;
  recipient?: string;
  subject?: string;
  message?: string;
  searchQuery?: string;
  scheduleTime?: string;
  raw: string;
}

interface IntentPattern {
  intent: CommandIntent;
  patterns: RegExp[];
  weight: number;
}

const INTENT_PATTERNS: IntentPattern[] = [
  {
    intent: "send_email",
    patterns: [
      /send\s+(an?\s+)?email/i,
      /compose\s+(an?\s+)?email/i,
      /write\s+(an?\s+)?email/i,
      /email\s+to\s+/i,
      /send\s+message\s+to/i,
      /mail\s+to\s+/i,
      /new\s+email/i,
    ],
    weight: 1,
  },
  {
    intent: "read_emails",
    patterns: [
      /read\s+(my\s+)?(unread\s+)?email/i,
      /check\s+(my\s+)?email/i,
      /read\s+(my\s+)?inbox/i,
      /what('s|s)?\s+(in\s+)?(my\s+)?inbox/i,
      /any\s+new\s+(email|message)/i,
      /read\s+(only\s+)?important/i,
      /read\s+latest/i,
    ],
    weight: 1,
  },
  {
    intent: "reply_email",
    patterns: [
      /reply\s+(to\s+)?/i,
      /respond\s+to/i,
      /answer\s+(the\s+)?email/i,
      /write\s+back/i,
    ],
    weight: 1,
  },
  {
    intent: "delete_email",
    patterns: [
      /delete\s+(this\s+)?email/i,
      /remove\s+(this\s+)?email/i,
      /trash\s+(this\s+)?email/i,
      /delete\s+spam/i,
    ],
    weight: 1,
  },
  {
    intent: "search_email",
    patterns: [
      /search\s+(for\s+)?/i,
      /find\s+(email|message)/i,
      /look\s+(for|up)\s+/i,
      /filter\s+email/i,
    ],
    weight: 1,
  },
  {
    intent: "open_inbox",
    patterns: [
      /open\s+(my\s+)?inbox/i,
      /go\s+to\s+inbox/i,
      /show\s+(my\s+)?inbox/i,
      /open\s+email/i,
    ],
    weight: 1,
  },
  {
    intent: "open_starred",
    patterns: [
      /open\s+starred/i,
      /show\s+starred/i,
      /starred\s+email/i,
      /favorites/i,
    ],
    weight: 1,
  },
  {
    intent: "schedule_email",
    patterns: [
      /schedule\s+(an?\s+)?email/i,
      /send\s+(an?\s+)?email\s+.*(tomorrow|tonight|morning|evening|later)/i,
      /remind\s+me\s+to\s+(send|email)/i,
    ],
    weight: 1,
  },
  {
    intent: "open_settings",
    patterns: [
      /open\s+settings/i,
      /go\s+to\s+settings/i,
      /preferences/i,
    ],
    weight: 0.9,
  },
  {
    intent: "open_profile",
    patterns: [
      /open\s+(my\s+)?profile/i,
      /go\s+to\s+profile/i,
      /my\s+account/i,
    ],
    weight: 0.9,
  },
  {
    intent: "open_dashboard",
    patterns: [
      /open\s+(the\s+)?dashboard/i,
      /go\s+to\s+dashboard/i,
      /go\s+home/i,
      /open\s+home/i,
    ],
    weight: 0.9,
  },
  {
    intent: "logout",
    patterns: [
      /log\s*(me\s+)?out/i,
      /sign\s*(me\s+)?out/i,
      /exit/i,
    ],
    weight: 0.9,
  },
  {
    intent: "login",
    patterns: [
      /log\s*(me\s+)?in/i,
      /sign\s*(me\s+)?in/i,
    ],
    weight: 0.9,
  },
];

function extractRecipient(text: string): string | undefined {
  // Match "to <name/email>"
  const toMatch = text.match(/(?:to|email)\s+([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/i);
  if (toMatch) return toMatch[1];
  
  const nameMatch = text.match(/(?:to|email)\s+(\w+(?:\s+\w+)?)\b/i);
  if (nameMatch && !["the", "my", "an", "a", "this", "that"].includes(nameMatch[1].toLowerCase())) {
    return nameMatch[1];
  }
  return undefined;
}

function extractMessage(text: string): string | undefined {
  const sayingMatch = text.match(/(?:saying|that says?|with message|body|content)\s+(.+)/i);
  if (sayingMatch) return sayingMatch[1].trim();
  return undefined;
}

function extractSubject(text: string): string | undefined {
  const subjectMatch = text.match(/(?:subject|about|regarding)\s+(.+?)(?:\s+(?:saying|body|message)|$)/i);
  if (subjectMatch) return subjectMatch[1].trim();
  return undefined;
}

function extractSearchQuery(text: string): string | undefined {
  const searchMatch = text.match(/(?:search|find|look)\s+(?:for\s+|up\s+)?(.+)/i);
  if (searchMatch) return searchMatch[1].trim();
  return undefined;
}

function extractScheduleTime(text: string): string | undefined {
  const timeMatch = text.match(/(tomorrow|tonight|this morning|this evening|next week|monday|tuesday|wednesday|thursday|friday|saturday|sunday|\d{1,2}(?::\d{2})?\s*(?:am|pm)?)/i);
  if (timeMatch) return timeMatch[1];
  return undefined;
}

export function parseVoiceCommand(text: string): ParsedCommand {
  const cleaned = text.trim().toLowerCase();
  let bestMatch: { intent: CommandIntent; confidence: number } = { intent: "unknown", confidence: 0 };

  for (const { intent, patterns, weight } of INTENT_PATTERNS) {
    for (const pattern of patterns) {
      if (pattern.test(cleaned)) {
        const confidence = weight;
        if (confidence > bestMatch.confidence) {
          bestMatch = { intent, confidence };
        }
      }
    }
  }

  const result: ParsedCommand = {
    intent: bestMatch.intent,
    confidence: bestMatch.confidence,
    raw: text,
  };

  // Extract entities based on intent
  if (bestMatch.intent === "send_email" || bestMatch.intent === "schedule_email") {
    result.recipient = extractRecipient(text);
    result.subject = extractSubject(text);
    result.message = extractMessage(text);
  }

  if (bestMatch.intent === "reply_email") {
    result.message = extractMessage(text) || text.replace(/reply\s+(to\s+)?(the\s+)?(latest\s+|last\s+)?email\s*/i, "").trim() || undefined;
  }

  if (bestMatch.intent === "search_email") {
    result.searchQuery = extractSearchQuery(text);
  }

  if (bestMatch.intent === "schedule_email") {
    result.scheduleTime = extractScheduleTime(text);
  }

  return result;
}

// Command history management
export interface CommandHistoryEntry {
  id: string;
  command: string;
  intent: CommandIntent;
  confidence: number;
  timestamp: number;
  success: boolean;
}

const HISTORY_KEY = "voice_command_history";
const MAX_HISTORY = 100;

export function getCommandHistory(): CommandHistoryEntry[] {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addToHistory(entry: Omit<CommandHistoryEntry, "id" | "timestamp">): CommandHistoryEntry {
  const history = getCommandHistory();
  const newEntry: CommandHistoryEntry = {
    ...entry,
    id: crypto.randomUUID(),
    timestamp: Date.now(),
  };
  history.unshift(newEntry);
  if (history.length > MAX_HISTORY) history.pop();
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  return newEntry;
}

export function getCommandStats() {
  const history = getCommandHistory();
  const totalCommands = history.length;
  const successRate = totalCommands > 0 ? Math.round((history.filter(h => h.success).length / totalCommands) * 100) : 0;

  const intentCounts: Record<string, number> = {};
  history.forEach(h => {
    intentCounts[h.intent] = (intentCounts[h.intent] || 0) + 1;
  });

  const mostUsedCommands = Object.entries(intentCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([intent, count]) => ({ intent, count }));

  const recentCommands = history.slice(0, 10);

  const todayCommands = history.filter(h => {
    const today = new Date();
    const d = new Date(h.timestamp);
    return d.toDateString() === today.toDateString();
  }).length;

  return { totalCommands, successRate, mostUsedCommands, recentCommands, todayCommands };
}
