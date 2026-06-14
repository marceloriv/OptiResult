import { useState, useRef, useEffect } from "react";
import {
  Send,
  Paperclip,
  Smile,
  Hash,
  Lock,
  Phone,
  Video,
  Search,
  Plus,
  AtSign,
  Bell,
  MoreHorizontal,
  ChevronDown,
  Check,
  CheckCheck,
} from "lucide-react";

interface Message {
  id: string;
  author: string;
  initials: string;
  text: string;
  time: string;
  reactions?: { emoji: string; count: number }[];
  isOwn?: boolean;
  status?: "sent" | "delivered" | "read";
}

interface Channel {
  id: string;
  name: string;
  type: "public" | "private";
  unread?: number;
  active?: boolean;
}

const channels: Channel[] = [
  { id: "1", name: "general", type: "public", unread: 3 },
  { id: "2", name: "proyecto-alpha", type: "public", active: true },
  { id: "3", name: "proyecto-beta", type: "public", unread: 7 },
  { id: "4", name: "proyecto-gamma", type: "public" },
  { id: "5", name: "liderazgo", type: "private" },
  { id: "6", name: "standup-diario", type: "private", unread: 1 },
];

const directMessages = [
  { id: "d1", name: "Carlos López", initials: "CL", online: true },
  { id: "d2", name: "Sara Gómez", initials: "SG", online: true },
  { id: "d3", name: "Luis Vargas", initials: "LV", online: false },
  { id: "d4", name: "María Torres", initials: "MT", online: false },
];

const messages: Record<string, Message[]> = {
  "2": [
    { id: "1", author: "Carlos López", initials: "CL", text: "Buenos días equipo! Acabo de terminar la revisión del módulo de autenticación.", time: "09:14", reactions: [{ emoji: "👍", count: 3 }] },
    { id: "2", author: "Sara Gómez", initials: "SG", text: "Excelente Carlos! Lo revisaré esta tarde. ¿Tienes la documentación lista?", time: "09:17" },
    { id: "3", author: "Carlos López", initials: "CL", text: "Sí, subí el README actualizado al repo. También agregué los tests de integración.", time: "09:19", reactions: [{ emoji: "🚀", count: 2 }, { emoji: "✅", count: 4 }] },
    { id: "4", author: "Ana Martínez", initials: "AM", text: "Perfecto equipo. Recuerden que el standup es a las 10:00. El cliente espera la demo del viernes.", time: "09:45", isOwn: false },
    { id: "5", author: "Luis Vargas", initials: "LV", text: "Ya tengo el ambiente de staging listo con los últimos cambios desplegados ✅", time: "09:52", reactions: [{ emoji: "🎉", count: 5 }] },
    { id: "6", author: "Javier Díaz", initials: "JD", text: "Los tests de QA están corriendo. Hasta ahora 0 fallas críticas, 2 warnings menores.", time: "10:03" },
    { id: "7", author: "Ana Martínez", initials: "AM", text: "Perfecto Javier. Una vez que termines, súbeme el reporte al Confluence.", time: "10:05", isOwn: true, status: "read" },
  ],
};

const avatarColors = ["#4429F2", "#F272EA", "#1B65A6", "#410759", "#242CBF", "#3D25D9"];

function getAvatarColor(initials: string) {
  return avatarColors[initials.charCodeAt(0) % avatarColors.length];
}

function MessageBubble({ msg }: { msg: Message }) {
  const avatarColor = getAvatarColor(msg.initials);

  if (msg.isOwn) {
    return (
      <div className="flex justify-end gap-2 group">
        <div className="flex flex-col items-end gap-1" style={{ maxWidth: "70%" }}>
          <div
            className="rounded-2xl rounded-tr-sm px-4 py-2.5"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            <p style={{ fontSize: "0.82rem", lineHeight: 1.5 }}>{msg.text}</p>
          </div>
          <div className="flex items-center gap-1" style={{ color: "var(--muted-foreground)" }}>
            <span style={{ fontSize: "0.65rem" }}>{msg.time}</span>
            {msg.status === "read" ? <CheckCheck size={11} color="#79AEF2" /> : <Check size={11} />}
          </div>
          {msg.reactions && (
            <div className="flex gap-1">
              {msg.reactions.map((r) => (
                <span key={r.emoji} className="rounded-full px-2 py-0.5 flex items-center gap-1"
                  style={{ background: "var(--muted)", fontSize: "0.65rem", color: "var(--foreground)" }}>
                  {r.emoji} {r.count}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 group">
      <div
        className="rounded-full flex items-center justify-center shrink-0"
        style={{ width: 32, height: 32, background: avatarColor, fontSize: "0.7rem", fontWeight: 700, color: "#F2F2F2" }}
      >
        {msg.initials}
      </div>
      <div className="flex flex-col gap-1" style={{ maxWidth: "70%" }}>
        <div className="flex items-baseline gap-2">
          <span style={{ fontSize: "0.78rem", fontWeight: 600, color: "var(--foreground)" }}>{msg.author}</span>
          <span style={{ fontSize: "0.65rem", color: "var(--muted-foreground)" }}>{msg.time}</span>
        </div>
        <div
          className="rounded-2xl rounded-tl-sm px-4 py-2.5"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <p style={{ fontSize: "0.82rem", lineHeight: 1.5, color: "var(--foreground)" }}>{msg.text}</p>
        </div>
        {msg.reactions && (
          <div className="flex gap-1">
            {msg.reactions.map((r) => (
              <span key={r.emoji} className="rounded-full px-2 py-0.5 flex items-center gap-1 cursor-pointer transition-colors"
                style={{ background: "var(--muted)", fontSize: "0.65rem", color: "var(--foreground)" }}>
                {r.emoji} {r.count}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const activityFeed = [
  { id: 1, text: "Ana completó tarea «Revisión de sprint»", time: "hace 10m", icon: "✅" },
  { id: 2, text: "Carlos subió 3 archivos a Proyecto Alpha", time: "hace 25m", icon: "📎" },
  { id: 3, text: "Reunión de retrospectiva programada para el viernes", time: "hace 1h", icon: "📅" },
  { id: 4, text: "Sara mencionó a Luis en #proyecto-beta", time: "hace 2h", icon: "💬" },
  { id: 5, text: "Deadline de Sprint 12 actualizado", time: "hace 3h", icon: "🔔" },
  { id: 6, text: "Javier aprobó el PR «feat/auth-module»", time: "hace 4h", icon: "🚀" },
];

export function Collaboration() {
  const [activeChannel, setActiveChannel] = useState("2");
  const [input, setInput] = useState("");
  const [chatMessages, setChatMessages] = useState(messages["2"] || []);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages]);

  function sendMessage() {
    if (!input.trim()) return;
    const newMsg: Message = {
      id: Date.now().toString(),
      author: "Ana Martínez",
      initials: "AM",
      text: input.trim(),
      time: new Date().toLocaleTimeString("es-CO", { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
      status: "sent",
    };
    setChatMessages((prev) => [...prev, newMsg]);
    setInput("");
  }

  const activeChannelData = channels.find((c) => c.id === activeChannel);

  return (
    <div className="flex h-full overflow-hidden">
      {/* Channel list */}
      <div
        className="flex flex-col shrink-0 overflow-y-auto"
        style={{ width: 220, borderRight: "1px solid var(--border)", background: "rgba(6,22,115,0.3)" }}
      >
        {/* Search */}
        <div className="p-3" style={{ borderBottom: "1px solid var(--border)" }}>
          <div
            className="flex items-center gap-2 rounded-lg px-3 py-2"
            style={{ background: "var(--muted)" }}
          >
            <Search size={12} color="var(--muted-foreground)" />
            <input
              placeholder="Buscar..."
              style={{ background: "none", border: "none", outline: "none", color: "var(--foreground)", fontSize: "0.75rem", width: "100%" }}
            />
          </div>
        </div>

        {/* Channels */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontSize: "0.65rem", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
              Canales
            </span>
            <button style={{ color: "var(--muted-foreground)", background: "none", border: "none", cursor: "pointer" }}>
              <Plus size={12} />
            </button>
          </div>
          {channels.filter((c) => c.type === "public").map((ch) => (
            <button
              key={ch.id}
              onClick={() => setActiveChannel(ch.id)}
              className="flex items-center justify-between w-full rounded-lg px-2 py-1.5 transition-colors"
              style={{
                background: activeChannel === ch.id ? "var(--sidebar-accent)" : "transparent",
                border: "none",
                cursor: "pointer",
                color: activeChannel === ch.id ? "var(--foreground)" : "var(--muted-foreground)",
              }}
            >
              <div className="flex items-center gap-2">
                <Hash size={12} />
                <span style={{ fontSize: "0.78rem" }}>{ch.name}</span>
              </div>
              {ch.unread && (
                <span
                  className="rounded-full px-1.5"
                  style={{ fontSize: "0.6rem", background: "var(--accent)", color: "var(--accent-foreground)", fontWeight: 700, minWidth: 16, textAlign: "center" }}
                >
                  {ch.unread}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Private */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontSize: "0.65rem", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
              Privados
            </span>
          </div>
          {channels.filter((c) => c.type === "private").map((ch) => (
            <button
              key={ch.id}
              onClick={() => setActiveChannel(ch.id)}
              className="flex items-center justify-between w-full rounded-lg px-2 py-1.5 transition-colors"
              style={{
                background: activeChannel === ch.id ? "var(--sidebar-accent)" : "transparent",
                border: "none",
                cursor: "pointer",
                color: activeChannel === ch.id ? "var(--foreground)" : "var(--muted-foreground)",
              }}
            >
              <div className="flex items-center gap-2">
                <Lock size={11} />
                <span style={{ fontSize: "0.78rem" }}>{ch.name}</span>
              </div>
              {ch.unread && (
                <span
                  className="rounded-full px-1.5"
                  style={{ fontSize: "0.6rem", background: "var(--accent)", color: "var(--accent-foreground)", fontWeight: 700 }}
                >
                  {ch.unread}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* DMs */}
        <div className="p-3">
          <div className="flex items-center justify-between mb-2">
            <span style={{ fontSize: "0.65rem", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
              Mensajes directos
            </span>
          </div>
          {directMessages.map((dm) => (
            <button
              key={dm.id}
              className="flex items-center gap-2 w-full rounded-lg px-2 py-1.5 transition-colors"
              style={{ background: "transparent", border: "none", cursor: "pointer", color: "var(--muted-foreground)" }}
            >
              <div className="relative shrink-0">
                <div
                  className="rounded-full flex items-center justify-center"
                  style={{ width: 22, height: 22, background: getAvatarColor(dm.initials), fontSize: "0.55rem", fontWeight: 700, color: "#F2F2F2" }}
                >
                  {dm.initials}
                </div>
                <div
                  className="absolute rounded-full"
                  style={{ width: 7, height: 7, bottom: -1, right: -1, background: dm.online ? "#22c55e" : "#4B5563", border: "1px solid var(--background)" }}
                />
              </div>
              <span style={{ fontSize: "0.75rem" }}>{dm.name.split(" ")[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Chat area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Chat header */}
        <div
          className="flex items-center justify-between px-5 py-3 shrink-0"
          style={{ borderBottom: "1px solid var(--border)" }}
        >
          <div className="flex items-center gap-3">
            <Hash size={16} color="var(--muted-foreground)" />
            <span style={{ fontWeight: 600, color: "var(--foreground)", fontSize: "0.95rem" }}>
              {activeChannelData?.name ?? "general"}
            </span>
            <span style={{ fontSize: "0.72rem", color: "var(--muted-foreground)" }}>
              · 6 participantes
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button style={{ color: "var(--muted-foreground)", background: "none", border: "none", cursor: "pointer" }}>
              <Phone size={16} />
            </button>
            <button style={{ color: "var(--muted-foreground)", background: "none", border: "none", cursor: "pointer" }}>
              <Video size={16} />
            </button>
            <button style={{ color: "var(--muted-foreground)", background: "none", border: "none", cursor: "pointer" }}>
              <Bell size={16} />
            </button>
            <button style={{ color: "var(--muted-foreground)", background: "none", border: "none", cursor: "pointer" }}>
              <Search size={16} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
          <div
            className="rounded-lg px-4 py-2 text-center"
            style={{ background: "var(--muted)", alignSelf: "center" }}
          >
            <span style={{ fontSize: "0.7rem", color: "var(--muted-foreground)" }}>Hoy — 14 de junio 2026</span>
          </div>
          {chatMessages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-5 pb-5 shrink-0">
          <div
            className="flex items-center gap-3 rounded-xl px-4 py-3"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <button style={{ color: "var(--muted-foreground)", background: "none", border: "none", cursor: "pointer" }}>
              <Paperclip size={16} />
            </button>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder={`Mensaje en #${activeChannelData?.name ?? "general"}...`}
              className="flex-1"
              style={{ background: "none", border: "none", outline: "none", color: "var(--foreground)", fontSize: "0.85rem" }}
            />
            <div className="flex items-center gap-2">
              <button style={{ color: "var(--muted-foreground)", background: "none", border: "none", cursor: "pointer" }}>
                <AtSign size={15} />
              </button>
              <button style={{ color: "var(--muted-foreground)", background: "none", border: "none", cursor: "pointer" }}>
                <Smile size={15} />
              </button>
              <button
                onClick={sendMessage}
                className="rounded-lg p-1.5 transition-colors"
                style={{ background: input.trim() ? "var(--primary)" : "var(--muted)", border: "none", cursor: "pointer" }}
              >
                <Send size={14} color={input.trim() ? "#F2F2F2" : "var(--muted-foreground)"} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Activity panel */}
      <div
        className="shrink-0 flex flex-col overflow-hidden"
        style={{ width: 240, borderLeft: "1px solid var(--border)" }}
      >
        <div className="px-4 py-3" style={{ borderBottom: "1px solid var(--border)" }}>
          <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--foreground)" }}>
            Actividad del Equipo
          </span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {activityFeed.map((item) => (
            <div key={item.id} className="flex items-start gap-3">
              <span style={{ fontSize: "1rem" }}>{item.icon}</span>
              <div>
                <p style={{ fontSize: "0.75rem", color: "var(--foreground)", lineHeight: 1.4 }}>{item.text}</p>
                <p style={{ fontSize: "0.65rem", color: "var(--muted-foreground)", marginTop: "0.2rem" }}>{item.time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Online members */}
        <div style={{ borderTop: "1px solid var(--border)", padding: "1rem" }}>
          <span style={{ fontSize: "0.68rem", color: "var(--muted-foreground)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 600 }}>
            En línea — {directMessages.filter((d) => d.online).length}
          </span>
          <div className="flex flex-col gap-2 mt-3">
            {directMessages.filter((d) => d.online).map((dm) => (
              <div key={dm.id} className="flex items-center gap-2">
                <div className="relative">
                  <div
                    className="rounded-full flex items-center justify-center"
                    style={{ width: 24, height: 24, background: getAvatarColor(dm.initials), fontSize: "0.58rem", fontWeight: 700, color: "#F2F2F2" }}
                  >
                    {dm.initials}
                  </div>
                  <div className="absolute rounded-full" style={{ width: 7, height: 7, bottom: -1, right: -1, background: "#22c55e", border: "1px solid var(--background)" }} />
                </div>
                <span style={{ fontSize: "0.75rem", color: "var(--foreground)" }}>{dm.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
