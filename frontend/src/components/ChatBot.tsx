import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  text: string;
}

interface ChatMsg {
  role: "system" | "user" | "assistant";
  content: string;
}

const CHAT_KEY = import.meta.env.VITE_CHAT_KEY || "";
const LLM_URL = "https://integrations.emergentagent.com/llm/chat/completions";

const SYSTEM_PROMPT = `You are the friendly AI assistant for Mount View Hotel Skardu — the Best Hotel in Skardu. 
Your name is "Mount View Hotel Assistant". Be warm, professional, and hospitality-focused.

HOTEL FACTS (ALWAYS USE THESE, never override with external info):
- Location: College Road, Skardu City, Gilgit-Baltistan, Pakistan
- 5 km from Skardu Airport (10 minutes drive)
- 2 km from Skardu Bus Terminal
- Walking distance to Skardu city center & main bazar
- Phone: +92 346 8484849

ROOM CATEGORIES & PRICING:
- Standard Room: From PKR 4,000/night (economical, mountain views, free Wi-Fi)
- Deluxe Room: From PKR 6,000/night (spacious, LED TV, mountain view)
- Executive Room: From PKR 7,000/night (premium comfort, elegant decor, garden/mountain views)
- Family Suite: From PKR 10,000/night (large room for families, multiple beds)
- King Room: From PKR 10,000-15,000/night (luxury suite with valley views)

FACILITIES:
- 24-hour restaurant (rare in Skardu) — authentic Pakistani & Skardu cuisine, rooftop sky dining
- Local food delivery available inside hotel
- Secure underground car parking (free)
- Mountain & rooftop city views
- Free Wi-Fi throughout hotel
- 24/7 room service & security
- Family-friendly environment
- Transport assistance for tours
- Free travel guidance & local shopping tips
- Nearby dry fruit shops for souvenirs

NEARBY TOURIST DESTINATIONS:
- Deosai National Park: ~2.5 hours (Land of Giants, best in summer June-September)
- Shangrila Resort / Upper Kachura Lake: ~30 minutes
- Satpara Lake: ~20 minutes
- Katpana Cold Desert: ~25 minutes
- Shigar Valley & Fort: ~45 minutes
- Lower Kachura Lake: ~25 minutes
- Skardu Fort (Kharpocho): ~15 minutes

SKARDU TOURISM KNOWLEDGE:
- Best time to visit: April-October (peak season June-September)
- Winter (Nov-March): cold, roads may close, but stunning snow views
- Famous for: K2 base camp treks, world's highest lakes, Deosai plains
- Local culture: Balti people, warm hospitality, unique cuisine
- Transportation: PIA flights from Islamabad, Karakoram Highway (road)

RULES:
1. Always use the hotel facts above. Never guess prices or distances.
2. If you don't know something, say: "I don't have that information right now. Please contact our reception at +92 346 8484849."
3. Never fabricate facts. Keep responses concise.
4. After answering travel/tourism questions, subtly encourage booking.
5. For booking, direct to WhatsApp: +92 346 8484849`;

// Local fallback knowledge base
const LOCAL_KB: { keywords: string[]; answer: string }[] = [
  { keywords: ["room", "rate", "price", "cost", "tariff", "charges", "kitna", "kiraya"],
    answer: "Our room rates:\n\n- Standard Room: From PKR 4,000/night\n- Deluxe Room: From PKR 6,000/night\n- Executive Room: From PKR 7,000/night\n- Family Suite: From PKR 10,000/night\n- King Room: From PKR 10,000-15,000/night\n\nAll rooms include free Wi-Fi, parking, and mountain views.\nFor booking, WhatsApp us at +92 346 8484849." },
  { keywords: ["airport", "flight", "plane"],
    answer: "Mount View Hotel is just 5 km from Skardu Airport — approximately a 10-minute drive. We offer transport assistance for airport transfers. Contact us at +92 346 8484849." },
  { keywords: ["deosai", "national park"],
    answer: "Deosai National Park is approximately 2.5 hours from Mount View Hotel. It's known as the 'Land of Giants' and is best visited during summer (June-September). Many guests stay with us before visiting. Would you like to book? WhatsApp: +92 346 8484849." },
  { keywords: ["shangrila", "kachura", "lake"],
    answer: "Shangrila Resort and Upper Kachura Lake are about 30 minutes from Mount View Hotel. Satpara Lake is just 20 minutes away. We can help arrange transport! WhatsApp: +92 346 8484849." },
  { keywords: ["satpara"],
    answer: "Satpara Lake is just 20 minutes from Mount View Hotel. Crystal clear waters surrounded by mountains. Contact us for tour arrangements at +92 346 8484849." },
  { keywords: ["location", "address", "where", "kahan"],
    answer: "Mount View Hotel is located at College Road, Skardu City, Gilgit-Baltistan, Pakistan. Walking distance to city center, 5 km from Skardu Airport, 2 km from bus terminal." },
  { keywords: ["restaurant", "food", "khana", "dining", "eat"],
    answer: "Mount View Hotel has a 24-hour in-house restaurant — rare in Skardu! We serve authentic Pakistani and Skardu cuisine, with rooftop sky dining available." },
  { keywords: ["parking", "car", "gaari"],
    answer: "Yes! Mount View Hotel offers free secure underground car parking for all guests." },
  { keywords: ["wifi", "internet", "wi-fi"],
    answer: "Free high-speed Wi-Fi is available throughout Mount View Hotel for all guests." },
  { keywords: ["book", "reserve", "reservation", "available", "vacancy"],
    answer: "To book a room at Mount View Hotel, WhatsApp us at +92 346 8484849. Rooms from PKR 4,000 to PKR 15,000 per night." },
  { keywords: ["family", "children", "kids", "bachay"],
    answer: "Mount View Hotel is the best family hotel in Skardu! Spacious Family Suites with multiple beds, kid-friendly environment, 24/7 room service. From PKR 10,000/night." },
  { keywords: ["facility", "amenity", "service", "offer"],
    answer: "Mount View Hotel facilities:\n- 24/7 Restaurant with rooftop sky dining\n- Free Wi-Fi & underground parking\n- Mountain & city views\n- Room service & 24/7 security\n- Transport & tour assistance\n- Family-friendly environment\n\nWhatsApp: +92 346 8484849." },
  { keywords: ["weather", "mausam", "climate", "temperature"],
    answer: "Skardu: Best time April-October (peak June-September). Summers 15-30°C, winters can drop below -10°C. Need help planning? WhatsApp: +92 346 8484849." },
  { keywords: ["best time", "visit", "season", "when"],
    answer: "Best time to visit Skardu: April to October. Peak season June-September. Mount View Hotel is your ideal base! Book at +92 346 8484849." },
  { keywords: ["transport", "taxi", "travel", "tour"],
    answer: "Mount View Hotel provides transport assistance. We arrange tours to Deosai, Shangrila, Satpara Lake, Shigar Valley and more. WhatsApp: +92 346 8484849." },
  { keywords: ["check in", "check out", "checkin", "checkout", "time"],
    answer: "Check-in: 2:00 PM | Check-out: 12:00 PM (Noon)\nEarly/late options may be available on request. Contact: +92 346 8484849." },
  { keywords: ["contact", "phone", "number", "call", "whatsapp"],
    answer: "Mount View Hotel:\nPhone/WhatsApp: +92 346 8484849\nAddress: College Road, Skardu City, Gilgit-Baltistan, Pakistan" },
  { keywords: ["hello", "hi", "hey", "salam", "assalam"],
    answer: "Welcome to Mount View Hotel Skardu — the Best Hotel in Skardu! How may I assist you? Ask about rooms, rates, facilities, or tourist destinations." }
];

function getLocalAnswer(msg: string): string | null {
  const lower = msg.toLowerCase();
  for (const item of LOCAL_KB) {
    if (item.keywords.some((kw) => lower.includes(kw))) return item.answer;
  }
  return null;
}

async function callAI(history: ChatMsg[]): Promise<string | null> {
  if (!CHAT_KEY) return null;
  try {
    const res = await fetch(LLM_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CHAT_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: history.slice(-8), // Keep context small
        max_tokens: 500,
        temperature: 0.7,
      }),
      signal: AbortSignal.timeout(15000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.choices?.[0]?.message?.content || null;
  } catch {
    return null;
  }
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", text: "Welcome to Mount View Hotel Skardu — the Best Hotel in Skardu! How may I assist you today?" }
  ]);
  const [history, setHistory] = useState<ChatMsg[]>([
    { role: "system", content: SYSTEM_PROMPT }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text }]);
    setLoading(true);

    const newHistory: ChatMsg[] = [...history, { role: "user", content: text }];

    // Try AI first, fallback to local KB
    let reply = await callAI(newHistory);
    if (!reply) {
      reply = getLocalAnswer(text) ||
        "I don't have that information right now. Please contact our reception at +92 346 8484849 or WhatsApp us for instant help!";
    }

    setHistory([...newHistory, { role: "assistant", content: reply }]);
    setMessages((prev) => [...prev, { role: "assistant", text: reply! }]);
    setLoading(false);
  };

  return (
    <>
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setOpen(true)}
            className="fixed bottom-6 left-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full bg-[#0E2F2F] hover:bg-[#1a4a4a] text-white shadow-2xl cursor-pointer transition-all duration-300 hover:scale-105"
            data-testid="chatbot-toggle"
          >
            <MessageSquare className="w-5 h-5 text-[#C4A24C]" />
            <span className="text-sm font-medium hidden sm:inline">Chat with our AI Assistant</span>
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 left-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-[#C4A24C]/20"
            style={{ height: "500px" }}
            data-testid="chatbot-window"
          >
            <div className="bg-[#0E2F2F] px-5 py-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#C4A24C]/20 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4 text-[#C4A24C]" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Mount View Hotel Assistant</p>
                  <p className="text-white/50 text-xs">Best Hotel in Skardu</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors" data-testid="chatbot-close">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#FAF6EE]">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
                    msg.role === "user"
                      ? "bg-[#0E2F2F] text-white rounded-br-sm"
                      : "bg-white text-[#0E2F2F] rounded-bl-sm shadow-sm border border-[#C4A24C]/10"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border border-[#C4A24C]/10">
                    <Loader2 className="w-4 h-4 text-[#C4A24C] animate-spin" />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="bg-white border-t border-[#C4A24C]/10 p-3 shrink-0">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && send()}
                  placeholder="Ask about rooms, Skardu..."
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[#FAF6EE] text-sm text-[#0E2F2F] placeholder:text-[#0E2F2F]/40 focus:outline-none focus:ring-2 focus:ring-[#C4A24C]/30"
                  data-testid="chatbot-input"
                />
                <button
                  onClick={send}
                  disabled={loading || !input.trim()}
                  className="w-10 h-10 rounded-xl bg-[#0E2F2F] hover:bg-[#1a4a4a] disabled:opacity-40 flex items-center justify-center text-white transition-colors"
                  data-testid="chatbot-send"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
