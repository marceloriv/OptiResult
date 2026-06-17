import React from "react";
import { Calendar, ChevronRight, Users, CheckCircle, Clock, AlertCircle } from "lucide-react";

interface GanttTask {
  id: string;
  name: string;
  startWeek: number; // 1 to 4
  durationWeeks: number; // in weeks (e.g. 1, 1.5, 2)
  status: "Completado" | "En Progreso" | "Por Hacer";
  color: string;
  progress: number;
}

const ganttTasks: GanttTask[] = [
  {
    id: "TSK-01",
    name: "Definición del Design System y Guías",
    startWeek: 1,
    durationWeeks: 1,
    status: "Completado",
    color: "#801d9e", // success green
    progress: 100
  },
  {
    id: "TSK-02",
    name: "Prototipado de Pantallas e Iteraciones",
    startWeek: 1.5,
    durationWeeks: 1.2,
    status: "Completado",
    color: "#801ec2", // success green
    progress: 100
  },
  {
    id: "TSK-03",
    name: "Desarrollo de Vistas del Frontend en React",
    startWeek: 2,
    durationWeeks: 1.5,
    status: "En Progreso",
    color: "#d875e6", // primary deep purple
    progress: 60
  },
  {
    id: "TSK-04",
    name: "Integración de Backend y Endpoints de API",
    startWeek: 3,
    durationWeeks: 1,
    status: "Por Hacer",
    color: "#3a3de8", // warning amber
    progress: 0
  },
  {
    id: "TSK-05",
    name: "Control de Calidad (QA) y Pruebas Unitarias",
    startWeek: 3.5,
    durationWeeks: 0.8,
    status: "Por Hacer",
    color: "#ad4fd9", // alert red
    progress: 0
  }
];

const teamMembers = [
  { name: "Ana Martínez", role: "Product Manager", tasksCount: 3, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60" },
  { name: "Carlos López", role: "Frontend Developer", tasksCount: 2, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=60" },
  { name: "Sara Gómez", role: "Backend Developer", tasksCount: 1, avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=60" },
  { name: "Javier Díaz", role: "QA Lead", tasksCount: 2, avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&auto=format&fit=crop&q=60" }
];

export function ProjectGantt() {
  return (
    <div
      className="flex-1 flex overflow-hidden h-full"
      style={{ background: "#5e19df", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Gantt Timeline Area (Left) */}
      <div className="flex-1 flex flex-col p-6 overflow-y-auto gap-6">
        {/* Project Header */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Proyectos</span>
              <ChevronRight size={14} className="text-slate-400" />
              <h1 className="text-xl font-bold text-slate-800" style={{ fontSize: 20 }}>
                Rediseño Plataforma OptiResult v2.0
              </h1>
            </div>
            <span className="text-xs font-bold text-[#534AB7] bg-[#EEEDFE] px-3 py-1 rounded-full border border-[#534AB7]/10">
              En Progreso
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between items-center text-xs text-slate-500 mb-1.5 font-medium">
                <span>Progreso General del Proyecto</span>
                <span className="font-bold text-[#534AB7]">74%</span>
              </div>
              <div className="w-full bg-[#EEEDFE]/40 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#534AB7] h-full rounded-full transition-all duration-500" style={{ width: "74%" }}></div>
              </div>
            </div>
            <div className="shrink-0 flex items-center gap-4 border-l border-slate-100 pl-4 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Fecha Inicio</span>
                <strong className="text-slate-700">01 Jun 2026</strong>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Fecha Fin</span>
                <strong className="text-slate-700">30 Jun 2026</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Chart Container */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800">Diagrama Gantt — Planificación mensual (4 Semanas)</h2>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#1D9E75]"></span>Completado</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#534AB7]"></span>En Progreso</span>
              <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded bg-[#E8C53A]"></span>Por Hacer</span>
            </div>
          </div>

          {/* Timeline Grid */}
          <div className="flex flex-col min-w-[700px]">
            {/* Header row with weeks */}
            <div className="flex border-b border-slate-200 bg-slate-50 text-center font-bold text-xs text-slate-500">
              <div className="w-[240px] px-4 py-3 text-left border-r border-slate-200">Tarea</div>
              <div className="flex-1 grid grid-cols-4">
                <div className="py-3 border-r border-slate-200">Semana 1</div>
                <div className="py-3 border-r border-slate-200">Semana 2</div>
                <div className="py-3 border-r border-slate-200">Semana 3</div>
                <div className="py-3">Semana 4</div>
              </div>
            </div>

            {/* Task Rows */}
            <div className="flex flex-col">
              {ganttTasks.map((task) => (
                <div key={task.id} className="flex border-b border-slate-100 hover:bg-slate-50/40 transition-colors">
                  {/* Task name column */}
                  <div className="w-[240px] px-4 py-5 border-r border-slate-200 flex flex-col justify-center shrink-0">
                    <span className="text-[10px] font-bold text-[#534AB7]">{task.id}</span>
                    <span className="text-xs font-semibold text-slate-800 mt-0.5 leading-snug">{task.name}</span>
                  </div>

                  {/* Visual bar column */}
                  <div className="flex-1 grid grid-cols-4 relative py-6 px-1">
                    {/* Background gridlines */}
                    <div className="absolute inset-y-0 left-0 w-full grid grid-cols-4 pointer-events-none opacity-50">
                      <div className="border-r border-slate-100 h-full"></div>
                      <div className="border-r border-slate-100 h-full"></div>
                      <div className="border-r border-slate-100 h-full"></div>
                      <div className="h-full"></div>
                    </div>

                    {/* Gantt Bar representing task duration */}
                    <div
                      className="absolute h-7 rounded-lg shadow-sm flex items-center justify-between px-3 text-[10px] font-bold text-white transition-all duration-300 hover:scale-[1.01]"
                      style={{
                        left: `${((task.startWeek - 1) / 4) * 100}%`,
                        width: `${(task.durationWeeks / 4) * 100}%`,
                        background: task.color,
                        top: "14px",
                      }}
                    >
                      <span className="truncate pr-1">{task.progress}%</span>
                      {task.status === "Completado" && <CheckCircle size={10} />}
                      {task.status === "En Progreso" && <Clock size={10} />}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Members Right Sidebar Panel */}
      <div
        className="w-[280px] border-l border-slate-100 flex flex-col p-6 gap-6 shrink-0"
        style={{ background: "#3c2494" }}
      >
        <div>
          <h2 className="text-base font-bold text-slate-900" style={{ fontSize: 16 }}>
            Miembros del Equipo
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Asignaciones y carga en este sprint.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="bg-white rounded-xl p-3.5 border border-slate-100 shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{member.name}</h4>
                  <span className="text-[10px] text-slate-400 font-medium">{member.role}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <span className="text-[10px] font-bold text-[#534AB7] bg-[#EEEDFE] px-2 py-0.5 rounded-full">
                  {member.tasksCount} tareas
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
