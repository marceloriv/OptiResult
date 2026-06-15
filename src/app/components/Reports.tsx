import { AlertTriangle, Briefcase, Calendar, Check, FileDown, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";

// Line Chart Data
const lineData = [
  { name: "Marzo", completadas: 15, enCurso: 25, vencidas: 1 },
  { name: "Abril", completadas: 24, enCurso: 32, vencidas: 2 },
  { name: "Mayo", completadas: 38, enCurso: 28, vencidas: 4 },
  { name: "Junio", completadas: 52, enCurso: 19, vencidas: 3 }
];

// Donut Chart Data
const pieData = [
  { name: "Completados", value: 33, color: "#1D9E75" },
  { name: "En Progreso", value: 42, color: "#534AB7" },
  { name: "En Revisión", value: 17, color: "#E8C53A" },
  { name: "Por Iniciar", value: 8, color: "#6B7280" }
];

// Grouped Bar Data
const hoursData = [
  { name: "Sist. Hospitalario", planificadas: 320, reales: 285 },
  { name: "App Finanzas", planificadas: 240, reales: 290 },
  { name: "eLearning", planificadas: 180, reales: 160 },
  { name: "AWS Cloud", planificadas: 150, reales: 150 },
  { name: "Dashboard BI", planificadas: 120, reales: 140 }
];

// Horizontal Bar Data
const perfData = [
  { name: "Carlos L.", completadas: 18, color: "#1D9E75" },
  { name: "Ana M.", completadas: 16, color: "#1D9E75" },
  { name: "Pedro V.", completadas: 14, color: "#E8C53A" },
  { name: "María T.", completadas: 11, color: "#E8C53A" },
  { name: "Sofía R.", completadas: 7, color: "#D94F4F" }
];

const projectsTable = [
  { name: "Sistema de Gestión Hospitalaria", leader: "Ana Martínez", start: "01 Jun 2026", end: "30 Jun 2026", budget: "$18,500 / $25,000", totalTasks: 34, pct: 68, status: "En Progreso", color: "#3B82F6" },
  { name: "App Finanzas Corporativas", leader: "Carlos López", start: "15 May 2026", end: "15 Jun 2026", budget: "$12,400 / $15,000", totalTasks: 22, pct: 85, status: "En Revisión", color: "#F59E0B" },
  { name: "Portal Educativo eLearning", leader: "María Torres", start: "05 Jun 2026", end: "20 Jul 2026", budget: "$3,200 / $10,000", totalTasks: 28, pct: 5, status: "Por Iniciar", color: "#6B7280" },
  { name: "Migración Cloud AWS", leader: "David Lee", start: "10 Abr 2026", end: "01 Jun 2026", budget: "$18,000 / $18,000", totalTasks: 16, pct: 100, status: "Completado", color: "#10B981" },
  { name: "Dashboard Analítico BI", leader: "Sofía Ramos", start: "01 Jun 2026", end: "10 Jul 2026", budget: "$5,000 / $12,000", totalTasks: 18, pct: 42, status: "En Progreso", color: "#3B82F6" }
];

export function Reports() {
  const [projectSelector, setProjectSelector] = useState("todos");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      className="flex-1 flex flex-col overflow-y-auto p-4 sm:p-6 lg:p-8 gap-4 sm:gap-6"
      style={{ background: "#F8F7FF", fontFamily: "'Inter', sans-serif" }}
      role="main"
      aria-label="Reportes y analítica"
    >
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-[#1A1A2E]">
          Reportes y Analítica
        </h1>
        <p className="text-sm text-slate-500 mt-1 font-medium">
          Genera reportes automáticos del estado de proyectos, recursos y rendimiento del equipo.
        </p>
      </div>

      {/* Top Controls Bar */}
      <div className="bg-white rounded-xl p-3 sm:p-4 border border-[#E5E7EB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 flex-wrap shadow-xs" role="toolbar" aria-label="Controles de reportes">
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap w-full sm:w-auto">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rango de fechas</span>
            <button className="flex items-center gap-2 bg-[#F8F7FF] border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2" style={{ minHeight: "36px" }} aria-label="Seleccionar rango de fechas">
              <Calendar size={14} className="text-slate-400" aria-hidden="true" />
              1 Jun 2026 – 14 Jun 2026
            </button>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Proyecto</span>
            <div className="relative">
              <select
                value={projectSelector}
                onChange={(e) => setProjectSelector(e.target.value)}
                className="bg-white border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 outline-none pr-8 cursor-pointer appearance-none focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2"
                style={{ minHeight: "36px" }}
                aria-label="Seleccionar proyecto"
              >
                <option value="todos">Todos los proyectos</option>
                <option value="hosp">Sistema Hospitalario</option>
                <option value="fin">App Finanzas</option>
              </select>
              <Briefcase size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" aria-hidden="true" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap w-full sm:w-auto">
          <button className="bg-[#534AB7] hover:bg-[#4339A6] text-white font-bold text-xs px-4 py-2 rounded-lg transition-all cursor-pointer shadow-sm focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2" style={{ minHeight: "40px" }} aria-label="Generar reporte">
            Generar Reporte
          </button>
          <button className="flex items-center gap-1.5 bg-white border border-[#E5E7EB] rounded-lg px-3.5 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2" style={{ minHeight: "36px" }} aria-label="Exportar a PDF">
            <FileDown size={14} aria-hidden="true" /> Exportar PDF
          </button>
          <button className="flex items-center gap-1.5 bg-white border border-[#E5E7EB] rounded-lg px-3.5 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2" style={{ minHeight: "36px" }} aria-label="Exportar a Excel">
            <FileDown size={14} aria-hidden="true" /> Exportar Excel
          </button>
        </div>
      </div>

      {/* Row 1: Line Chart & Donut Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
        {/* Line Chart (60%) */}
        <div className="bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-xs lg:col-span-6 flex flex-col gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Tendencia de Completitud de Proyectos</h3>
            <p className="text-[10px] text-slate-400">Progreso mensual por estado de tareas (Ene - Jun 2026)</p>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lineData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="name" tick={{ fill: "#6B7280", fontSize: 10 }} />
                <YAxis tick={{ fill: "#6B7280", fontSize: 10 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Line type="monotone" dataKey="completadas" stroke="#1D9E75" strokeWidth={2.5} name="Completadas" />
                <Line type="monotone" dataKey="enCurso" stroke="#534AB7" strokeWidth={2.5} name="En Progreso" />
                <Line type="monotone" dataKey="vencidas" stroke="#D94F4F" strokeWidth={2.5} name="Vencidas" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Donut Chart (40%) */}
        <div className="bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-xs lg:col-span-4 flex flex-col gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Estado Actual de Proyectos</h3>
            <p className="text-[10px] text-slate-400">Distribución porcentual por etapa de desarrollo</p>
          </div>
          <div className="h-[140px] flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={60}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-xl font-extrabold text-slate-800">12</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Proyectos</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-[10px] font-bold text-slate-500 pt-2 border-t border-slate-100">
            {pieData.map(d => (
              <div key={d.name} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></span>
                <span>{d.name}: {d.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Grouped Bar & Horizontal Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Chart - Grouped Bar */}
        <div className="bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-xs flex flex-col gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Horas Planificadas vs Ejecutadas</h3>
            <p className="text-[10px] text-slate-400">Consumo de horas estimadas contra el registro real</p>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hoursData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="name" tick={{ fill: "#6B7280", fontSize: 9 }} />
                <YAxis tick={{ fill: "#6B7280", fontSize: 10 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey="planificadas" fill="#EEEDFE" stroke="#534AB7" strokeWidth={1} name="Planificadas" radius={[4, 4, 0, 0]} />
                <Bar dataKey="reales" fill="#534AB7" name="Reales" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Chart - Horizontal Bar */}
        <div className="bg-white rounded-xl p-5 border border-[#E5E7EB] shadow-xs flex flex-col gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Rendimiento por Equipo</h3>
            <p className="text-[10px] text-slate-400">Total de tareas completadas de forma satisfactoria</p>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={perfData} layout="vertical" margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
                <XAxis type="number" tick={{ fill: "#6B7280", fontSize: 10 }} />
                <YAxis dataKey="name" type="category" tick={{ fill: "#6B7280", fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="completadas" fill="#534AB7" name="Tareas completadas" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-xs overflow-hidden flex flex-col">
        <div className="px-4 sm:px-5 py-4 border-b border-slate-100">
          <h3 className="text-base font-bold text-slate-800">Resumen Ejecutivo de Proyectos</h3>
        </div>
        <div className="overflow-x-auto" role="region" aria-label="Tabla de resumen de proyectos" tabIndex={0}>
        <table className="w-full text-left border-collapse" role="table">
          <thead>
            <tr className="bg-[#F8F7FF] border-b border-slate-200">
              <th className="px-4 sm:px-5 py-3 text-xs font-bold text-slate-500 uppercase" scope="col">Proyecto</th>
              <th className="px-4 sm:px-5 py-3 text-xs font-bold text-slate-500 uppercase hidden sm:table-cell" scope="col">Líder</th>
              <th className="px-4 sm:px-5 py-3 text-xs font-bold text-slate-500 uppercase hidden sm:table-cell" scope="col">Inicio</th>
              <th className="px-4 sm:px-5 py-3 text-xs font-bold text-slate-500 uppercase hidden sm:table-cell" scope="col">Fin</th>
              <th className="px-4 sm:px-5 py-3 text-xs font-bold text-slate-500 uppercase" scope="col">Presupuesto</th>
              <th className="px-4 sm:px-5 py-3 text-xs font-bold text-slate-500 uppercase" scope="col">Tareas</th>
              <th className="px-4 sm:px-5 py-3 text-xs font-bold text-slate-500 uppercase" scope="col">% Compl.</th>
              <th className="px-4 sm:px-5 py-3 text-xs font-bold text-slate-500 uppercase" scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            {projectsTable.map((p, idx) => (
              <tr
                key={p.name}
                className="border-b border-slate-100 hover:bg-[#F8F7FF]/40 transition-colors text-xs text-slate-700"
                style={{ backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "#F8F7FF" }}
              >
                <td className="px-4 sm:px-5 py-3.5 font-bold text-slate-800">{p.name}</td>
                <td className="px-4 sm:px-5 py-3.5 font-medium text-slate-500 hidden sm:table-cell">{p.leader}</td>
                <td className="px-4 sm:px-5 py-3.5 font-medium text-slate-500 hidden sm:table-cell">{p.start}</td>
                <td className="px-4 sm:px-5 py-3.5 font-medium text-slate-500 hidden sm:table-cell">{p.end}</td>
                <td className="px-4 sm:px-5 py-3.5 font-semibold text-slate-600">{p.budget}</td>
                <td className="px-4 sm:px-5 py-3.5 font-semibold text-slate-600">{p.totalTasks}</td>
                <td className="px-4 sm:px-5 py-3.5 font-extrabold text-slate-800">{p.pct}%</td>
                <td className="px-4 sm:px-5 py-3.5">
                  <span
                    className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: `${p.color}15`,
                      color: p.color
                    }}
                  >
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
            {/* Totals Row */}
            <tr className="bg-slate-100 font-extrabold text-slate-800 text-xs">
              <td className="px-4 sm:px-5 py-3">Total General</td>
              <td className="px-4 sm:px-5 py-3 hidden sm:table-cell"></td>
              <td className="px-4 sm:px-5 py-3 hidden sm:table-cell"></td>
              <td className="px-4 sm:px-5 py-3 hidden sm:table-cell"></td>
              <td className="px-4 sm:px-5 py-3">$57,100 / $80,000</td>
              <td className="px-4 sm:px-5 py-3">118</td>
              <td className="px-4 sm:px-5 py-3">60%</td>
              <td className="px-4 sm:px-5 py-3"></td>
            </tr>
          </tbody>
        </table>
        </div>
      </div>

      {/* Alertas y Recomendaciones cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex gap-3 text-xs text-[#D94F4F] font-semibold items-start shadow-xs" role="alert" aria-live="polite">
          <AlertTriangle size={16} className="shrink-0" aria-hidden="true" />
          <p>2 proyectos con riesgo crítico de vencimiento esta semana</p>
        </div>
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex gap-3 text-xs text-[#B45309] font-semibold items-start shadow-xs" role="alert" aria-live="polite">
          <Zap size={16} className="shrink-0" aria-hidden="true" />
          <p>3 miembros del equipo con sobrecarga superior al 90%</p>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex gap-3 text-xs text-[#1D9E75] font-semibold items-start shadow-xs" role="status" aria-live="polite">
          <Check size={16} className="shrink-0" aria-hidden="true" />
          <p>El proyecto 'Migración Cloud AWS' fue completado exitosamente</p>
        </div>
      </div>
    </div>
  );
}
