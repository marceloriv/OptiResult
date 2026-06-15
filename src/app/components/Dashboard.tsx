import {
    AlertTriangle,
    ArrowUpRight,
    Calendar,
    CheckSquare,
    Edit2,
    Eye,
    Rocket,
    Users2
} from "lucide-react";
import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

interface DashboardProps {
  onNavigate?: (view: string) => void;
}

const kpiData = [
  { label: "Proyectos Activos", value: "12", trend: "+2 este mes", trendType: "success", icon: Rocket, color: "#534AB7" },
  { label: "Tareas Pendientes", value: "47", trend: "8 vencen hoy", trendType: "danger", icon: CheckSquare, color: "#E8C53A" },
  { label: "Recursos Asignados", value: "18/22", trend: "4 disponibles", trendType: "muted", icon: Users2, color: "#1D9E75" },
  { label: "Alertas de Vencimiento", value: "5", trend: "Críticas: 2", trendType: "danger", icon: AlertTriangle, color: "#D94F4F" }
];

const recentProjects = [
  { name: "Sistema de Gestión Hospitalaria", leader: "Ana Martínez", status: "En Progreso", statusColor: "#3B82F6", progress: 68, dueDate: "30 Jun 2026" },
  { name: "App Finanzas Corporativas", leader: "Carlos López", status: "En Revisión", statusColor: "#F59E0B", progress: 85, dueDate: "15 Jun 2026" },
  { name: "Portal Educativo eLearning", leader: "María Torres", status: "Por Iniciar", statusColor: "#6B7280", progress: 5, dueDate: "20 Jul 2026" },
  { name: "Migración Cloud AWS", leader: "David Lee", status: "Completado", statusColor: "#10B981", progress: 100, dueDate: "01 Jun 2026" },
  { name: "Dashboard Analítico BI", leader: "Sofía Ramos", status: "En Progreso", statusColor: "#3B82F6", progress: 42, dueDate: "10 Jul 2026" }
];

const myTasks = [
  { name: "Revisar arquitectura de microservicios", priority: "Alta", priorityColor: "#D94F4F", due: "Hoy" },
  { name: "Subir correcciones de cookies JWT", priority: "Alta", priorityColor: "#D94F4F", due: "Mañana" },
  { name: "Configurar webhooks Slack", priority: "Media", priorityColor: "#E8C53A", due: "16 Jun" }
];

const recentActivity = [
  { id: 1, text: "Ana Martínez completó la tarea 'Diseño de base de datos'", time: "hace 2h", icon: "✅" },
  { id: 2, text: "Carlos López comentó en 'Revisión de API'", time: "hace 3h", icon: "💬" },
  { id: 3, text: "David Lee unió al canal general de DevOps", time: "hace 5h", icon: "👥" },
  { id: 4, text: "Nueva versión v1.4.2 desplegada en Staging", time: "hace 8h", icon: "🚀" },
  { id: 5, text: "María Torres actualizó la documentación del portal", time: "hace 1d", icon: "📝" }
];

const donutData = [
  { name: "Ocupado", value: 73, color: "#534AB7" },
  { name: "Disponible", value: 27, color: "#EEEDFE" }
];

export function Dashboard({ onNavigate }: DashboardProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      className="flex-1 flex flex-col overflow-y-auto p-4 sm:p-8 gap-6 sm:gap-8"
      style={{ background: "#F8F7FF", fontFamily: "'Inter', sans-serif" }}
      role="main"
      aria-label="Dashboard principal"
    >
      {/* Greeting Banner */}
      <div
        className="w-full rounded-2xl p-5 sm:p-6 border flex flex-col md:flex-row items-start md:items-center justify-between relative overflow-hidden gap-5 shadow-sm shrink-0"
        style={{
          background: "linear-gradient(135deg, #534AB7 0%, #2E277A 100%)",
          borderColor: "rgba(83, 74, 183, 0.2)",
        }}
        role="banner"
        aria-label="Saludo personalizado"
      >
        {/* Subtle decorative glowing background patterns */}
        <div className="absolute -right-10 -top-10 w-44 h-44 bg-[#9B92F2] rounded-full blur-3xl opacity-20 pointer-events-none"></div>
        <div className="absolute left-1/3 -bottom-10 w-36 h-36 bg-[#E0DDFE] rounded-full blur-3xl opacity-10 pointer-events-none"></div>

        <div className="flex flex-col gap-3 relative z-10 w-full md:max-w-[75%]">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
            Buenos días, Carlos <span className="animate-bounce">👋</span>
          </h1>
          
          <p className="text-xs sm:text-sm text-[#E2DFFD]/90 font-medium">
            Resumen de tu jornada para hoy:
          </p>

          <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 sm:items-center mt-1">
            <span className="font-semibold text-white bg-white/15 px-3 py-1.5 rounded-lg inline-flex items-center gap-2 text-xs sm:text-sm border border-white/10 w-fit">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E8C53A] border border-white/20"></span>
              <strong>7</strong> tareas pendientes
            </span>
            <span className="font-semibold text-white bg-[#D94F4F]/85 px-3 py-1.5 rounded-lg inline-flex items-center gap-2 text-xs sm:text-sm border border-[#D94F4F]/35 w-fit">
              <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></span>
              <strong>2</strong> proyectos con alerta de vencimiento hoy
            </span>
          </div>
        </div>

        {onNavigate && (
          <div className="relative z-10 flex items-center gap-2 mt-2 md:mt-0 w-full md:w-auto">
            <button
              onClick={() => onNavigate("tablero")}
              className="w-full md:w-auto px-4 py-2.5 bg-white text-[#534AB7] hover:bg-white/95 font-bold text-sm rounded-xl transition-all duration-200 shadow-sm active:scale-95 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#534AB7] cursor-pointer text-center"
            >
              Ver mis tareas
            </button>
          </div>
        )}
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 shrink-0" role="region" aria-label="Indicadores clave de rendimiento">
        {kpiData.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div
              key={kpi.label}
              className="bg-white rounded-xl p-4 sm:p-5 border flex flex-col gap-4 transition-all duration-300 hover:shadow-md focus-within:ring-2 focus-within:ring-[#534AB7]"
              style={{
                borderColor: "#E5E7EB",
                boxShadow: "0 2px 12px rgba(83, 74, 183, 0.04)"
              }}
              role="article"
              aria-label={`${kpi.label}: ${kpi.value}`}
            >
              <div className="flex items-center justify-between">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${kpi.color}15` }}
                >
                  <Icon size={20} color={kpi.color} aria-hidden="true" />
                </div>
                <span
                  className="text-xs font-bold px-2.5 py-0.5 rounded-full"
                  style={{
                    background: kpi.trendType === "danger" ? "#FEE2E2" : kpi.trendType === "success" ? "#F0FDF4" : "#F3F4F6",
                    color: kpi.trendType === "danger" ? "#D94F4F" : kpi.trendType === "success" ? "#1D9E75" : "#6B7280"
                  }}
                >
                  {kpi.trend}
                </span>
              </div>
              <div>
                <h3 className="text-2xl font-extrabold text-[#1A1A2E] leading-none">
                  {kpi.value}
                </h3>
                <p className="text-xs text-[#6B7280] font-bold mt-1.5 uppercase tracking-wider">
                  {kpi.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Columns: Left (70%) and Right (30%) */}
      <div className="flex flex-col lg:flex-row gap-6 shrink-0">
        {/* Left Column (70%) */}
        <div className="w-full lg:w-[70%] flex flex-col gap-6">
          {/* Recent Projects Card */}
          <div className="bg-white rounded-xl border p-6 shadow-xs flex flex-col gap-4" style={{ borderColor: "#E5E7EB" }}>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#1A1A2E]" style={{ fontSize: 22 }}>
                Proyectos Recientes
              </h2>
              <button
                onClick={() => onNavigate("proyectos")}
                className="text-xs font-bold text-[#534AB7] hover:underline flex items-center gap-0.5 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2 rounded px-2 py-1"
                style={{ minHeight: "40px" }}
                aria-label="Ver todos los proyectos"
              >
                Ver todos <ArrowUpRight size={14} aria-hidden="true" />
              </button>
            </div>

            <div className="overflow-x-auto" role="region" aria-label="Tabla de proyectos recientes" tabIndex={0}>
              <table className="w-full text-left border-collapse" role="table">
                <thead>
                  <tr className="border-b border-slate-100 text-xs text-[#6B7280] font-bold uppercase tracking-wider">
                    <th className="pb-3" scope="col">Nombre del Proyecto</th>
                    <th className="pb-3" scope="col">Líder</th>
                    <th className="pb-3" scope="col">Estado</th>
                    <th className="pb-3" scope="col">Progreso</th>
                    <th className="pb-3" scope="col">Fecha Límite</th>
                    <th className="pb-3 text-right" scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProjects.map((p, idx) => (
                    <tr
                      key={p.name}
                      className="border-b border-slate-50 last:border-none text-sm text-slate-700 hover:bg-slate-50/50 transition-colors"
                    >
                      <td className="py-3.5 font-semibold text-slate-800">{p.name}</td>
                      <td className="py-3.5 text-xs font-medium text-slate-500">{p.leader}</td>
                      <td className="py-3.5">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                          style={{
                            background: `${p.statusColor}15`,
                            color: p.statusColor,
                          }}
                        >
                          {p.status}
                        </span>
                      </td>
                      <td className="py-3.5">
                        <div className="flex items-center gap-2 w-28">
                          <div className="flex-1 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${p.progress}%`, backgroundColor: p.statusColor }}
                            />
                          </div>
                          <span className="text-[10px] font-extrabold">{p.progress}%</span>
                        </div>
                      </td>
                      <td className="py-3.5 text-xs font-semibold text-slate-500">{p.dueDate}</td>
                      <td className="py-3.5 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onNavigate("proyectos")}
                            className="p-2 text-slate-400 hover:text-[#534AB7] rounded hover:bg-slate-100 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2"
                            style={{ minHeight: "36px", minWidth: "36px" }}
                            aria-label={`Ver proyecto ${p.name}`}
                          >
                            <Eye size={14} aria-hidden="true" />
                          </button>
                          <button
                            className="p-2 text-slate-400 hover:text-[#534AB7] rounded hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2"
                            style={{ minHeight: "36px", minWidth: "36px" }}
                            aria-label={`Editar proyecto ${p.name}`}
                          >
                            <Edit2 size={14} aria-hidden="true" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Kanban Strip Preview */}
          <div
            className="bg-white rounded-xl border p-5 shadow-xs flex items-center justify-between flex-wrap gap-4"
            style={{ borderColor: "#E5E7EB" }}
          >
            <div className="flex items-center gap-6 flex-wrap">
              <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Tablero Kanban:</span>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                  Por Hacer <strong className="text-slate-800">12</strong>
                </span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  En Progreso <strong className="text-blue-800">8</strong>
                </span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
                  En Revisión <strong className="text-amber-800">6</strong>
                </span>
                <span className="flex items-center gap-1.5 text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                  Completado <strong className="text-green-800">21</strong>
                </span>
              </div>
            </div>
            <button
              onClick={() => onNavigate("proyectos")}
              className="bg-[#534AB7] hover:bg-[#4339A6] text-white font-bold text-xs px-4 py-2 rounded-lg transition-all cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2"
              style={{ minHeight: "40px" }}
              aria-label="Abrir tablero Kanban completo"
            >
              Abrir Kanban completo →
            </button>
          </div>
        </div>

        {/* Right Column (30%) */}
        <div className="w-full lg:w-[30%] flex flex-col gap-6">
          {/* Workload Donut Card */}
          <div className="bg-white rounded-xl border p-4 sm:p-5 shadow-xs flex flex-col gap-4" style={{ borderColor: "#E5E7EB" }} role="region" aria-label="Gráfico de carga de trabajo">
            <h3 className="text-base font-bold text-[#1A1A2E]" style={{ fontSize: 16 }}>
              Mi Carga de Trabajo
            </h3>
            <div className="flex items-center justify-center relative my-2 h-[140px]" role="img" aria-label="Gráfico circular: 73% ocupado, 27% disponible">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={60}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-extrabold text-[#534AB7]">73%</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Ocupado</span>
              </div>
            </div>

            {/* My active task list */}
            <div className="flex flex-col gap-2.5 border-t border-slate-100 pt-4">
              {myTasks.map((t) => (
                <div key={t.name} className="flex justify-between items-center bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                  <div className="truncate pr-2">
                    <span className="text-xs font-semibold text-slate-700 block truncate leading-snug">{t.name}</span>
                    <span className="text-[10px] text-slate-400 font-medium">Límite: {t.due}</span>
                  </div>
                  <span
                    className="text-[9px] font-extrabold px-1.5 py-0.5 rounded shrink-0"
                    style={{
                      background: t.priorityColor === "#D94F4F" ? "#FEE2E2" : "#FEF3C7",
                      color: t.priorityColor
                    }}
                  >
                    {t.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white rounded-xl border p-4 sm:p-5 shadow-xs flex flex-col gap-4" style={{ borderColor: "#E5E7EB" }} role="region" aria-label="Feed de actividad reciente">
            <h3 className="text-base font-bold text-[#1A1A2E]" style={{ fontSize: 16 }}>
              Actividad Reciente
            </h3>
            <div className="flex flex-col gap-3">
              {recentActivity.map((a) => (
                <div key={a.id} className="flex gap-2.5 items-start text-xs text-slate-600 border-b border-slate-50 pb-2.5 last:border-none last:pb-0">
                  <span className="text-sm mt-0.5 shrink-0">{a.icon}</span>
                  <div>
                    <p className="leading-snug text-slate-700 font-medium">{a.text}</p>
                    <span className="text-[10px] text-[#9CA3AF] mt-0.5 block">{a.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar Widget Preview */}
          <div className="bg-white rounded-xl border p-4 sm:p-5 shadow-xs flex flex-col gap-3" style={{ borderColor: "#E5E7EB" }} role="region" aria-label="Calendario de próximos eventos">
            <h3 className="text-base font-bold text-[#1A1A2E] flex items-center gap-1.5" style={{ fontSize: 16 }}>
              <Calendar size={16} className="text-[#534AB7]" />
              Próximos Eventos
            </h3>
            <div className="grid grid-cols-7 gap-1 text-center font-bold text-[10px] text-[#6B7280] border-b border-slate-100 pb-2" role="row">
              <span role="columnheader" aria-label="Lunes">L</span>
              <span role="columnheader" aria-label="Martes">M</span>
              <span role="columnheader" aria-label="Miércoles">M</span>
              <span role="columnheader" aria-label="Jueves">J</span>
              <span role="columnheader" aria-label="Viernes">V</span>
              <span role="columnheader" aria-label="Sábado">S</span>
              <span role="columnheader" aria-label="Domingo">D</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-slate-600" role="row">
              <span className="py-1" aria-label="8 de junio">8</span>
              <span className="py-1" aria-label="9 de junio">9</span>
              <span className="py-1" aria-label="10 de junio">10</span>
              <span className="py-1" aria-label="11 de junio">11</span>
              <span className="py-1 bg-[#EEEDFE] text-[#534AB7] rounded-full relative" aria-label="12 de junio, evento pendiente">
                12
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D94F4F]" aria-hidden="true"></span>
              </span>
              <span className="py-1" aria-label="13 de junio">13</span>
              <span className="py-1 bg-[#534AB7] text-white rounded-full relative" aria-label="14 de junio, hoy">
                14
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#10B981]" aria-hidden="true"></span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
