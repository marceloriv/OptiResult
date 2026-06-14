import React, { useState } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import { Calendar, FileDown, Briefcase, Filter } from "lucide-react";

// Line Chart Data: Completion trend over 4 months
const completionTrendData = [
  { mes: "Marzo", completado: 45 },
  { mes: "Abril", completado: 58 },
  { mes: "Mayo", completado: 72 },
  { mes: "Junio", completado: 89 }
];

// Bar Chart Data: Planned vs Actual Hours per project
const hoursComparisonData = [
  { name: "OptiResult v2.0", planificadas: 320, reales: 285 },
  { name: "Migración AWS", planificadas: 180, reales: 195 },
  { name: "Brand Portal", planificadas: 120, reales: 110 },
  { name: "API Gateway", planificadas: 200, reales: 240 }
];

// Table Resumen
const projectsSummary = [
  {
    name: "Rediseño Plataforma OptiResult v2.0",
    startDate: "01 Jun 2026",
    endDate: "30 Jun 2026",
    budgetUsed: "$18,500 / $25,000",
    budgetPct: 74,
    status: "En Progreso",
    statusColor: "#534AB7"
  },
  {
    name: "Migración de Base de Datos AWS",
    startDate: "15 May 2026",
    endDate: "10 Jun 2026",
    budgetUsed: "$14,200 / $15,000",
    budgetPct: 94,
    status: "Completado",
    statusColor: "#1D9E75"
  },
  {
    name: "Portal de Marca y Landing Page",
    startDate: "05 Jun 2026",
    endDate: "22 Jun 2026",
    budgetUsed: "$4,500 / $8,000",
    budgetPct: 56,
    status: "En Progreso",
    statusColor: "#534AB7"
  },
  {
    name: "Integración de API Gateway",
    startDate: "01 Abr 2026",
    endDate: "15 May 2026",
    budgetUsed: "$12,000 / $12,000",
    budgetPct: 100,
    status: "Completado",
    statusColor: "#1D9E75"
  }
];

export function Reports() {
  const [selectedProject, setSelectedProject] = useState("todos");
  const [dateRange, setDateRange] = useState("Junio 2026");

  const handleExport = () => {
    alert("Exportando reporte ejecutivo en formato PDF/Excel...");
  };

  return (
    <div
      className="flex-1 flex flex-col overflow-y-auto p-6 gap-6"
      style={{ background: "#FFFFFF", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900" style={{ fontSize: 24 }}>
          Módulo de Reportes
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Genera reportes de rendimiento de proyectos, horas estimadas vs. reales y control presupuestario.
        </p>
      </div>

      {/* Top Filter Bar */}
      <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-4 flex-wrap">
          {/* Project Selector */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Proyecto</span>
            <div className="relative">
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 outline-none pr-8 cursor-pointer appearance-none"
              >
                <option value="todos">Todos los proyectos</option>
                <option value="opti">OptiResult v2.0</option>
                <option value="aws">Migración AWS</option>
                <option value="api">API Gateway</option>
              </select>
              <Briefcase size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
            </div>
          </div>

          {/* Date Picker */}
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Rango de Fechas</span>
            <div className="relative">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-700 outline-none pr-8 cursor-pointer appearance-none"
              >
                <option value="Junio 2026">Últimos 30 días (Junio 2026)</option>
                <option value="Q2 2026">Segundo Trimestre (Q2)</option>
                <option value="YTD">Año completo (YTD)</option>
              </select>
              <Calendar size={12} className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" />
            </div>
          </div>
        </div>

        {/* Export Button */}
        <button
          onClick={handleExport}
          className="flex items-center gap-2 bg-[#534AB7] text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-[#4339A6] transition-all cursor-pointer shadow-sm"
        >
          <FileDown size={14} />
          Exportar Reporte
        </button>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Line Chart: Project Completion Trend */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Tendencia de Completitud</h3>
            <p className="text-[10px] text-slate-400">Porcentaje de tareas completadas de forma acumulada (Últimos 4 meses)</p>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={completionTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="mes" tick={{ fill: "#64748B", fontSize: 10 }} />
                <YAxis tick={{ fill: "#64748B", fontSize: 10 }} domain={[0, 100]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="completado"
                  stroke="#534AB7"
                  strokeWidth={3}
                  activeDot={{ r: 6 }}
                  name="Tasa de Completitud (%)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart: Planned vs Actual Hours */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Horas Planificadas vs. Reales</h3>
            <p className="text-[10px] text-slate-400">Comparativa del esfuerzo estimado frente al esfuerzo real registrado</p>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={hoursComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="name" tick={{ fill: "#64748B", fontSize: 9 }} />
                <YAxis tick={{ fill: "#64748B", fontSize: 10 }} />
                <Tooltip />
                <Legend wrapperStyle={{ fontSize: 10 }} />
                <Bar dataKey="planificadas" fill="#EEEDFE" stroke="#534AB7" strokeWidth={1} name="Planificadas" radius={[4, 4, 0, 0]} />
                <Bar dataKey="reales" fill="#534AB7" name="Reales" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Projects Summary Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        <div className="px-5 py-4 border-b border-slate-100">
          <h3 className="text-sm font-bold text-slate-800">Resumen Financiero y de Estados</h3>
        </div>
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase">Proyecto</th>
              <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase">Inicio</th>
              <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase">Fin</th>
              <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase">Presupuesto Consumido</th>
              <th className="px-5 py-3 text-xs font-bold text-slate-500 uppercase">Estado</th>
            </tr>
          </thead>
          <tbody>
            {projectsSummary.map((project) => (
              <tr key={project.name} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                <td className="px-5 py-4 text-xs font-bold text-slate-800">{project.name}</td>
                <td className="px-5 py-4 text-xs text-slate-500 font-medium">{project.startDate}</td>
                <td className="px-5 py-4 text-xs text-slate-500 font-medium">{project.endDate}</td>
                <td className="px-5 py-4">
                  <div className="flex flex-col gap-1 w-full max-w-[200px]">
                    <div className="flex justify-between items-center text-[10px] font-bold text-slate-600">
                      <span>{project.budgetUsed}</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${project.budgetPct}%`,
                          background: project.budgetPct > 90 ? "#D94F4F" : "#1D9E75",
                        }}
                      ></div>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: `${project.statusColor}12`,
                      color: project.statusColor,
                    }}
                  >
                    {project.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
