import { AlertTriangle, Check, FileDown, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  load: number;
  projectsCount: number;
  mainProject: string;
  assignedHours: number;
  availableHours: number;
  avatar: string;
}

const teamList: TeamMember[] = [
  { id: "1", name: "Carlos López", role: "Dev Full-Stack", load: 95, projectsCount: 4, mainProject: "Sistema Hospitalario", assignedHours: 38, availableHours: 40, avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=60" },
  { id: "2", name: "Ana Martínez", role: "Arquitecta SW", load: 88, projectsCount: 3, mainProject: "Sistema Hospitalario", assignedHours: 35, availableHours: 40, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60" },
  { id: "3", name: "María Torres", role: "QA Engineer", load: 72, projectsCount: 3, mainProject: "Portal eLearning", assignedHours: 29, availableHours: 40, avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=60" },
  { id: "4", name: "David Lee", role: "DevOps", load: 65, projectsCount: 2, mainProject: "Migración Cloud AWS", assignedHours: 26, availableHours: 40, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=60" },
  { id: "5", name: "Sofía Ramos", role: "UX Designer", load: 58, projectsCount: 2, mainProject: "Sistema Hospitalario", assignedHours: 23, availableHours: 40, avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&auto=format&fit=crop&q=60" },
  { id: "6", name: "Pedro Vega", role: "Dev Backend", load: 90, projectsCount: 4, mainProject: "App Finanzas", assignedHours: 36, availableHours: 40, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&auto=format&fit=crop&q=60" },
  { id: "7", name: "Laura Díaz", role: "Dev Frontend", load: 45, projectsCount: 2, mainProject: "Portal eLearning", assignedHours: 18, availableHours: 40, avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=80&auto=format&fit=crop&q=60" },
  { id: "8", name: "Tomás Silva", role: "PM", load: 80, projectsCount: 5, mainProject: "App Finanzas", assignedHours: 32, availableHours: 40, avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=80&auto=format&fit=crop&q=60" }
];

const availableResources = [
  { name: "Lucía Gómez", role: "Developer Junior", skills: ["React", "Tailwind"], avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&auto=format&fit=crop&q=60" },
  { name: "Javier Díaz", role: "QA Analyst", skills: ["Cypress", "Jest"], avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&auto=format&fit=crop&q=60" },
  { name: "Andrés Merlín", role: "SysAdmin", skills: ["AWS", "Terraform"], avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=60" },
  { name: "Elena Varas", role: "UI Designer", skills: ["Figma", "Illustrator"], avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60" }
];

export function ResourceManagement() {
  const [team, setTeam] = useState<TeamMember[]>(teamList);
  const [period, setPeriod] = useState("Esta semana");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getLoadColor = (pct: number) => {
    if (pct < 70) return "#1D9E75"; // Green
    if (pct < 90) return "#E8C53A"; // Amber
    return "#D94F4F"; // Red
  };

  const getLoadLabel = (pct: number) => {
    if (pct >= 90) return "Sobrecargado";
    if (pct >= 75) return "Alta carga";
    return "Estable";
  };

  const handleAssign = (name: string) => {
    setToastMessage(`Recurso ${name} pre-asignado al pool del proyecto.`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  return (
    <div
      className="flex-1 flex flex-col lg:flex-row overflow-hidden h-full"
      style={{ background: "#F8F7FF", fontFamily: "'Inter', sans-serif" }}
      role="main"
      aria-label="Gestión de recursos"
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-50 bg-[#534AB7] text-white px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 border border-white/20 animate-fade-in text-xs font-bold" role="alert" aria-live="polite">
          <Check size={16} aria-hidden="true" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Content (Left) */}
      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:p-8 overflow-y-auto gap-4 sm:gap-6">
        {/* Page Header */}
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#1A1A2E]">
            Gestión de Recursos
          </h1>
          <p className="text-sm text-slate-500 mt-1 font-medium">
            Monitorea la carga de trabajo y disponibilidad de tu equipo en tiempo real.
          </p>
        </div>

        {/* Filter Row */}
        <div className="bg-white rounded-xl border p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4" style={{ borderColor: "#E5E7EB" }} role="toolbar" aria-label="Filtros de recursos">
          <div className="flex items-center gap-2 flex-wrap">
            {["Esta semana", "Este mes", "Personalizado"].map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2 ${period === p ? "bg-[#EEEDFE] text-[#534AB7]" : "bg-slate-50 text-slate-500 hover:bg-slate-100"}`}
                style={{ minHeight: "36px" }}
                aria-label={`Filtrar por ${p}`}
                aria-pressed={period === p}
              >
                {p}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <select
              className="bg-white border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 outline-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7]"
              style={{ minHeight: "36px" }}
              aria-label="Filtrar por proyecto"
            >
              <option>Todos los proyectos</option>
              <option>Sistema Hospitalario</option>
              <option>App Finanzas</option>
            </select>
            <select
              className="bg-white border border-[#E5E7EB] rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-600 outline-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7]"
              style={{ minHeight: "36px" }}
              aria-label="Filtrar por rol"
            >
              <option>Todos los roles</option>
              <option>Desarrolladores</option>
              <option>QA</option>
              <option>PM</option>
            </select>
            <button
              className="flex items-center gap-1.5 bg-white border border-[#E5E7EB] rounded-lg px-3.5 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-50 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2"
              style={{ minHeight: "36px" }}
              aria-label="Exportar reporte"
            >
              <FileDown size={14} aria-hidden="true" />
              Exportar reporte
            </button>
          </div>
        </div>

        {/* Capacity Cards Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="bg-white rounded-xl p-5 border flex flex-col gap-2" style={{ borderColor: "#E5E7EB" }}>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Capacidad Total</span>
            <div className="flex items-baseline gap-1.5">
              <strong className="text-2xl font-extrabold text-[#1A1A2E]">22 personas</strong>
            </div>
            <span className="text-[10px] text-slate-400 font-bold">880 horas disponibles esta semana</span>
          </div>

          <div className="bg-white rounded-xl p-5 border flex flex-col gap-2" style={{ borderColor: "#E5E7EB" }}>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Capacidad Utilizada</span>
            <div className="flex items-baseline gap-1.5">
              <strong className="text-2xl font-extrabold text-[#534AB7]">18 personas</strong>
              <span className="text-sm font-extrabold text-[#534AB7] bg-[#EEEDFE] px-2 py-0.5 rounded-full">73%</span>
            </div>
            <span className="text-[10px] text-slate-400 font-bold">642 horas asignadas</span>
          </div>

          <div className="bg-white rounded-xl p-5 border border-red-100 bg-red-50/20 flex flex-col gap-2">
            <span className="text-xs font-bold text-red-500 uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle size={14} />
              Sobrecargados
            </span>
            <div className="flex items-baseline gap-1.5">
              <strong className="text-2xl font-extrabold text-[#D94F4F]">3 personas</strong>
            </div>
            <span className="text-[10px] text-red-400 font-bold">Requieren reasignación inmediata</span>
          </div>
        </div>

        {/* Capacity horizontal bar chart */}
        <div className="bg-white rounded-xl p-4 sm:p-6 border border-[#E5E7EB] shadow-xs flex flex-col gap-4 sm:gap-5">
          <h3 className="text-base font-bold text-slate-800">Carga Horaria Semanal</h3>
          <div className="flex flex-col gap-4">
            {team.map((m) => {
              const barColor = getLoadColor(m.load);
              const label = getLoadLabel(m.load);
              return (
                <div key={m.id} className="flex items-center gap-3 sm:gap-4">
                  {/* Name Circle / Role */}
                  <div className="w-[140px] sm:w-[180px] flex items-center gap-2.5 shrink-0">
                    <img src={m.avatar} alt="" className="w-8 h-8 rounded-full object-cover" aria-hidden="true" />
                    <div className="truncate">
                      <span className="text-xs font-bold text-slate-800 block truncate">{m.name}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{m.role}</span>
                    </div>
                  </div>

                  {/* Horizontal Bar */}
                  <div className="flex-1 bg-slate-100 h-5 rounded-full relative overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500 ease-out"
                      style={{
                        width: `${Math.min(m.load, 100)}%`,
                        backgroundColor: barColor,
                      }}
                    ></div>
                    <span className="absolute inset-y-0 right-3 flex items-center text-[10px] font-extrabold text-slate-700">
                      {m.load}%
                    </span>
                  </div>

                  {/* Stats & Badge */}
                  <div className="w-[140px] sm:w-[180px] shrink-0 flex items-center justify-between text-right pl-2 sm:pl-4">
                    <span className="text-xs font-semibold text-slate-500">{m.projectsCount} proyectos</span>
                    <span
                      className="text-[9px] font-bold px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${barColor}15`,
                        color: barColor
                      }}
                    >
                      {label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Resource Allocation Table */}
        <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-xs overflow-hidden flex flex-col">
          <div className="px-5 py-4 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-800">Tabla de Asignaciones y Horas</h3>
          </div>
          <div className="overflow-x-auto" role="region" aria-label="Tabla de asignaciones de recursos" tabIndex={0}>
          <table className="w-full text-left border-collapse" role="table">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 sm:px-5 py-3 text-xs font-bold text-slate-500 uppercase" scope="col">Nombre</th>
                <th className="px-4 sm:px-5 py-3 text-xs font-bold text-slate-500 uppercase" scope="col">Rol</th>
                <th className="px-4 sm:px-5 py-3 text-xs font-bold text-slate-500 uppercase hidden sm:table-cell" scope="col">Proyecto Principal</th>
                <th className="px-4 sm:px-5 py-3 text-xs font-bold text-slate-500 uppercase" scope="col">Asignadas / Disponibles</th>
                <th className="px-4 sm:px-5 py-3 text-xs font-bold text-slate-500 uppercase" scope="col">Carga</th>
                <th className="px-4 sm:px-5 py-3 text-xs font-bold text-slate-500 uppercase text-right" scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {team.map((m) => {
                const barColor = getLoadColor(m.load);
                return (
                  <tr key={m.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <td className="px-4 sm:px-5 py-3.5 flex items-center gap-3">
                      <img src={m.avatar} alt="" className="w-8 h-8 rounded-full object-cover" aria-hidden="true" />
                      <span className="text-xs font-bold text-slate-800">{m.name}</span>
                    </td>
                    <td className="px-4 sm:px-5 py-3.5 text-xs font-medium text-slate-400">{m.role}</td>
                    <td className="px-4 sm:px-5 py-3.5 text-xs font-semibold text-slate-600 hidden sm:table-cell">{m.mainProject}</td>
                    <td className="px-4 sm:px-5 py-3.5 text-xs font-semibold text-slate-600">
                      {m.assignedHours}h / {m.availableHours}h
                    </td>
                    <td className="px-4 sm:px-5 py-3.5 text-xs font-extrabold" style={{ color: barColor }}>
                      {m.load}%
                    </td>
                    <td className="px-4 sm:px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            setTeam(prev => prev.map(x => x.id === m.id ? { ...x, load: Math.max(x.load - 15, 40) } : x));
                            handleAssign(m.name);
                          }}
                          className="text-xs font-bold text-[#534AB7] bg-[#EEEDFE] px-3.5 py-1.5 rounded-lg hover:bg-[#dbdaf9] transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2"
                          style={{ minHeight: "32px" }}
                          aria-label={`Reasignar a ${m.name}`}
                        >
                          Reasignar
                        </button>
                        <button
                          className="p-2 text-slate-400 hover:text-slate-600 rounded focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2"
                          style={{ minHeight: "32px", minWidth: "32px" }}
                          aria-label="Más opciones"
                        >
                          <MoreHorizontal size={14} aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Available Resources (300px) */}
      <div
        className="w-full lg:w-[300px] border-l border-slate-100 flex flex-col p-4 sm:p-6 gap-4 sm:gap-6 shrink-0 order-2 lg:order-1"
        style={{ background: "#FCFCFE" }}
        role="complementary"
        aria-label="Recursos disponibles"
      >
        <div>
          <h3 className="text-base font-bold text-slate-900" style={{ fontSize: 16 }}>
            Recursos Disponibles
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Miembros sin asignación activa esta semana.
          </p>
        </div>

        <div className="flex flex-col gap-4 overflow-y-auto">
          {availableResources.map((res) => (
            <div key={res.name} className="bg-white rounded-xl p-4 border border-slate-100 shadow-sm flex flex-col gap-3">
              <div className="flex items-center gap-2.5">
                <img src={res.avatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                <div>
                  <h4 className="text-xs font-bold text-slate-800">{res.name}</h4>
                  <span className="text-[10px] text-slate-400 font-medium">{res.role}</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-1">
                {res.skills.map(s => (
                  <span key={s} className="bg-slate-100 text-[#6B7280] text-[9px] font-bold px-2 py-0.5 rounded-full">
                    {s}
                  </span>
                ))}
              </div>
              <button
                onClick={() => handleAssign(res.name)}
                className="w-full bg-[#1D9E75] hover:bg-[#15805d] text-white text-[10px] font-bold py-1.5 rounded-lg transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2"
                style={{ minHeight: "36px" }}
                aria-label={`Asignar a ${res.name}`}
              >
                + Asignar
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
