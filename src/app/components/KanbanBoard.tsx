import {
    Calendar,
    CheckCircle2,
    ChevronRight,
    GripVertical,
    MessageSquare,
    MoreVertical,
    Paperclip,
    Plus,
    Search,
    SlidersHorizontal
} from "lucide-react";
import { useState } from "react";
import { TaskDrawer } from "./TaskDrawer";

interface SubTask {
  id: string;
  text: string;
  completed: boolean;
}

interface Comment {
  id: string;
  author: string;
  avatar: string;
  time: string;
  text: string;
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
  progress: number; // percentage completed
  tags: string[];
  subtasks: SubTask[];
  comments: Comment[];
  commentCount?: number;
  attachmentCount?: number;
  completedDate?: string;
}

interface Column {
  title: string;
  color: string;
  bgColor: string;
  textColor: string;
  count: number;
  tasks: Task[];
}

interface KanbanBoardProps {
  onNavigate: (view: string) => void;
  activeViewToggle: string;
}

export function KanbanBoard({ onNavigate, activeViewToggle }: KanbanBoardProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Initial column definitions based on Screen 3
  const columnsData: Column[] = [
    {
      title: "Por Hacer",
      color: "#6B7280",
      bgColor: "#F3F4F6",
      textColor: "#374151",
      count: 8,
      tasks: [
        {
          id: "TSK-101",
          title: "Definir arquitectura de microservicios",
          priority: "Alta",
          status: "Por Hacer",
          dueDate: "20 Jun 2026",
          assignee: "María Torres",
          assigneeAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=60",
          reporter: "Ana Martínez",
          project: "Sistema de Gestión Hospitalaria",
          startDate: "15 Jun 2026",
          estimate: "24 horas",
          loggedHours: 0,
          progress: 0,
          tags: ["Backend", "Arquitectura"],
          commentCount: 3,
          attachmentCount: 1,
          subtasks: [],
          comments: []
        },
        {
          id: "TSK-102",
          title: "Crear documentación técnica inicial",
          priority: "Media",
          status: "Por Hacer",
          dueDate: "25 Jun 2026",
          assignee: "David Lee",
          assigneeAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=60",
          reporter: "Ana Martínez",
          project: "Sistema de Gestión Hospitalaria",
          startDate: "18 Jun 2026",
          estimate: "8 horas",
          loggedHours: 0,
          progress: 0,
          tags: ["Documentación"],
          subtasks: [],
          comments: []
        },
        {
          id: "TSK-103",
          title: "Configurar entornos staging",
          priority: "Baja",
          status: "Por Hacer",
          dueDate: "28 Jun 2026",
          assignee: "Sin asignar",
          assigneeAvatar: "",
          reporter: "Carlos López",
          project: "Sistema de Gestión Hospitalaria",
          startDate: "22 Jun 2026",
          estimate: "12 horas",
          loggedHours: 0,
          progress: 0,
          tags: ["DevOps", "AWS"],
          subtasks: [],
          comments: []
        }
      ]
    },
    {
      title: "En Progreso",
      color: "#3B82F6",
      bgColor: "#EFF6FF",
      textColor: "#1D4ED8",
      count: 9,
      tasks: [
        {
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
          progress: 60,
          tags: ["Backend", "Autenticación", "Seguridad"],
          commentCount: 7,
          subtasks: [
            { id: "s1", text: "Diseñar esquema de tokens JWT", completed: true },
            { id: "s2", text: "Implementar endpoint /auth/login", completed: true },
            { id: "s3", text: "Implementar endpoint /auth/refresh", completed: false },
            { id: "s4", text: "Testing unitario y de integración", completed: false },
          ],
          comments: [
            { id: "c1", author: "Ana Martínez", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60", time: "Hace 4 horas", text: "Carlos, por favor asegúrate de validar los tokens expirados." },
            { id: "c2", author: "Carlos López", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=60", time: "Hace 2 horas", text: "Listo Ana, ya configuré las cookies seguras." }
          ]
        },
        {
          id: "TSK-202",
          title: "Integración API REST backend",
          priority: "Alta",
          status: "En Progreso",
          dueDate: "19 Jun 2026",
          assignee: "Ana Martínez",
          assigneeAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60",
          reporter: "Carlos López",
          project: "Sistema de Gestión Hospitalaria",
          startDate: "12 Jun 2026",
          estimate: "20 horas",
          loggedHours: 7,
          progress: 35,
          tags: ["Backend", "API"],
          subtasks: [],
          comments: []
        },
        {
          id: "TSK-203",
          title: "Diseño UI pantalla principal",
          priority: "Media",
          status: "En Progreso",
          dueDate: "22 Jun 2026",
          assignee: "Sofía Ramos",
          assigneeAvatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&auto=format&fit=crop&q=60",
          reporter: "Ana Martínez",
          project: "Sistema de Gestión Hospitalaria",
          startDate: "14 Jun 2026",
          estimate: "12 horas",
          loggedHours: 9.6,
          progress: 80,
          tags: ["Frontend", "Diseño UI"],
          subtasks: [],
          comments: []
        }
      ]
    },
    {
      title: "En Revisión",
      color: "#F59E0B",
      bgColor: "#FFFBEB",
      textColor: "#B45309",
      count: 6,
      tasks: [
        {
          id: "TSK-301",
          title: "Testing módulo de login",
          priority: "Alta",
          status: "En Revisión",
          dueDate: "17 Jun 2026",
          assignee: "QA Team",
          assigneeAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=60",
          reporter: "Ana Martínez",
          project: "Sistema de Gestión Hospitalaria",
          startDate: "12 Jun 2026",
          estimate: "8 horas",
          loggedHours: 8,
          progress: 100,
          tags: ["QA", "Testing"],
          subtasks: [],
          comments: []
        },
        {
          id: "TSK-302",
          title: "Revisión código PR #42",
          priority: "Media",
          status: "En Revisión",
          dueDate: "17 Jun 2026",
          assignee: "David Lee",
          assigneeAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=60",
          reporter: "Carlos López",
          project: "Sistema de Gestión Hospitalaria",
          startDate: "14 Jun 2026",
          estimate: "4 horas",
          loggedHours: 2,
          progress: 50,
          tags: ["GitHub", "Revisión"],
          subtasks: [],
          comments: []
        }
      ]
    },
    {
      title: "Completado",
      color: "#10B981",
      bgColor: "#F0FDF4",
      textColor: "#047857",
      count: 11,
      tasks: [
        {
          id: "TSK-401",
          title: "Levantamiento de requisitos",
          priority: "Alta",
          status: "Completado",
          dueDate: "05 Jun 2026",
          assignee: "Ana Martínez",
          assigneeAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60",
          reporter: "Carlos López",
          project: "Sistema de Gestión Hospitalaria",
          startDate: "01 Jun 2026",
          estimate: "16 horas",
          loggedHours: 16,
          progress: 100,
          tags: ["Requisitos", "PM"],
          completedDate: "5 Jun",
          subtasks: [],
          comments: []
        },
        {
          id: "TSK-402",
          title: "Diseño de base de datos",
          priority: "Alta",
          status: "Completado",
          dueDate: "08 Jun 2026",
          assignee: "Carlos López",
          assigneeAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=60",
          reporter: "Ana Martínez",
          project: "Sistema de Gestión Hospitalaria",
          startDate: "03 Jun 2026",
          estimate: "20 horas",
          loggedHours: 20,
          progress: 100,
          tags: ["Base de datos", "Diseño"],
          completedDate: "8 Jun",
          subtasks: [],
          comments: []
        },
        {
          id: "TSK-403",
          title: "Configuración repositorio GitHub",
          priority: "Media",
          status: "Completado",
          dueDate: "01 Jun 2026",
          assignee: "David Lee",
          assigneeAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=60",
          reporter: "Ana Martínez",
          project: "Sistema de Gestión Hospitalaria",
          startDate: "30 May 2026",
          estimate: "4 horas",
          loggedHours: 4,
          progress: 100,
          tags: ["Git", "Configuración"],
          completedDate: "1 Jun",
          subtasks: [],
          comments: []
        }
      ]
    }
  ];

  const handleOpenTask = (task: Task) => {
    setSelectedTask(task);
    setIsDrawerOpen(true);
  };

  return (
    <div
      className="flex-1 flex flex-col overflow-y-auto p-4 sm:p-6 lg:p-8 gap-4 sm:gap-6"
      style={{ background: "#F8F7FF", fontFamily: "'Inter', sans-serif" }}
      role="main"
      aria-label="Tablero Kanban"
    >
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-xs text-[#6B7280]">
          <span>Inicio</span>
          <ChevronRight size={12} />
          <span>Proyectos</span>
          <ChevronRight size={12} />
          <span className="text-[#534AB7] font-bold">Sistema de Gestión Hospitalaria</span>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#1A1A2E]">
              Proyectos
            </h1>
            <select className="bg-white border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 outline-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2" style={{ minHeight: "36px" }} aria-label="Seleccionar proyecto">
              <option>Sistema de Gestión Hospitalaria</option>
              <option>App Finanzas Corporativas</option>
              <option>Portal Educativo eLearning</option>
            </select>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2 rounded-lg px-3 py-1.5 bg-white border border-[#E5E7EB]">
              <Search size={14} className="text-slate-400" aria-hidden="true" />
              <input
                type="text"
                placeholder="Buscar tareas..."
                className="bg-transparent border-none outline-none text-xs text-slate-800 placeholder-slate-400 w-36"
                aria-label="Buscar tareas"
              />
            </div>
            <button className="flex items-center gap-1.5 bg-white border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2" style={{ minHeight: "36px" }} aria-label="Filtrar tareas">
              <SlidersHorizontal size={14} aria-hidden="true" />
              Filtrar
            </button>
            <div className="flex bg-white border border-[#E5E7EB] rounded-lg p-0.5" role="group" aria-label="Vista de proyectos">
              <button
                onClick={() => onNavigate("proyectos")}
                className={`p-1 rounded text-xs font-bold ${activeViewToggle === "kanban" ? "bg-[#EEEDFE] text-[#534AB7]" : "text-slate-500 hover:text-slate-700"} cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-inset`}
                style={{ minHeight: "32px", minWidth: "32px" }}
                aria-label="Vista Kanban"
                aria-pressed={activeViewToggle === "kanban"}
              >
                Kanban
              </button>
              <button
                onClick={() => onNavigate("proyectos-gantt")}
                className={`p-1 rounded text-xs font-bold ${activeViewToggle === "gantt" ? "bg-[#EEEDFE] text-[#534AB7]" : "text-slate-500 hover:text-slate-700"} cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-inset`}
                style={{ minHeight: "32px", minWidth: "32px" }}
                aria-label="Vista Gantt"
                aria-pressed={activeViewToggle === "gantt"}
              >
                Gantt
              </button>
            </div>
            <button className="bg-[#534AB7] hover:bg-[#4339A6] text-white font-bold text-xs px-4 py-2 rounded-lg transition-all cursor-pointer shadow-sm flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2" style={{ minHeight: "40px" }} aria-label="Crear nueva tarea">
              <Plus size={14} aria-hidden="true" /> Nueva Tarea
            </button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white rounded-xl border p-3 sm:p-4 flex items-center justify-between gap-4 flex-wrap" style={{ borderColor: "#E5E7EB" }} role="region" aria-label="Estadísticas de tareas">
        <div className="flex items-center gap-4 sm:gap-6 divide-x divide-slate-100 flex-1 overflow-x-auto">
          <div className="px-3 sm:px-4 first:pl-0 shrink-0">
            <span className="text-[10px] font-bold text-[#6B7280] uppercase tracking-wider block">Tareas Totales</span>
            <strong className="text-lg sm:text-xl font-extrabold text-[#1A1A2E]">34</strong>
          </div>
          <div className="px-3 sm:px-4 shrink-0">
            <span className="text-[10px] font-bold text-[#1D9E75] uppercase tracking-wider block">Completadas</span>
            <strong className="text-lg sm:text-xl font-extrabold text-[#1D9E75]">18</strong>
          </div>
          <div className="px-3 sm:px-4 shrink-0">
            <span className="text-[10px] font-bold text-[#3B82F6] uppercase tracking-wider block">En Progreso</span>
            <strong className="text-lg sm:text-xl font-extrabold text-[#3B82F6]">9</strong>
          </div>
          <div className="px-3 sm:px-4 shrink-0">
            <span className="text-[10px] font-bold text-[#D94F4F] uppercase tracking-wider block">Vencidas</span>
            <strong className="text-lg sm:text-xl font-extrabold text-[#D94F4F]">3</strong>
          </div>
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[480px]">
        {columnsData.map((column) => (
          <div
            key={column.title}
            className="rounded-2xl p-4 flex flex-col gap-4 border"
            style={{ background: column.bgColor, borderColor: "rgba(229, 231, 235, 0.5)" }}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between pb-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: column.color }} aria-hidden="true"></span>
                <h3 className="text-sm font-bold" style={{ color: column.textColor }}>
                  {column.title}
                </h3>
                <span className="text-xs font-bold text-slate-400 bg-white border px-2 py-0.5 rounded-full" aria-label={`${column.count} tareas`}>
                  {column.count}
                </span>
              </div>
              <button className="text-slate-400 hover:text-slate-600 focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-inset" style={{ minHeight: "32px", minWidth: "32px" }} aria-label="Opciones de columna">
                <MoreVertical size={16} aria-hidden="true" />
              </button>
            </div>

            {/* Task Card List */}
            <div className="flex flex-col gap-3 overflow-y-auto flex-1 max-h-[500px] pr-0.5">
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleOpenTask(task)}
                  className="bg-white p-4 rounded-xl border border-[#E5E7EB] shadow-xs cursor-pointer hover:shadow-md transition-all duration-200 group relative focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2"
                  role="button"
                  tabIndex={0}
                  aria-label={`Tarea ${task.id}: ${task.title}`}
                >
                  {/* Top Grip & Actions */}
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-1.5">
                      <GripVertical size={12} className="text-slate-300 group-hover:text-slate-500 transition-colors" aria-hidden="true" />
                      <span className="text-[10px] font-bold text-[#534AB7]">{task.id}</span>
                    </div>
                    <span
                      className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        background:
                          task.priority === "Alta"
                            ? "#FEE2E2"
                            : task.priority === "Media"
                            ? "#FEF3C7"
                            : "#F0FDF4",
                        color:
                          task.priority === "Alta"
                            ? "#D94F4F"
                            : task.priority === "Media"
                            ? "#B45309"
                            : "#1D9E75",
                      }}
                    >
                      {task.priority}
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className="text-xs font-bold text-[#1A1A2E] leading-snug mb-3">
                    {task.title}
                  </h4>

                  {/* Task Progress Bar (only En Progreso tasks) */}
                  {task.status === "En Progreso" && (
                    <div className="mb-3.5">
                      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mb-1">
                        <div className="bg-[#3B82F6] h-full rounded-full" style={{ width: `${task.progress}%` }}></div>
                      </div>
                      <span className="text-[9px] font-bold text-slate-400">{task.progress}% completado</span>
                    </div>
                  )}

                  {/* Task Status/Pending Text for testing column */}
                  {task.status === "En Revisión" && task.id === "TSK-301" && (
                    <p className="text-[10px] text-slate-400 italic font-medium mb-3">Pendiente aprobación</p>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {task.tags.map(t => (
                      <span key={t} className="bg-slate-50 text-slate-500 text-[9px] font-bold px-2 py-0.5 rounded border border-slate-100">
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-slate-50 pt-3">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                      {task.status === "Completado" ? (
                        <div className="flex items-center gap-1 text-[#1D9E75]">
                          <CheckCircle2 size={12} aria-hidden="true" />
                          <span className="font-bold">Listo {task.completedDate}</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 font-semibold">
                          <Calendar size={12} aria-hidden="true" />
                          <span>{task.dueDate.split(" ")[0]} {task.dueDate.split(" ")[1]}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      {task.commentCount !== undefined && task.commentCount > 0 && (
                        <span className="flex items-center gap-0.5 text-[9px] font-bold text-slate-400" aria-label={`${task.commentCount} comentarios`}>
                          <MessageSquare size={10} aria-hidden="true" />
                          {task.commentCount}
                        </span>
                      )}
                      {task.attachmentCount !== undefined && task.attachmentCount > 0 && (
                        <span className="flex items-center gap-0.5 text-[9px] font-bold text-slate-400" aria-label={`${task.attachmentCount} adjuntos`}>
                          <Paperclip size={10} aria-hidden="true" />
                          {task.attachmentCount}
                        </span>
                      )}
                      {task.assigneeAvatar ? (
                        <img
                          src={task.assigneeAvatar}
                          alt=""
                          className="w-5 h-5 rounded-full object-cover border border-white shadow-xs"
                        />
                      ) : (
                        <div className="w-5 h-5 rounded-full border border-dashed border-slate-300 flex items-center justify-center text-[8px] font-bold text-slate-400">
                          +
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {/* Add task ghost button */}
              <button className="border border-dashed border-slate-300 hover:border-[#534AB7] rounded-xl py-3 text-xs font-bold text-slate-400 hover:text-[#534AB7] transition-all bg-white/50 hover:bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-inset" style={{ minHeight: "40px" }} aria-label="Agregar nueva tarea">
                + Agregar tarea
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Task Drawer */}
      <TaskDrawer
        task={selectedTask}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
