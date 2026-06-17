import React, { useState } from "react";
import { Users2, AlertCircle, RefreshCw, X, Check, Search, Filter, Plus } from "lucide-react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  projects: string[];
  workload: number; // workload percentage
  status: "Activo" | "Sobrecargado" | "Vacaciones";
  avatar: string;
}

const initialTeam: TeamMember[] = [
  {
    id: "1",
    name: "Ana Martínez",
    role: "Project Manager Salud",
    projects: ["Agendamiento", "Compliance", "HIS"],
    workload: 92,
    status: "Sobrecargado",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60"
  },
  {
    id: "2",
    name: "Carlos López",
    role: "Frontend Developer",
    projects: ["Portal Pacientes", "Telemedicina"],
    workload: 78,
    status: "Activo",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=60"
  },
  {
    id: "3",
    name: "Sara Gómez",
    role: "Backend Developer",
    projects: ["HIS", "Laboratorio"],
    workload: 65,
    status: "Activo",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=60"
  },
  {
    id: "4",
    name: "Luis Vargas",
    role: "DevOps Engineer",
    projects: ["Telemedicina", "HIS"],
    workload: 95,
    status: "Sobrecargado",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=60"
  },
  {
    id: "5",
    name: "María Torres",
    role: "Analista Clínico TI",
    projects: ["Ficha Clínica", "Portal Pacientes"],
    workload: 40,
    status: "Vacaciones",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=60"
  },
  {
    id: "6",
    name: "Javier Díaz",
    role: "QA Healthcare",
    projects: ["Portal Pacientes", "Compliance"],
    workload: 85,
    status: "Activo",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&auto=format&fit=crop&q=60"
  },
  {
    id: "7",
    name: "Pedro Ruiz",
    role: "Especialista Integración HIS",
    projects: ["HIS", "Laboratorio"],
    workload: 74,
    status: "Activo",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=60"
  },
  {
    id: "8",
    name: "Sofía Rojas",
    role: "Encargado Compliance Salud",
    projects: ["Compliance", "Ficha Clínica"],
    workload: 22,
    status: "Vacaciones",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=60"
  }
];

export function ResourceManagement() {
  const [team, setTeam] = useState<TeamMember[]>(initialTeam);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [newWorkload, setNewWorkload] = useState<number>(80);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<"Todos" | "Activos" | "Sobrecargados" | "Vacaciones">("Todos");

  const filteredTeam = team.filter((member) => {
    if (activeFilter === "Todos") return true;
    if (activeFilter === "Activos") return member.status === "Activo";
    if (activeFilter === "Sobrecargados") return member.status === "Sobrecargado" || member.workload > 90;
    return member.status === "Vacaciones";
  });

  // Helper to color code workload
  const getWorkloadColor = (pct: number) => {
    if (pct < 70) return "#641d9e"; // Green success state
    if (pct <= 90) return "#e41bc9"; // Amber warning state
    return "#644fd9"; // Red alert state
  };

  const getWorkloadLabel = (pct: number) => {
    if (pct < 70) return "Óptimo";
    if (pct <= 90) return "Cercano al Límite";
    return "Sobrecargado";
  };

  const handleReassignSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) return;

    setTeam(prev =>
      prev.map(m => (m.id === selectedMember.id ? { ...m, workload: newWorkload } : m))
    );

    setToastMessage(`Capacidad de ${selectedMember.name} reasignada con éxito a ${newWorkload}%`);
    setSelectedMember(null);

    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  return (
    <div
      className="flex-1 flex flex-col overflow-y-auto p-6 gap-6"
      style={{ background: "#061673", fontFamily: "'Inter', sans-serif" }}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-[#534AB7] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 animate-fade-in border border-white/20">
          <Check size={16} />
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white" style={{ fontSize: 24 }}>
            Módulo de Recursos
          </h1>
          <p className="text-sm text-cyan-100/70 mt-1">
            Visualiza la capacidad del equipo TI/salud para optimizar asignaciones clínicas y operativas.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg px-3 py-1.5" style={{ background: "rgba(13,21,71,0.9)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <Search size={14} color="#79AEF2" />
            <input
              placeholder="Buscar rol o miembro..."
              className="bg-transparent border-none outline-none text-xs text-white placeholder:text-cyan-100/40 w-44"
            />
          </div>
          <button className="flex items-center gap-2 bg-[#534AB7] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-[#4339A6] transition-all">
            <Users2 size={14} />
            Añadir Miembro
          </button>
          <button className="flex items-center gap-2 bg-white/5 text-white px-3 py-1.5 rounded-lg text-xs font-semibold border border-white/10 hover:bg-white/10 transition-all">
            <Plus size={14} />
            Filtros
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {(["Todos", "Activos", "Sobrecargados", "Vacaciones"] as const).map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className="px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5"
            style={{
              background: activeFilter === filter ? "#534AB7" : "rgba(13,21,71,0.7)",
              color: activeFilter === filter ? "#FFFFFF" : "#C7D2FE",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <Filter size={12} />
            {filter}
          </button>
        ))}
      </div>

      {/* Full-width team capacity view: Horizontal bar chart */}
      <div className="rounded-xl p-6 border shadow-sm flex flex-col gap-5" style={{ background: "rgba(13,21,71,0.9)", borderColor: "rgba(255,255,255,0.08)" }}>
        <div>
          <h2 className="text-base font-bold text-white" style={{ fontSize: 18 }}>
            Capacidad del Equipo en Tiempo Real
          </h2>
          <p className="text-xs text-cyan-100/60 mt-0.5">
            Porcentaje de carga asignada por proyecto clínico y soporte operativo.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          {filteredTeam.map((member) => {
            const barColor = member.status === "Vacaciones" ? "#79AEF2" : getWorkloadColor(member.workload);
            return (
              <div key={member.id} className="flex items-center gap-4">
                {/* Member Info Label */}
                <div className="w-[180px] flex items-center gap-2 shrink-0">
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div>
                    <div className="text-xs font-bold text-white">{member.name}</div>
                    <div className="text-[10px] text-cyan-100/60 font-medium">{member.role}</div>
                  </div>
                </div>

                {/* Progress Bar Container */}
                <div className="flex-1 bg-[#EEEDFE]/10 h-5 rounded-full relative overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500 ease-out"
                    style={{
                      width: `${member.workload}%`,
                      background: barColor,
                    }}
                  ></div>
                  <span className="absolute inset-y-0 right-3 flex items-center text-[10px] font-extrabold text-white">
                    {member.workload}%
                  </span>
                </div>

                {/* Status indicator */}
                <div className="w-[100px] shrink-0 text-right">
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      background: `${barColor}15`,
                      color: barColor,
                    }}
                  >
                    {getWorkloadLabel(member.workload)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 border-t border-white/10 pt-4 mt-2 justify-end flex-wrap">
          <div className="flex items-center gap-1.5 text-xs text-cyan-100/60">
            <span className="w-3 h-3 rounded-full" style={{ background: "#1D9E75" }}></span>
            <span>Óptimo (&lt;70%)</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-cyan-100/60">
            <span className="w-3 h-3 rounded-full" style={{ background: "#E8C53A" }}></span>
            <span>Estable (70-90%)</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-cyan-100/60">
            <span className="w-3 h-3 rounded-full" style={{ background: "#D94F4F" }}></span>
            <span>Sobrecargado (&gt;90%)</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-cyan-100/60">
            <span className="w-3 h-3 rounded-full" style={{ background: "#79AEF2" }}></span>
            <span>Vacaciones</span>
          </div>
        </div>
      </div>

      {/* Resource Table */}
      <div className="rounded-xl border shadow-sm overflow-hidden flex flex-col" style={{ background: "rgba(13,21,71,0.9)", borderColor: "rgba(255,255,255,0.08)" }}>
        <div className="px-6 py-4 border-b border-white/10">
          <h2 className="text-base font-bold text-white" style={{ fontSize: 18 }}>
            Listado Detallado de Asignaciones
          </h2>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10" style={{ background: "rgba(255,255,255,0.03)" }}>
              <th className="px-6 py-3.5 text-xs font-bold text-cyan-100/60 uppercase tracking-wider">Nombre</th>
              <th className="px-6 py-3.5 text-xs font-bold text-cyan-100/60 uppercase tracking-wider">Rol</th>
              <th className="px-6 py-3.5 text-xs font-bold text-cyan-100/60 uppercase tracking-wider">Proyectos Asignados</th>
              <th className="px-6 py-3.5 text-xs font-bold text-cyan-100/60 uppercase tracking-wider">Carga (%)</th>
              <th className="px-6 py-3.5 text-xs font-bold text-cyan-100/60 uppercase tracking-wider">Estado</th>
              <th className="px-6 py-3.5 text-xs font-bold text-cyan-100/60 uppercase tracking-wider text-right">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredTeam.map((member) => {
              const barColor = member.status === "Vacaciones" ? "#79AEF2" : getWorkloadColor(member.workload);
              return (
                <tr key={member.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <span className="text-sm font-semibold text-white">{member.name}</span>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-cyan-100/60">{member.role}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {member.projects.map((p) => (
                        <span
                          key={p}
                          className="text-[10px] font-bold px-2 py-0.5 rounded"
                          style={{ background: "rgba(83,74,183,0.2)", color: "#EEEDFE" }}
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white">{member.workload}%</span>
                      <div className="w-16 bg-white/10 h-1.5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${member.workload}%`, background: barColor }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                      style={{
                        background: `${barColor}12`,
                        color: barColor,
                      }}
                    >
                      {member.status === "Vacaciones" ? "Vacaciones" : getWorkloadLabel(member.workload)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => {
                        setSelectedMember(member);
                        setNewWorkload(member.workload);
                      }}
                      className="flex items-center gap-1.5 ml-auto text-xs font-bold text-[#EEEDFE] bg-[#534AB7] px-3.5 py-1.5 rounded-lg hover:bg-[#4339A6] transition-all cursor-pointer"
                    >
                      <RefreshCw size={12} />
                      Reasignar
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Reassign Simulation Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-[440px] rounded-2xl p-6 shadow-2xl border animate-scale-in" style={{ background: "#0D1547", borderColor: "rgba(255,255,255,0.08)" }}>
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users2 size={18} className="text-[#534AB7]" />
                Reasignar Capacidad
              </h3>
              <button
                onClick={() => setSelectedMember(null)}
                className="text-cyan-100/60 hover:text-white rounded-lg p-1"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleReassignSubmit} className="flex flex-col gap-4">
              <div className="flex items-center gap-3 p-3 rounded-xl border" style={{ background: "rgba(238,237,254,0.06)", borderColor: "rgba(255,255,255,0.08)" }}>
                <img
                  src={selectedMember.avatar}
                  alt={selectedMember.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="text-sm font-bold text-white">{selectedMember.name}</div>
                  <div className="text-xs text-cyan-100/60">{selectedMember.role}</div>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-cyan-100/60 uppercase tracking-wider">
                  Porcentaje de Carga de Trabajo
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="10"
                    max="150"
                    step="5"
                    value={newWorkload}
                    onChange={(e) => setNewWorkload(parseInt(e.target.value))}
                    className="flex-1 accent-[#534AB7] h-2 bg-white/10 rounded-lg cursor-pointer"
                  />
                  <span
                    className="text-sm font-extrabold w-12 text-center py-1 rounded border font-mono"
                    style={{
                      borderColor: getWorkloadColor(newWorkload),
                      background: `${getWorkloadColor(newWorkload)}10`,
                      color: getWorkloadColor(newWorkload),
                    }}
                  >
                    {newWorkload}%
                  </span>
                </div>
                <div className="text-[10px] text-cyan-100/50 mt-0.5">
                  Ajusta la carga simulada para liberar tareas o reasignar responsabilidades a otros miembros del equipo.
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 border-t border-white/10 pt-4 mt-2">
                <button
                  type="button"
                  onClick={() => setSelectedMember(null)}
                  className="px-4 py-2 text-xs font-bold text-cyan-100/60 hover:bg-white/5 rounded-lg"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-bold bg-[#534AB7] text-white hover:bg-[#4339A6] rounded-lg transition-all shadow-sm"
                >
                  Guardar Reasignación
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
