import { Calendar, ChevronDown, Flag, MoreHorizontal, Plus } from "lucide-react";
import { useEffect, useState } from "react";

type Priority = "alta" | "media" | "baja";
type Column = "backlog" | "progreso" | "revision" | "listo";

interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  initials: string;
  priority: Priority;
  dueDate: string;
  tags: string[];
  points: number;
}

const initialTasks: Record<Column, Task[]> = {
  backlog: [
    { id: "t1", title: "Diseñar arquitectura microservicios", description: "Definir contratos de API entre servicios", assignee: "Luis Vargas", initials: "LV", priority: "alta", dueDate: "20 jun", tags: ["Arquitectura"], points: 8 },
    { id: "t2", title: "Migración base de datos legacy", description: "Migrar tablas de usuarios al nuevo esquema", assignee: "Sara Gómez", initials: "SG", priority: "media", dueDate: "25 jun", tags: ["BD", "Backend"], points: 13 },
    { id: "t3", title: "Setup pipeline CI/CD", description: "Configurar GitHub Actions para todos los repos", assignee: "Pedro Ruiz", initials: "PR", priority: "alta", dueDate: "18 jun", tags: ["DevOps"], points: 5 },
  ],
  progreso: [
    { id: "t4", title: "Módulo de autenticación OAuth2", description: "Integrar login con Google y Microsoft", assignee: "Ana Martínez", initials: "AM", priority: "alta", dueDate: "16 jun", tags: ["Auth", "Frontend"], points: 8 },
    { id: "t5", title: "Dashboard KPIs en tiempo real", description: "Websockets para actualización de métricas", assignee: "Carlos López", initials: "CL", priority: "media", dueDate: "19 jun", tags: ["Frontend"], points: 5 },
  ],
  revision: [
    { id: "t6", title: "API REST de gestión de proyectos", description: "Endpoints CRUD para proyectos y tareas", assignee: "María Torres", initials: "MT", priority: "alta", dueDate: "15 jun", tags: ["Backend", "API"], points: 13 },
    { id: "t7", title: "Componente tabla de recursos", description: "Tabla paginada con filtros avanzados", assignee: "Javier Díaz", initials: "JD", priority: "baja", dueDate: "17 jun", tags: ["Frontend"], points: 3 },
  ],
  listo: [
    { id: "t8", title: "Diseño sistema de notificaciones", description: "Emails + push notifications completados", assignee: "Ana Martínez", initials: "AM", priority: "media", dueDate: "12 jun", tags: ["Diseño"], points: 5 },
    { id: "t9", title: "Testing unitario módulo de pagos", description: "Cobertura 95% en todas las rutas críticas", assignee: "Luis Vargas", initials: "LV", priority: "alta", dueDate: "11 jun", tags: ["QA"], points: 8 },
  ],
};

const columns: { id: Column; label: string; color: string }[] = [
  { id: "backlog", label: "Backlog", color: "#1B65A6" },
  { id: "progreso", label: "En Progreso", color: "#4429F2" },
  { id: "revision", label: "En Revisión", color: "#F272EA" },
  { id: "listo", label: "Listo", color: "#22c55e" },
];

const priorityConfig: Record<Priority, { color: string; label: string }> = {
  alta: { color: "#F272EA", label: "Alta" },
  media: { color: "#79AEF2", label: "Media" },
  baja: { color: "#22c55e", label: "Baja" },
};

const avatarColors = ["#4429F2", "#F272EA", "#1B65A6", "#410759", "#242CBF", "#3D25D9"];

function TaskCard({ task }: { task: Task }) {
  const pCfg = priorityConfig[task.priority];
  const avatarColor = avatarColors[task.initials.charCodeAt(0) % avatarColors.length];

  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-3 cursor-grab transition-all duration-150 hover:translate-y-[-1px]"
      style={{
        background: "var(--card)",
        border: "1px solid var(--border)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.2)",
      }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex flex-wrap gap-1">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full px-2 py-0.5"
              style={{ fontSize: "0.62rem", background: "var(--muted)", color: "var(--muted-foreground)", fontWeight: 500 }}
            >
              {tag}
            </span>
          ))}
        </div>
        <button
          style={{ color: "var(--muted-foreground)", background: "none", border: "none", cursor: "pointer", padding: 0, minHeight: "32px", minWidth: "32px" }}
          className="focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2 rounded"
          aria-label="Más opciones"
        >
          <MoreHorizontal size={14} aria-hidden="true" />
        </button>
      </div>

      {/* Title */}
      <div>
        <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--foreground)", lineHeight: 1.4 }}>
          {task.title}
        </p>
        <p style={{ fontSize: "0.72rem", color: "var(--muted-foreground)", marginTop: "0.2rem", lineHeight: 1.4 }}>
          {task.description}
        </p>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="rounded-full flex items-center justify-center shrink-0"
            style={{ width: 24, height: 24, background: avatarColor, fontSize: "0.6rem", fontWeight: 700, color: "#F2F2F2" }}
          >
            {task.initials}
          </div>
          <div className="flex items-center gap-1" style={{ color: "var(--muted-foreground)" }}>
            <Calendar size={11} />
            <span style={{ fontSize: "0.68rem" }}>{task.dueDate}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Flag size={11} color={pCfg.color} />
            <span style={{ fontSize: "0.65rem", color: pCfg.color, fontWeight: 500 }}>{pCfg.label}</span>
          </div>
          <span
            className="rounded px-1.5 py-0.5"
            style={{ fontSize: "0.62rem", background: "var(--muted)", color: "var(--muted-foreground)", fontFamily: "monospace" }}
          >
            {task.points}pts
          </span>
        </div>
      </div>
    </div>
  );
}

export function AgileBoard() {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  const sprints = ["Sprint 12 — Actual", "Sprint 11", "Sprint 10"];
  const [activeSprint, setActiveSprint] = useState(sprints[0]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Header */}
      <div
        className="flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-4 shrink-0 gap-4"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div>
          <h1 className="text-xl sm:text-2xl" style={{ color: "var(--foreground)", fontWeight: 700 }}>
            Tablero Ágil
          </h1>
          <p style={{ color: "var(--muted-foreground)", fontSize: "0.82rem", marginTop: "0.2rem" }}>
            Proyecto Alpha · Q2 2026
          </p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Sprint selector */}
          <div
            className="flex items-center gap-2 rounded-lg px-3 py-2"
            style={{ background: "var(--muted)", cursor: "pointer", border: "1px solid var(--border)", minHeight: "40px" }}
            role="button"
            tabIndex={0}
            aria-label={`Sprint actual: ${activeSprint}`}
            aria-haspopup="listbox"
          >
            <span style={{ fontSize: "0.78rem", color: "var(--foreground)" }}>{activeSprint}</span>
            <ChevronDown size={13} color="var(--muted-foreground)" aria-hidden="true" />
          </div>
          <button
            className="flex items-center gap-2 rounded-lg px-3 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)", border: "none", cursor: "pointer", fontSize: "0.8rem", fontWeight: 500, minHeight: "40px" }}
            aria-label="Crear nueva tarea"
          >
            <Plus size={14} aria-hidden="true" /> Nueva Tarea
          </button>
        </div>
      </div>

      {/* Stats bar */}
      <div
        className="flex items-center gap-4 sm:gap-6 px-4 sm:px-6 py-3 shrink-0 overflow-x-auto"
        style={{ borderBottom: "1px solid var(--border)", background: "rgba(13,21,71,0.4)" }}
        role="region"
        aria-label="Estadísticas del sprint"
      >
        {[
          { label: "Total tareas", value: Object.values(tasks).flat().length },
          { label: "Story points", value: Object.values(tasks).flat().reduce((acc, t) => acc + t.points, 0) },
          { label: "Velocidad", value: "34 pts/sprint" },
          { label: "Capacidad", value: "80%" },
        ].map((stat) => (
          <div key={stat.label} className="flex items-center gap-2">
            <span style={{ fontSize: "0.72rem", color: "var(--muted-foreground)" }}>{stat.label}:</span>
            <span style={{ fontSize: "0.78rem", color: "var(--foreground)", fontWeight: 600 }}>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Board columns */}
      <div
        className={isMobile ? "flex flex-col gap-4 p-4 overflow-y-auto flex-1" : "flex gap-4 p-6 overflow-x-auto flex-1 items-start"}
        role="region"
        aria-label="Tablero kanban"
      >
        {columns.map((col) => {
          const colTasks = tasks[col.id];
          return (
            <div
              key={col.id}
              className="flex flex-col gap-3 shrink-0"
              style={{ width: isMobile ? "100%" : 280, minWidth: isMobile ? "100%" : 280 }}
              role="region"
              aria-label={`Columna ${col.label} con ${colTasks.length} tareas`}
            >
              {/* Column header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="rounded-full" style={{ width: 8, height: 8, background: col.color }} aria-hidden="true" />
                  <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--foreground)" }}>
                    {col.label}
                  </span>
                  <span
                    className="rounded-full px-2 py-0.5"
                    style={{ fontSize: "0.65rem", background: col.color + "22", color: col.color, fontWeight: 700 }}
                    aria-label={`${colTasks.length} tareas`}
                  >
                    {colTasks.length}
                  </span>
                </div>
                <button
                  style={{ color: "var(--muted-foreground)", background: "none", border: "none", cursor: "pointer", minHeight: "32px", minWidth: "32px" }}
                  className="focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2 rounded"
                  aria-label={`Añadir tarea a ${col.label}`}
                >
                  <Plus size={14} aria-hidden="true" />
                </button>
              </div>

              {/* Drop zone */}
              <div
                className="flex flex-col gap-3 rounded-xl p-3 min-h-40"
                style={{
                  background: "rgba(13,21,71,0.3)",
                  border: `1px dashed ${col.color}33`,
                }}
              >
                {colTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}

                <button
                  className="flex items-center gap-2 rounded-lg px-3 py-2 w-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2"
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "var(--muted-foreground)",
                    cursor: "pointer",
                    fontSize: "0.75rem",
                    minHeight: "40px",
                  }}
                  aria-label={`Añadir tarea a ${col.label}`}
                >
                  <Plus size={13} aria-hidden="true" /> Añadir tarea
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
