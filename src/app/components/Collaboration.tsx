import {
    Hash,
    Lock,
    MoreVertical,
    Paperclip,
    Phone,
    Plus,
    Search,
    Send,
    Smile,
    Video,
} from "lucide-react";
import React, { useEffect, useState } from "react";

interface Conversation {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  initials: string;
  avatarColor: string;
  isPrivate?: boolean;
}

const initialConversations: Conversation[] = [
  { id: "1", name: "Sistema Gestión Hospitalaria", lastMessage: "Ana: Revisé el PR, hay 3 comentarios...", time: "10:32", unreadCount: 3, initials: "GH", avatarColor: "#534AB7" },
  { id: "2", name: "App Finanzas Corporativas", lastMessage: "Tú: ¿Cuándo estará lista la integración?", time: "09:15", initials: "FC", avatarColor: "#3B82F6" },
  { id: "3", name: "Portal eLearning", lastMessage: "David: Subí los archivos al S3", time: "Ayer", initials: "EL", avatarColor: "#10B981" },
  { id: "4", name: "General — Innovatech", lastMessage: "María: Reunión mañana a las 10am", time: "Ayer", unreadCount: 12, initials: "GI", avatarColor: "#F59E0B" },
  { id: "5", name: "DevOps Channel", lastMessage: "Alerta: Pipeline CI/CD falló en staging", time: "Lun", unreadCount: 1, initials: "DO", avatarColor: "#D94F4F", isPrivate: true },
  { id: "6", name: "Dashboard BI", lastMessage: "Sofía: Mockups listos para revisión", time: "Dom", initials: "DB", avatarColor: "#7F77DD" }
];

export function Collaboration() {
  const [conversations] = useState<Conversation[]>(initialConversations);
  const [activeTab, setActiveTab] = useState("Proyectos");
  const [text, setText] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [showConversationList, setShowConversationList] = useState(true);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const [messages, setMessages] = useState([
    { id: 1, author: "Ana Martínez", initials: "AM", time: "09:00", text: "Buenos días equipo. Revisé el PR #42 y encontré 3 observaciones en el módulo de autenticación.", isOwn: false, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60" },
    { id: 2, author: "Carlos López", initials: "CL", time: "09:15", text: "Gracias Ana, las reviso ahora. ¿Puedes detallar cuál es el error crítico?", isOwn: true, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=60" },
    { id: 3, author: "Ana Martínez", initials: "AM", time: "09:18", text: "El problema está en la validación del token JWT. Adjunto screenshot.", isOwn: false, attachment: "jwt_token_validation.png", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60" },
    { id: 4, author: "Carlos López", initials: "CL", time: "09:45", text: "Entendido. Hago el fix y subo nuevo commit antes del mediodía.", isOwn: true, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=60" },
    { id: 5, system: true, text: "David Lee se unió a la conversación" },
    { id: 6, author: "María Torres", initials: "MT", time: "10:20", text: "¿Alguien puede hacer el testing del fix cuando esté listo?", isOwn: false, reaction: "👍 1", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=60" },
    { id: 7, author: "David Lee", initials: "DL", time: "10:32", text: "Yo lo hago. Tengo disponibilidad desde las 14:00.", isOwn: false, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=60" }
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    const msg = {
      id: Date.now(),
      author: "Carlos López",
      initials: "CL",
      time: "Justo ahora",
      text: text,
      isOwn: true,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=60"
    };
    setMessages(prev => [...prev, msg]);
    setText("");
  };

  return (
    <div
      className="flex-1 flex overflow-hidden h-full"
      style={{ background: "#FFFFFF", fontFamily: "'Inter', sans-serif" }}
      role="main"
      aria-label="Colaboración y mensajes"
    >
      {/* Left Panel - Conversation list (320px) */}
      <div className={`${isMobile && !showConversationList ? "hidden" : ""} w-full sm:w-[320px] border-r border-[#E5E7EB] flex flex-col shrink-0`} style={{ background: "#FCFCFE" }} role="complementary" aria-label="Lista de conversaciones">
        {/* Messages Header */}
        <div className="p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#1A1A2E]" style={{ fontSize: 18 }}>Mensajes</h2>
            <button className="p-1.5 bg-[#EEEDFE] text-[#534AB7] rounded-lg hover:bg-[#dbdaf9] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2" style={{ minHeight: "36px", minWidth: "36px" }} aria-label="Nueva conversación">
              <Plus size={16} aria-hidden="true" />
            </button>
          </div>
          {/* Search bar */}
          <div className="flex items-center gap-2 rounded-lg px-3 py-1.5 bg-white border border-[#E5E7EB]">
            <Search size={14} className="text-slate-400" aria-hidden="true" />
            <input
              type="text"
              placeholder="Buscar conversaciones..."
              className="bg-transparent border-none outline-none text-xs text-slate-800 placeholder-slate-400 w-full"
              aria-label="Buscar conversaciones"
            />
          </div>
        </div>

        {/* Tab filters */}
        <div className="flex border-b border-slate-100 px-4 gap-4 text-xs font-bold text-slate-400 pb-2" role="tablist" aria-label="Filtros de conversaciones">
          {["Proyectos", "Directos", "Archivados"].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-1 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-inset ${activeTab === tab ? "border-b-2 border-[#534AB7] text-[#534AB7]" : "hover:text-slate-600"}`}
              style={{ minHeight: "36px" }}
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls={`${tab.toLowerCase()}-panel`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto flex flex-col" role="tabpanel" id="proyectos-panel">
          {conversations.map((c) => (
            <button
              key={c.id}
              onClick={() => isMobile && setShowConversationList(false)}
              className={`p-4 border-b border-slate-50 flex gap-3 cursor-pointer hover:bg-slate-50 transition-all text-left focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-inset ${c.id === "1" ? "bg-[#EEEDFE]/30 border-l-4 border-[#534AB7]" : ""}`}
              style={{ minHeight: "72px" }}
              aria-label={`${c.name}, último mensaje: ${c.lastMessage}`}
              aria-current={c.id === "1" ? "true" : undefined}
            >
              {/* Initials Avatar */}
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-white shrink-0 text-xs shadow-xs"
                style={{ backgroundColor: c.avatarColor }}
                aria-hidden="true"
              >
                {c.initials}
              </div>

              {/* Text content */}
              <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-800 flex items-center gap-1 truncate">
                    {c.isPrivate ? <Lock size={10} className="text-slate-400 shrink-0" aria-hidden="true" /> : <Hash size={10} className="text-slate-400 shrink-0" aria-hidden="true" />}
                    {c.name}
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">{c.time}</span>
                </div>
                <div className="flex justify-between items-center gap-1.5">
                  <p className="text-[11px] text-slate-400 font-medium truncate">{c.lastMessage}</p>
                  {c.unreadCount && (
                    <span
                      className="text-[9px] font-extrabold text-white px-1.5 py-0.5 rounded-full shrink-0"
                      style={{ backgroundColor: c.id === "5" ? "#D94F4F" : "#534AB7" }}
                      aria-label={`${c.unreadCount} mensajes no leídos`}
                    >
                      {c.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Right Panel - Chat Area */}
      <div className={`${isMobile && showConversationList ? "hidden" : ""} flex-1 flex flex-col overflow-hidden bg-white`} role="region" aria-label="Área de chat">
        {/* Chat top bar */}
        <div className="px-4 sm:px-6 py-3 border-b border-[#E5E7EB] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {isMobile && (
              <button onClick={() => setShowConversationList(true)} className="p-1 text-slate-400 hover:text-slate-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7]" aria-label="Volver a conversaciones">
                <Hash size={16} />
              </button>
            )}
            <div className="w-8 h-8 rounded-full bg-[#534AB7] text-white flex items-center justify-center font-bold text-xs" aria-hidden="true">
              GH
            </div>
            <div>
              <h3 className="text-xs font-bold text-slate-800">Sistema Gestión Hospitalaria</h3>
              <span className="text-[10px] text-slate-400 font-medium">8 miembros</span>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-slate-400">
            <button className="hover:text-slate-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2" style={{ minHeight: "32px", minWidth: "32px" }} aria-label="Videollamada"><Video size={16} aria-hidden="true" /></button>
            <button className="hover:text-slate-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2" style={{ minHeight: "32px", minWidth: "32px" }} aria-label="Llamada"><Phone size={16} aria-hidden="true" /></button>
            <button className="hover:text-slate-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2" style={{ minHeight: "32px", minWidth: "32px" }} aria-label="Buscar en chat"><Search size={16} aria-hidden="true" /></button>
            <button className="hover:text-slate-600 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2" style={{ minHeight: "32px", minWidth: "32px" }} aria-label="Más opciones"><MoreVertical size={16} aria-hidden="true" /></button>
          </div>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 flex flex-col gap-4" role="log" aria-live="polite" aria-label="Mensajes de la conversación">
          {messages.map((m) => {
            if (m.system) {
              return (
                <div key={m.id} className="flex justify-center my-2">
                  <span className="bg-slate-100 text-slate-500 text-[10px] font-bold px-3 py-1 rounded-full shadow-xs" role="status">
                    {m.text}
                  </span>
                </div>
              );
            }

            return (
              <div key={m.id} className={`flex gap-3 items-start ${m.isOwn ? "justify-end" : ""}`}>
                {!m.isOwn && (
                  <img src={m.avatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 border" aria-hidden="true" />
                )}
                <div className="flex flex-col gap-1 max-w-[85%] sm:max-w-[70%]">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-slate-700">{m.author}</span>
                    <span className="text-[9px] text-slate-400">{m.time}</span>
                  </div>
                  <div
                    className={`rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${m.isOwn ? "bg-[#534AB7] text-white rounded-tr-none" : "bg-slate-100 text-slate-700 rounded-tl-none"}`}
                  >
                    <p>{m.text}</p>
                    {m.attachment && (
                      <div className="mt-2.5 p-2 bg-white/10 rounded-lg border border-white/20 flex items-center gap-2">
                        <span className="text-base" aria-hidden="true">🖼️</span>
                        <span className="text-[10px] underline font-bold cursor-pointer">{m.attachment}</span>
                      </div>
                    )}
                  </div>
                  {m.reaction && (
                    <span className="self-start text-[9px] font-bold bg-slate-100 px-2 py-0.5 rounded-full mt-1 border border-slate-200 text-slate-500" aria-label={`Reacción: ${m.reaction}`}>
                      {m.reaction}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Input Bar */}
        <form onSubmit={handleSendMessage} className="p-4 border-t border-[#E5E7EB] flex items-center gap-2 sm:gap-3">
          <button type="button" className="text-slate-400 hover:text-[#534AB7] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2" style={{ minHeight: "40px", minWidth: "40px" }} aria-label="Adjuntar archivo">
            <Paperclip size={18} aria-hidden="true" />
          </button>
          <button type="button" className="text-slate-400 hover:text-[#534AB7] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2" style={{ minHeight: "40px", minWidth: "40px" }} aria-label="Agregar emoji">
            <Smile size={18} aria-hidden="true" />
          </button>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe un mensaje..."
            className="flex-1 bg-[#F8F7FF] border border-[#E5E7EB] rounded-xl px-4 py-2.5 text-xs outline-none focus:border-[#534AB7] focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2 text-slate-800"
            aria-label="Escribe un mensaje"
          />
          <button
            type="submit"
            className="bg-[#534AB7] hover:bg-[#4339A6] text-white p-2.5 rounded-xl transition-all cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2"
            style={{ minHeight: "40px", minWidth: "40px" }}
            aria-label="Enviar mensaje"
          >
            <Send size={16} aria-hidden="true" />
          </button>
        </form>
      </div>
    </div>
  );
}
