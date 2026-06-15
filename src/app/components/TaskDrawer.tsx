import React, { useState } from "react";
import { X, Calendar, User, Tag, Clock, CheckSquare, Paperclip, MessageSquare, Send, MoreHorizontal } from "lucide-react";

interface Comment {
  id: string;
  author: string;
  avatar: string;
  time: string;
  text: string;
}

interface SubTask {
  id: string;
  text: string;
  completed: boolean;
}

interface Task {
  id: string;
  title: string;
  priority: string;
  status: string;
  dueDate: string;
  assignee: string;
  assigneeAvatar: string;
  reporter: string;
  project: string;
  startDate: string;
  estimate: string;
  loggedHours: number;
  progress: number;
  tags: string[];
  subtasks: SubTask[];
  comments: Comment[];
}

interface TaskDrawerProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

const defaultTask: Task = {
  id: "TSK-201",
  title: "Desarrollo módulo de autenticación",
  priority: "Alta",
  status: "En Progreso",
  dueDate: "18 Jun 2026",
  assignee: "Carlos López",
  assigneeAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=60",
  reporter: "Ana Martínez",
  project: "Sistema de Gestión Hospitalaria",
  startDate: "10 Jun 2026",
  estimate: "16 horas",
  loggedHours: 9.5,
  progress: 59,
  tags: ["Backend", "Autenticación", "Seguridad"],
  subtasks: [
    { id: "s1", text: "Diseñar esquema de tokens JWT", completed: true },
    { id: "s2", text: "Implementar endpoint /auth/login", completed: true },
    { id: "s3", text: "Implementar endpoint /auth/refresh", completed: false },
    { id: "s4", text: "Testing unitario y de integración", completed: false },
  ],
  comments: [
    { id: "c1", author: "Ana Martínez", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60", time: "Hace 4 horas", text: "Carlos, por favor asegúrate de validar los tokens expirados en la cookie HTTP-only." },
    { id: "c2", author: "Carlos López", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=60", time: "Hace 2 horas", text: "Sí Ana, ya configuré SameSite=Strict y Secure. Estoy finalizando los endpoints correspondientes." },
    { id: "c3", author: "David Lee", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=60", time: "Hace 1 hora", text: "Tengo los ambientes listos para cuando quieran probar la federación en Staging." }
  ]
};

export function TaskDrawer({ task, isOpen, onClose }: TaskDrawerProps) {
  const currentTask = task || defaultTask;
  const [comments, setComments] = useState<Comment[]>(currentTask.comments);
  const [newComment, setNewComment] = useState("");
  const [subtasks, setSubtasks] = useState<SubTask[]>(currentTask.subtasks);

  if (!isOpen) return null;

  const handleToggleSubtask = (id: string) => {
    setSubtasks(prev =>
      prev.map(st => (st.id === id ? { ...st, completed: !st.completed } : st))
    );
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    const comment: Comment = {
      id: String(Date.now()),
      author: "Ana Martínez",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60",
      time: "Justo ahora",
      text: newComment
    };
    setComments(prev => [...prev, comment]);
    setNewComment("");
  };

  const completedCount = subtasks.filter(s => s.completed).length;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity" onClick={onClose} />

      {/* Slide-over container */}
      <div className="relative w-full max-w-[540px] bg-white h-full shadow-2xl flex flex-col z-10 animate-slide-in">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#534AB7] bg-[#EEEDFE] px-2.5 py-0.5 rounded">
              {currentTask.id}
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                {currentTask.status}
              </span>
              <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded-full">
                {currentTask.priority}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-50">
              <MoreHorizontal size={18} />
            </button>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-50 cursor-pointer">
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
          {/* Editable Title */}
          <div>
            <textarea
              className="w-full text-xl font-extrabold text-slate-800 border-none resize-none focus:outline-none focus:ring-0 leading-snug p-0"
              style={{ fontSize: 22 }}
              defaultValue={currentTask.title}
              rows={2}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Descripción</h3>
            <textarea
              className="w-full text-sm text-slate-600 border border-slate-200 rounded-lg p-3 outline-none focus:border-[#534AB7] bg-[#F8F7FF]"
              rows={4}
              defaultValue="Implementar el sistema de autenticación JWT con refresh tokens. Debe incluir login, logout, validación de sesión y recuperación de contraseña. Ver documento técnico adjunto."
            />
          </div>

          {/* Task Details - Grid */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 border-y border-slate-100 py-5">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-xs font-medium w-[100px] shrink-0">Proyecto:</span>
              <a href="#" className="text-[#534AB7] text-xs font-bold hover:underline truncate">
                {currentTask.project}
              </a>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-xs font-medium w-[100px] shrink-0">Asignado a:</span>
              <div className="flex items-center gap-1.5 truncate">
                <img src={currentTask.assigneeAvatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                <span className="text-xs font-bold text-slate-700">{currentTask.assignee}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-xs font-medium w-[100px] shrink-0">Reporta a:</span>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold text-slate-700">{currentTask.reporter}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-xs font-medium w-[100px] shrink-0">Sprint:</span>
              <span className="text-xs font-semibold text-slate-700">Sprint 3 — Jun 2026</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-xs font-medium w-[100px] shrink-0">Fecha inicio:</span>
              <span className="text-xs font-semibold text-slate-700">{currentTask.startDate}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-xs font-medium w-[100px] shrink-0">Fecha límite:</span>
              <span className="text-xs font-extrabold text-red-500 bg-red-50 px-2 py-0.5 rounded">{currentTask.dueDate}</span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-xs font-medium w-[100px] shrink-0">Estimación:</span>
              <span className="text-xs font-semibold text-slate-700">{currentTask.estimate}</span>
            </div>

            <div className="flex items-center gap-2 col-span-2">
              <span className="text-slate-400 text-xs font-medium w-[100px] shrink-0">Horas registradas:</span>
              <div className="flex-1 flex items-center gap-2.5">
                <div className="flex-1 bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-[#534AB7] h-full rounded-full" style={{ width: `${currentTask.progress}%` }}></div>
                </div>
                <span className="text-xs font-bold text-slate-700 w-16">{currentTask.loggedHours}h ({currentTask.progress}%)</span>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Etiquetas</h3>
            <div className="flex flex-wrap gap-1.5">
              {currentTask.tags.map(t => (
                <span key={t} className="bg-slate-100 text-[#6B7280] text-xs font-bold px-2.5 py-0.5 rounded">
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Subtasks */}
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Subtareas</h3>
              <span className="text-xs font-semibold text-slate-500">{completedCount}/{subtasks.length} completadas</span>
            </div>
            <div className="flex flex-col gap-2">
              {subtasks.map(st => (
                <label key={st.id} className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer select-none border border-slate-100 p-2.5 rounded-lg hover:bg-slate-50 transition-colors">
                  <input
                    type="checkbox"
                    checked={st.completed}
                    onChange={() => handleToggleSubtask(st.id)}
                    className="accent-[#534AB7] rounded w-4 h-4 cursor-pointer"
                  />
                  <span className={st.completed ? "line-through text-slate-400" : "font-medium"}>{st.text}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Attachments */}
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Archivos Adjuntos</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-slate-200 rounded-xl p-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-2 truncate">
                  <span className="text-lg">📄</span>
                  <div className="truncate">
                    <span className="text-xs font-bold text-slate-700 block truncate">JWT_Arch.pdf</span>
                    <span className="text-[10px] text-slate-400">1.2 MB</span>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-[#534AB7] cursor-pointer">⬇️</button>
              </div>
              <div className="border border-slate-200 rounded-xl p-3 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-2 truncate">
                  <span className="text-lg">🖼️</span>
                  <div className="truncate">
                    <span className="text-xs font-bold text-slate-700 block truncate">login_mockup.png</span>
                    <span className="text-[10px] text-slate-400">3.4 MB</span>
                  </div>
                </div>
                <button className="text-slate-400 hover:text-[#534AB7] cursor-pointer">⬇️</button>
              </div>
            </div>
          </div>

          {/* Activity / Comments */}
          <div className="flex flex-col gap-4 border-t border-slate-100 pt-5">
            <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-wider flex items-center gap-1.5">
              <MessageSquare size={14} />
              Comentarios y Actividad
            </h3>

            <div className="flex flex-col gap-4">
              {comments.map(c => (
                <div key={c.id} className="flex gap-3 items-start">
                  <img src={c.avatar} alt="" className="w-7 h-7 rounded-full object-cover shrink-0" />
                  <div className="flex-1 bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-slate-800">{c.author}</span>
                      <span className="text-[10px] text-slate-400">{c.time}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Comment Input */}
            <form onSubmit={handleAddComment} className="flex items-center gap-2 mt-2">
              <input
                type="text"
                value={newComment}
                onChange={e => setNewComment(e.target.value)}
                placeholder="Escribe un comentario..."
                className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-[#534AB7]"
              />
              <button
                type="submit"
                className="bg-[#534AB7] text-white p-2 rounded-lg hover:bg-[#4339A6] transition-colors cursor-pointer"
              >
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
