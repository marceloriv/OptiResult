import {
    ChevronRight,
    FileText,
    Minimize2,
    Plus,
    Search,
    SlidersHorizontal
} from "lucide-react";
import { useEffect, useState } from "react";

interface GanttRow {
  id: string;
  name: string;
  isParent: boolean;
  phase: number; // 1 to 4
  assignee?: string;
  assigneeAvatar?: string;
  status?: string;
  statusColor?: string;
  startWeek?: number; // 1 to 6
  durationWeeks?: number; // duration in weeks
  progress?: number; // percentage
}

const ganttData: GanttRow[] = [
  // Phase 1
  { id: "PH-1", name: "Fase 1: Diseño", isParent: true, phase: 1, progress: 95 },
  { id: "PH-1-T1", name: "Levantamiento de requisitos", isParent: false, phase: 1, assignee: "Ana M.", assigneeAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60", status: "Completado", statusColor: "#10B981", startWeek: 1, durationWeeks: 1, progress: 100 },
  { id: "PH-1-T2", name: "Diseño de base de datos", isParent: false, phase: 1, assignee: "Carlos L.", assigneeAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=60", status: "Completado", statusColor: "#10B981", startWeek: 1.2, durationWeeks: 0.8, progress: 100 },
  { id: "PH-1-T3", name: "Diseño UI pantalla principal", isParent: false, phase: 1, assignee: "Sofía R.", assigneeAvatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&auto=format&fit=crop&q=60", status: "En Progreso", statusColor: "#3B82F6", startWeek: 1.8, durationWeeks: 1, progress: 80 },

  // Phase 2
  { id: "PH-2", name: "Fase 2: Desarrollo", isParent: true, phase: 2, progress: 45 },
  { id: "PH-2-T1", name: "Desarrollo módulo de autenticación", isParent: false, phase: 2, assignee: "Carlos L.", assigneeAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=60", status: "En Progreso", statusColor: "#3B82F6", startWeek: 2, durationWeeks: 1.5, progress: 60 },
  { id: "PH-2-T2", name: "Integración API REST backend", isParent: false, phase: 2, assignee: "Ana M.", assigneeAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60", status: "En Progreso", statusColor: "#3B82F6", startWeek: 2.2, durationWeeks: 1.2, progress: 35 },
  { id: "PH-2-T3", name: "Crear documentación técnica inicial", isParent: false, phase: 2, assignee: "David L.", assigneeAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=60", status: "Por Iniciar", statusColor: "#6B7280", startWeek: 3.2, durationWeeks: 1, progress: 0 },

  // Phase 3
  { id: "PH-3", name: "Fase 3: Testing", isParent: true, phase: 3, progress: 15 },
  { id: "PH-3-T1", name: "Testing módulo de login", isParent: false, phase: 3, assignee: "QA Team", assigneeAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=60", status: "En Revisión", statusColor: "#F59E0B", startWeek: 3.5, durationWeeks: 0.8, progress: 50 },
  { id: "PH-3-T2", name: "Revisión código PR #42", isParent: false, phase: 3, assignee: "David L.", assigneeAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=60", status: "Por Iniciar", statusColor: "#6B7280", startWeek: 4, durationWeeks: 0.6, progress: 0 },

  // Phase 4
  { id: "PH-4", name: "Fase 4: Despliegue", isParent: true, phase: 4, progress: 0 },
  { id: "PH-4-T1", name: "Configurar entornos staging", isParent: false, phase: 4, assignee: "Sin asignar", assigneeAvatar: "", status: "Por Iniciar", statusColor: "#6B7280", startWeek: 4.5, durationWeeks: 1, progress: 0 },
  { id: "PH-4-T2", name: "Deploy en producción AWS", isParent: false, phase: 4, assignee: "David L.", assigneeAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=60", status: "Por Iniciar", statusColor: "#6B7280", startWeek: 5.2, durationWeeks: 0.8, progress: 0 }
];

export function ProjectGantt({ onNavigate }: { onNavigate: (view: string) => void }) {
  const [zoomLevel, setZoomLevel] = useState("Semana");
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getPhaseColor = (phase: number) => {
    switch (phase) {
      case 1: return "#534AB7"; // purple
      case 2: return "#3B82F6"; // blue
      case 3: return "#F59E0B"; // amber
      case 4: return "#10B981"; // green
      default: return "#6B7280";
    }
  };

  return (
    <div
      className="flex-1 flex flex-col overflow-y-auto p-4 sm:p-6 lg:p-8 gap-4 sm:gap-6"
      style={{ background: "#F8F7FF", fontFamily: "'Inter', sans-serif" }}
      role="main"
      aria-label="Vista Gantt de proyectos"
    >
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <nav className="flex items-center gap-2 text-xs text-[#6B7280]" aria-label="Breadcrumb">
          <span>Inicio</span>
          <ChevronRight size={12} aria-hidden="true" />
          <span>Proyectos</span>
          <ChevronRight size={12} aria-hidden="true" />
          <span className="text-[#534AB7] font-bold">Sistema de Gestión Hospitalaria</span>
        </nav>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-2">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#1A1A2E]">
              Proyectos
            </h1>
            <select
              className="bg-white border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 outline-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7]"
              aria-label="Seleccionar proyecto"
            >
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
                className="bg-transparent border-none outline-none text-xs text-slate-800 placeholder-slate-400 w-24 sm:w-36"
                aria-label="Buscar tareas"
              />
            </div>
            <button
              className="flex items-center gap-1.5 bg-white border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2"
              style={{ minHeight: "36px" }}
              aria-label="Abrir filtros"
            >
              <SlidersHorizontal size={14} aria-hidden="true" />
              Filtrar
            </button>
            <div className="flex bg-white border border-[#E5E7EB] rounded-lg p-0.5" role="group" aria-label="Vista de proyectos">
              <button
                onClick={() => onNavigate("proyectos")}
                className="p-1.5 rounded text-xs font-bold text-slate-500 hover:text-slate-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-inset"
                style={{ minHeight: "32px", minWidth: "32px" }}
                aria-label="Ver vista Kanban"
              >
                Kanban
              </button>
              <button
                onClick={() => onNavigate("proyectos-gantt")}
                className="p-1.5 rounded text-xs font-bold bg-[#EEEDFE] text-[#534AB7] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-inset"
                style={{ minHeight: "32px", minWidth: "32px" }}
                aria-label="Ver vista Gantt"
                aria-pressed="true"
              >
                Gantt
              </button>
            </div>
            <button
              className="bg-[#534AB7] hover:bg-[#4339A6] text-white font-bold text-xs px-3 sm:px-4 py-2 rounded-lg transition-all cursor-pointer shadow-sm flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2"
              style={{ minHeight: "40px" }}
              aria-label="Crear nueva tarea"
            >
              <Plus size={14} aria-hidden="true" /> Nueva Tarea
            </button>
          </div>
        </div>
      </div>

      {/* Mini Gantt Toolbar */}
      <div className="bg-white rounded-xl border p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4" style={{ borderColor: "#E5E7EB" }} role="toolbar" aria-label="Herramientas de Gantt">
        <div className="flex items-center gap-2 flex-wrap">
          {["Semana", "Mes", "Trimestre"].map(z => (
            <button
              key={z}
              onClick={() => setZoomLevel(z)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2 ${zoomLevel === z ? "bg-[#EEEDFE] text-[#534AB7]" : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}
              style={{ minHeight: "36px" }}
              aria-label={`Zoom a nivel de ${z}`}
              aria-pressed={zoomLevel === z}
            >
              {z}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center gap-1.5 bg-white border border-[#E5E7EB] rounded-lg px-3.5 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2"
            style={{ minHeight: "36px" }}
            aria-label={collapsed ? "Expandir fases" : "Colapsar fases"}
            aria-pressed={collapsed}
          >
            <Minimize2 size={14} aria-hidden="true" />
            Colapsar fases
          </button>
          <button
            className="flex items-center gap-1.5 bg-white border border-[#E5E7EB] rounded-lg px-3.5 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2"
            style={{ minHeight: "36px" }}
            aria-label="Exportar a PDF"
          >
            <FileText size={14} aria-hidden="true" />
            Exportar PDF
          </button>
        </div>
      </div>

      {/* Gantt Timeline View */}
      <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-xs flex flex-col lg:flex-row overflow-hidden min-h-[400px] lg:min-h-[500px]">
        {/* Left List Panel (responsive width) */}
        <div className="w-full lg:w-[320px] border-r border-[#E5E7EB] flex flex-col shrink-0 order-2 lg:order-1">
          <div className="bg-slate-50 px-4 py-3 border-b border-[#E5E7EB] font-bold text-xs text-slate-500 uppercase tracking-wider h-11 flex items-center" role="columnheader">
            Fases y Tareas del Proyecto
          </div>
          <div className="flex-1 flex flex-col">
            {ganttData.map((row) => {
              if (collapsed && !row.isParent) return null;
              return (
                <div
                  key={row.id}
                  className={`px-4 py-3 text-xs flex items-center justify-between border-b border-slate-50 h-12 ${row.isParent ? "bg-[#EEEDFE]/20 font-bold text-slate-800" : "pl-8 text-slate-600 font-medium"}`}
                >
                  <span className="truncate pr-2">{row.name}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    {row.isParent ? (
                      <span className="text-[10px] font-bold text-[#534AB7] bg-[#EEEDFE] px-2 py-0.5 rounded-full">
                        {row.progress}%
                      </span>
                    ) : (
                      <>
                        {row.assigneeAvatar && (
                          <img src={row.assigneeAvatar} alt="" className="w-5 h-5 rounded-full object-cover border" />
                        )}
                        <span
                          className="text-[9px] font-extrabold px-1.5 py-0.5 rounded-full"
                          style={{
                            backgroundColor: `${row.statusColor}15`,
                            color: row.statusColor
                          }}
                        >
                          {row.status}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Timeline Grid Panel */}
        <div className="flex-1 overflow-x-auto flex flex-col relative order-1 lg:order-2 min-w-0">
          {/* Header Row: 6 Weeks of June - July */}
          <div className="flex border-b border-[#E5E7EB] bg-slate-50 text-center font-bold text-xs text-slate-500 h-11 shrink-0" role="row">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="flex-1 border-r border-slate-200 py-3 shrink-0 min-w-[100px] sm:min-w-[120px] flex items-center justify-center" role="columnheader">
                Semana {idx + 1}
              </div>
            ))}
          </div>

          {/* Gantt Bar Chart Rows */}
          <div className="flex-1 flex flex-col relative min-w-[600px] sm:min-w-[720px]">
            {/* Grid background columns */}
            <div className="absolute inset-0 flex pointer-events-none">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="flex-1 border-r border-slate-100/60 h-full relative">
                  {/* Weekend shading (columns 5 and 6 of each week, representing weekends) */}
                  <div className="absolute right-0 top-0 bottom-0 w-1/4 bg-slate-500/2"></div>
                </div>
              ))}
            </div>

            {/* Today vertical line: 14 Jun -> let's place it around Week 2.8 */}
            <div
              className="absolute top-0 bottom-0 border-l-2 border-red-500 border-dashed z-20 pointer-events-none"
              style={{ left: "28%" }}
              aria-hidden="true"
            >
              <span className="absolute top-1 left-2 bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                Hoy — 14 Jun
              </span>
            </div>

            {/* Milestone Diamond: Entrega v1.0 on June 30 -> let's place it around Week 4.2 */}
            <div
              className="absolute top-0 bottom-0 flex flex-col items-center z-20 pointer-events-none"
              style={{ left: "54%" }}
              aria-hidden="true"
            >
              <div className="border-l border-purple-500 border-dashed h-full absolute"></div>
              <div className="w-3.5 h-3.5 bg-[#534AB7] rotate-45 mt-4 border border-white shadow-md flex items-center justify-center"></div>
              <span className="bg-[#534AB7] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs mt-6">
                Entrega v1.0
              </span>
            </div>

            {/* Rendering rows */}
            {ganttData.map((row) => {
              if (collapsed && !row.isParent) return null;
              const isP = row.isParent;
              const barColor = getPhaseColor(row.phase);

              return (
                <div key={row.id} className="h-12 border-b border-slate-100 relative py-2 px-1 flex items-center">
                  {!isP && row.startWeek !== undefined && row.durationWeeks !== undefined && (
                    <div
                      className="absolute h-6 rounded-lg shadow-xs flex items-center justify-between px-3 text-[10px] font-bold text-white transition-all duration-300 hover:scale-[1.01] cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2"
                      style={{
                        left: `${((row.startWeek - 1) / 6) * 100}%`,
                        width: `${(row.durationWeeks / 6) * 100}%`,
                        backgroundColor: barColor,
                      }}
                      role="progressbar"
                      aria-label={`${row.name}: ${row.progress}% completado`}
                      aria-valuenow={row.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      tabIndex={0}
                    >
                      <span className="truncate pr-1" aria-hidden="true">{row.progress}%</span>
                    </div>
                  )}

                  {/* Render parent phase duration banner */}
                  {isP && row.phase === 1 && (
                    <div
                      className="absolute h-2.5 rounded-full opacity-30"
                      style={{
                        left: "0%",
                        width: "45%",
                        backgroundColor: barColor,
                      }}
                    ></div>
                  )}
                  {isP && row.phase === 2 && (
                    <div
                      className="absolute h-2.5 rounded-full opacity-30"
                      style={{
                        left: "16%",
                        width: "48%",
                        backgroundColor: barColor,
                      }}
                    ></div>
                  )}
                  {isP && row.phase === 3 && (
                    <div
                      className="absolute h-2.5 rounded-full opacity-30"
                      style={{
                        left: "41%",
                        width: "22%",
                        backgroundColor: barColor,
                      }}
                    ></div>
                  )}
                  {isP && row.phase === 4 && (
                    <div
                      className="absolute h-2.5 rounded-full opacity-30"
                      style={{
                        left: "58%",
                        width: "25%",
                        backgroundColor: barColor,
                      }}
                    ></div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
