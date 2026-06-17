import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  FolderOpen,
  ClipboardList,
  Users2,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  MoreVertical,
  Calendar,
} from "lucide-react";

// KPI definitions
const kpis = [
  {
    label: "Proyectos Clínicos Activos",
    value: "12",
    delta: "+2 este mes",
    trend: "up",
    icon: FolderOpen,
    color: "#534AB7", // primary
  },
  {
    label: "Entregables Pendientes",
    value: "38",
    delta: "-5 vs ayer",
    trend: "up",
    icon: ClipboardList,
    color: "#a83ae8", // warning
  },
  {
    label: "Equipo Multidisciplinario",
    value: "84%",
    delta: "+4% vs sem ant",
    trend: "up",
    icon: Users2,
    color: "#1d269e", // success
  },
  {
    label: "Eficiencia Operativa",
    value: "3",
    delta: "Crítico",
    trend: "down",
    icon: AlertTriangle,
    color: "#df77bf", // alert
  },
];

// Kanban columns and tasks
const initialKanbanData = [
  {
    title: "Por Hacer",
    color: "#EEEDFE",
    textColor: "#534AB7",
    tasks: [
      {
        id: "T-101",
        title: "Diseñar flujo de agendamiento médico para clínicas privadas",
        priority: "Alta",
        dueDate: "20 Jun",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60",
        assignee: "Sofia R."
      },
      {
        id: "T-102",
        title: "Redactar reglas de acceso y trazabilidad para ficha clínica digital",
        priority: "Baja",
        dueDate: "28 Jun",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=60",
        assignee: "Pedro G."
      }
    ]
  },
  {
    title: "En Progreso",
    color: "#EEEDFE",
    textColor: "#534AB7",
    tasks: [
      {
        id: "T-201",
        title: "Integrar sistema de laboratorio clínico con validación de resultados",
        priority: "Alta",
        dueDate: "18 Jun",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=60",
        assignee: "Ana M."
      },
      {
        id: "T-202",
        title: "Implementar portal de pacientes con acceso seguro y responsive",
        priority: "Media",
        dueDate: "22 Jun",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=60",
        assignee: "Carlos L."
      }
    ]
  },
  {
    title: "En Revisión",
    color: "#EEEDFE",
    textColor: "#534AB7",
    tasks: [
      {
        id: "T-301",
        title: "Validar integración HIS con trazabilidad de admisiones y egresos",
        priority: "Media",
        dueDate: "16 Jun",
        avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=60",
        assignee: "Elena V."
      }
    ]
  },
  {
    title: "Completado",
    color: "#EEEDFE",
    textColor: "#534AB7",
    tasks: [
      {
        id: "T-401",
        title: "Cerrar pruebas de telemedicina y validación de audio/video",
        priority: "Alta",
        dueDate: "10 Jun",
        avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&auto=format&fit=crop&q=60",
        assignee: "Marcos T."
      },
      {
        id: "T-402",
        title: "Sincronizar ficha clínica digital con el flujo de laboratorio",
        priority: "Baja",
        dueDate: "12 Jun",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=60",
        assignee: "Lucia S."
      }
    ]
  }
];

const pieData = [
  { name: "Completados", value: 74, color: "#534AB7" },
  { name: "Restante", value: 26, color: "#EEEDFE" }
];

export function Dashboard() {
  return (
    <div
      className="flex h-full overflow-hidden"
      style={{ background: "#061673", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Main dashboard content area */}
      <div className="flex-1 flex flex-col overflow-y-auto p-6 gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white" style={{ fontSize: 24 }}>
              Dashboard Principal
            </h1>
            <p className="text-sm text-cyan-100/70 mt-1">
              Monitorea el estado general y el rendimiento de los proyectos clínicos en tiempo real.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-cyan-100/70 bg-white/5 rounded-lg px-3 py-1.5 border border-white/10">
              Semana actual: 24
            </span>
          </div>
        </div>

        {/* 4 KPI Cards in a row */}
        <div className="grid grid-cols-4 gap-6">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div
                key={kpi.label}
                className="rounded-xl p-5 transition-all duration-300 hover:shadow-md border"
                style={{
                  background: "rgba(13,21,71,0.92)",
                  borderColor: "rgba(255,255,255,0.08)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.24)",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${kpi.color}15` }}
                  >
                    <Icon size={20} color={kpi.color} />
                  </div>
                  <span
                    className="text-xs font-medium flex items-center gap-1 px-2 py-0.5 rounded-full"
                    style={{
                      background: kpi.color === "#D94F4F" ? "rgba(217,79,79,0.18)" : "rgba(121,174,242,0.16)",
                      color: kpi.color === "#D94F4F" ? "#FFB4B4" : "#BAE6FD",
                    }}
                  >
                    {kpi.trend === "up" ? (
                      <TrendingUp size={12} />
                    ) : (
                      <TrendingDown size={12} />
                    )}
                    {kpi.delta}
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white leading-tight">
                    {kpi.value}
                  </h3>
                  <p className="text-xs text-cyan-100/70 mt-1 font-medium">
                    {kpi.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Kanban Board */}
        <div className="flex-1 flex flex-col min-h-[480px]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white" style={{ fontSize: 18 }}>
              Tablero de Tareas Kanban
            </h2>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#534AB7]"></span>
              <span className="text-xs text-cyan-100/70 font-medium">Sprint Clínico v1.4</span>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-4 flex-1">
            {initialKanbanData.map((column) => (
              <div
                key={column.title}
                className="rounded-xl p-3.5 flex flex-col gap-3.5 border"
                style={{ background: "rgba(13,21,71,0.65)", borderColor: "rgba(255,255,255,0.08)" }}
              >
                {/* Column Header */}
                <div className="flex items-center justify-between px-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-bold"
                      style={{ background: column.color, color: column.textColor }}
                    >
                      {column.title}
                    </span>
                    <span className="text-xs text-cyan-100/50 font-bold">
                      {column.tasks.length}
                    </span>
                  </div>
                  <button className="text-cyan-100/50 hover:text-white">
                    <MoreVertical size={16} />
                  </button>
                </div>

                {/* Cards Container */}
                <div className="flex flex-col gap-3 overflow-y-auto max-h-[360px] pr-0.5">
                  {column.tasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-4 rounded-xl border transition-all hover:-translate-y-0.5 duration-200"
                      style={{
                        background: "rgba(6,22,115,0.82)",
                        borderColor: "rgba(255,255,255,0.08)",
                        boxShadow: "0 2px 12px rgba(0,0,0,0.18)",
                      }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="text-[10px] font-bold text-[#79AEF2] bg-[#EEEDFE]/10 px-2 py-0.5 rounded">
                          {task.id}
                        </span>
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full"
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
                      <h4 className="text-sm font-semibold text-white leading-snug mb-3">
                        {task.title}
                      </h4>
                      <div className="flex items-center justify-between border-t border-white/10 pt-3">
                        <div className="flex items-center gap-2">
                          <img
                            src={task.avatar}
                            alt={task.assignee}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-xs text-cyan-100/70 font-medium">{task.assignee}</span>
                        </div>
                        <div className="flex items-center gap-1 text-cyan-100/50">
                          <Calendar size={12} />
                          <span className="text-[10px] font-semibold">{task.dueDate}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Sidebar - Progress Donut Chart */}
      <div
        className="w-[280px] border-l border-white/10 flex flex-col p-6 gap-6 justify-between shrink-0"
        style={{ background: "rgba(6,22,115,0.88)" }}
      >
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="text-base font-bold text-white" style={{ fontSize: 16 }}>
              Progreso Global
            </h3>
            <p className="text-xs text-cyan-100/70 mt-1">
              Seguimiento del programa clínico actual
            </p>
          </div>

          {/* Donut Chart */}
          <div className="flex flex-col items-center justify-center relative my-4">
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={75}
                  startAngle={90}
                  endAngle={-270}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center justify-center">
              <span className="text-3xl font-extrabold text-[#79AEF2]">74%</span>
              <span className="text-[10px] font-bold text-cyan-100/50 uppercase tracking-wider mt-0.5">Entregables</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 p-4 rounded-xl border shadow-sm" style={{ background: "rgba(13,21,71,0.95)", borderColor: "rgba(255,255,255,0.08)" }}>
            <div className="flex justify-between items-center text-xs">
              <span className="text-cyan-100/70 font-medium">Entregables Listos:</span>
              <span className="font-bold text-white">26 / 35</span>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div className="bg-[#534AB7] h-full rounded-full" style={{ width: "74%" }}></div>
            </div>
            <div className="flex justify-between items-center text-xs mt-1">
              <span className="text-cyan-100/70 font-medium">Días restantes:</span>
              <span className="font-bold text-[#FFB4B4] bg-red-500/15 px-2 py-0.5 rounded">12 días</span>
            </div>
          </div>
        </div>

        {/* Quick project info */}
        <div className="p-4 rounded-xl border flex flex-col gap-2.5" style={{ background: "rgba(238,237,254,0.06)", borderColor: "rgba(83,74,183,0.2)" }}>
          <h4 className="text-xs font-bold text-[#534AB7] uppercase tracking-wider">
            Programa Clínico Activo
          </h4>
          <div className="text-sm font-bold text-white leading-tight">
            Plataforma de gestión clínica para clínicas y hospitales privados
          </div>
          <div className="text-xs text-cyan-100/70">
            Líder: <strong>Ana Martínez</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
