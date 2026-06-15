import { Plus } from "lucide-react";
import { useState } from "react";

interface TeamMember {
  name: string;
  email: string;
  role: string;
  roleColor: string;
  lastAccess: string;
  status: "Activo" | "Inactivo";
  permissions: string;
  avatar: string;
}

const teamData: TeamMember[] = [
  { name: "Carlos López", email: "carlos@innovatech.cl", role: "Administrador", roleColor: "#534AB7", lastAccess: "Hoy 10:32", status: "Activo", permissions: "Todos los permisos", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=60" },
  { name: "Ana Martínez", email: "ana@innovatech.cl", role: "Líder de Proyecto", roleColor: "#3B82F6", lastAccess: "Hoy 09:15", status: "Activo", permissions: "Proyectos asignados", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60" },
  { name: "María Torres", email: "maria@innovatech.cl", role: "QA Engineer", roleColor: "#F59E0B", lastAccess: "Ayer", status: "Activo", permissions: "Solo lectura + comentarios", avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=80&auto=format&fit=crop&q=60" },
  { name: "David Lee", email: "david@innovatech.cl", role: "DevOps", roleColor: "#6B7280", lastAccess: "Ayer", status: "Activo", permissions: "Infraestructura", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=60" },
  { name: "Sofía Ramos", email: "sofia@innovatech.cl", role: "Diseñadora UX", roleColor: "#10B981", lastAccess: "Hace 3 días", status: "Activo", permissions: "Diseño y assets", avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=80&auto=format&fit=crop&q=60" },
  { name: "Pedro Vega", email: "pedro@innovatech.cl", role: "Developer", roleColor: "#3B82F6", lastAccess: "Hace 5 días", status: "Inactivo", permissions: "Proyectos asignados", avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=80&auto=format&fit=crop&q=60" }
];

const permissionMatrix = [
  { name: "Ver Proyectos", admin: true, leader: true, dev: true, qa: true, read: true },
  { name: "Editar Proyectos", admin: true, leader: true, dev: true, qa: false, read: false },
  { name: "Eliminar Proyectos", admin: true, leader: false, dev: false, qa: false, read: false },
  { name: "Gestionar Recursos", admin: true, leader: true, dev: false, qa: false, read: false },
  { name: "Ver Reportes", admin: true, leader: true, dev: true, qa: true, read: true },
  { name: "Exportar Datos", admin: true, leader: true, dev: false, qa: false, read: false },
  { name: "Administrar Equipo", admin: true, leader: false, dev: false, qa: false, read: false },
  { name: "Configuración del Sistema", admin: true, leader: false, dev: false, qa: false, read: false }
];

export function Configuration() {
  const [activeTab, setActiveTab] = useState("Equipo y Permisos");
  const [team, setTeam] = useState<TeamMember[]>(teamData);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const tabs = [
    "Perfil", "Notificaciones", "Seguridad", "Equipo y Permisos", "Integraciones", "Facturación", "Apariencia"
  ];

  const handleRevoke = (email: string) => {
    if (confirm(`¿Estás seguro de revocar el acceso a ${email}?`)) {
      setTeam(prev => prev.filter(m => m.email !== email));
    }
  };

  return (
    <div
      className="flex-1 flex overflow-hidden h-full"
      style={{ background: "#F8F7FF", fontFamily: "'Inter', sans-serif" }}
      role="main"
      aria-label="Configuración"
    >
      {/* Sub Navigation Vertical Tabs (220px) */}
      <div className={`${isMobile ? "hidden" : ""} w-[220px] border-r border-[#E5E7EB] flex flex-col p-4 gap-1.5 shrink-0`} style={{ background: "#FCFCFE" }} role="navigation" aria-label="Navegación de configuración">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-inset ${activeTab === tab ? "bg-[#EEEDFE] text-[#534AB7]" : "text-slate-500 hover:bg-slate-50"}`}
            style={{ minHeight: "40px" }}
            aria-label={tab}
            aria-current={activeTab === tab ? "true" : undefined}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto flex flex-col gap-6 sm:gap-8 bg-white">
        {/* Title Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <div>
            <h2 className="text-lg sm:text-xl font-extrabold text-[#1A1A2E]">
              Gestión de Equipo
            </h2>
            <p className="text-xs text-[#6B7280] font-medium mt-1">
              Administra los miembros, roles y permisos de acceso a OptiResult.
            </p>
          </div>
          <button className="bg-[#534AB7] hover:bg-[#4339A6] text-white font-bold text-xs px-4 py-2.5 rounded-lg transition-all cursor-pointer shadow-sm flex items-center gap-1.5 focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2" style={{ minHeight: "40px" }} aria-label="Invitar nuevo miembro">
            <Plus size={14} aria-hidden="true" /> Invitar miembro
          </button>
        </div>

        {/* Team Table */}
        <div className="border border-[#E5E7EB] rounded-xl overflow-hidden flex flex-col shadow-xs">
          <div className="overflow-x-auto" role="region" aria-label="Tabla de miembros del equipo" tabIndex={0}>
          <table className="w-full text-left border-collapse" role="table">
            <thead>
              <tr className="bg-[#F8F7FF] border-b border-slate-200">
                <th className="px-4 sm:px-5 py-3 text-xs font-bold text-slate-500 uppercase" scope="col">Miembro</th>
                <th className="px-4 sm:px-5 py-3 text-xs font-bold text-slate-500 uppercase hidden sm:table-cell" scope="col">Rol</th>
                <th className="px-4 sm:px-5 py-3 text-xs font-bold text-slate-500 uppercase hidden sm:table-cell" scope="col">Último acceso</th>
                <th className="px-4 sm:px-5 py-3 text-xs font-bold text-slate-500 uppercase hidden sm:table-cell" scope="col">Estado</th>
                <th className="px-4 sm:px-5 py-3 text-xs font-bold text-slate-500 uppercase hidden sm:table-cell" scope="col">Permisos</th>
                <th className="px-4 sm:px-5 py-3 text-xs font-bold text-slate-500 uppercase text-right" scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {team.map(m => (
                <tr key={m.email} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors text-xs text-slate-700">
                  <td className="px-4 sm:px-5 py-3.5 flex items-center gap-3">
                    <img src={m.avatar} alt="" className="w-8 h-8 rounded-full object-cover" aria-hidden="true" />
                    <div>
                      <span className="font-bold text-slate-800 block">{m.name}</span>
                      <span className="text-[10px] text-slate-400 font-medium">{m.email}</span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-5 py-3.5 hidden sm:table-cell">
                    <span
                      className="text-[10px] font-bold px-2.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${m.roleColor}12`,
                        color: m.roleColor
                      }}
                    >
                      {m.role}
                    </span>
                  </td>
                  <td className="px-4 sm:px-5 py-3.5 font-medium text-slate-500 hidden sm:table-cell">{m.lastAccess}</td>
                  <td className="px-4 sm:px-5 py-3.5 hidden sm:table-cell">
                    <div className="flex items-center gap-1.5 font-bold">
                      <span className={`w-2 h-2 rounded-full ${m.status === "Activo" ? "bg-[#1D9E75]" : "bg-slate-300"}`}></span>
                      <span>{m.status}</span>
                    </div>
                  </td>
                  <td className="px-4 sm:px-5 py-3.5 font-medium text-slate-500 hidden sm:table-cell">{m.permissions}</td>
                  <td className="px-4 sm:px-5 py-3.5 text-right">
                    <div className="flex items-center justify-end gap-2 sm:gap-3 font-bold text-xs">
                      <button className="text-[#534AB7] hover:underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-inset">Editar rol</button>
                      <button
                        onClick={() => handleRevoke(m.email)}
                        className="text-[#D94F4F] hover:underline cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#D94F4F] focus:ring-inset"
                      >
                        Revocar acceso
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        </div>

        {/* Permission Matrix */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="text-base font-bold text-slate-800">Matriz de Roles y Permisos</h3>
            <p className="text-[10px] text-slate-400 mt-0.5">Control granular de acceso por tipo de rol en el sistema</p>
          </div>

          <div className="border border-[#E5E7EB] rounded-xl overflow-hidden flex flex-col shadow-xs">
            <div className="overflow-x-auto" role="region" aria-label="Matriz de roles y permisos" tabIndex={0}>
            <table className="w-full text-center border-collapse" role="table">
              <thead>
                <tr className="bg-[#F8F7FF] border-b border-slate-200 text-xs font-bold text-slate-500">
                  <th className="px-4 sm:px-5 py-3 text-left w-1/3" scope="col">Permiso</th>
                  <th className="px-4 sm:px-5 py-3" scope="col">Administrador</th>
                  <th className="px-4 sm:px-5 py-3 hidden sm:table-cell" scope="col">Líder</th>
                  <th className="px-4 sm:px-5 py-3 hidden sm:table-cell" scope="col">Developer</th>
                  <th className="px-4 sm:px-5 py-3 hidden sm:table-cell" scope="col">QA</th>
                  <th className="px-4 sm:px-5 py-3 hidden sm:table-cell" scope="col">Solo Lectura</th>
                </tr>
              </thead>
              <tbody>
                {permissionMatrix.map(row => (
                  <tr key={row.name} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors text-xs text-slate-700">
                    <td className="px-4 sm:px-5 py-3 text-left font-semibold text-slate-800">{row.name}</td>
                    <td className="px-4 sm:px-5 py-3">{row.admin ? <span className="text-[#1D9E75] font-bold text-sm" aria-label="Permitido">✓</span> : <span className="text-[#D94F4F] font-bold text-sm" aria-label="Denegado">✗</span>}</td>
                    <td className="px-4 sm:px-5 py-3 hidden sm:table-cell">{row.leader ? <span className="text-[#1D9E75] font-bold text-sm" aria-label="Permitido">✓</span> : <span className="text-[#D94F4F] font-bold text-sm" aria-label="Denegado">✗</span>}</td>
                    <td className="px-4 sm:px-5 py-3 hidden sm:table-cell">{row.dev ? <span className="text-[#1D9E75] font-bold text-sm" aria-label="Permitido">✓</span> : <span className="text-[#D94F4F] font-bold text-sm" aria-label="Denegado">✗</span>}</td>
                    <td className="px-4 sm:px-5 py-3 hidden sm:table-cell">{row.qa ? <span className="text-[#1D9E75] font-bold text-sm" aria-label="Permitido">✓</span> : <span className="text-[#D94F4F] font-bold text-sm" aria-label="Denegado">✗</span>}</td>
                    <td className="px-4 sm:px-5 py-3 hidden sm:table-cell">{row.read ? <span className="text-[#1D9E75] font-bold text-sm" aria-label="Permitido">✓</span> : <span className="text-[#D94F4F] font-bold text-sm" aria-label="Denegado">✗</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
