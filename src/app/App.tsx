import { Bell, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AdvancedAnalytics } from "./components/AdvancedAnalytics";
import { AgileBoard } from "./components/AgileBoard";
import { Collaboration } from "./components/Collaboration";
import { Dashboard } from "./components/Dashboard";
import { Login } from "./components/Login";
import { ProjectGantt } from "./components/ProjectGantt";
import { Reports } from "./components/Reports";
import { ResourceManagement } from "./components/ResourceManagement";
import { Sidebar } from "./components/Sidebar";

type View =
  | "dashboard"
  | "proyectos"
  | "tablero"
  | "recursos"
  | "comunicacion"
  | "reportes"
  | "analiticas"
  | "configuracion";

const viewTitles: Record<View, string> = {
  dashboard: "Dashboard Principal",
  proyectos: "Módulo de Proyectos (Vista Gantt)",
  tablero: "Tablero Ágil",
  recursos: "Gestor de Recursos",
  comunicacion: "Comunicación del Equipo",
  reportes: "Módulo de Reportes",
  analiticas: "Analíticas Avanzadas",
  configuracion: "Configuración del Sistema",
};

function ConfiguracionView() {
  return (
    <div
      className="flex flex-col p-6 gap-6 h-full overflow-y-auto"
      style={{ background: "#FFFFFF", fontFamily: "'Inter', sans-serif" }}
    >
      <div>
        <h1 className="text-2xl font-bold text-slate-900" style={{ fontSize: 24 }}>
          Configuración del Sistema
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Configura las preferencias de tu espacio de trabajo y cuenta de OptiResult.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col gap-4">
          <h3 className="text-base font-bold text-slate-800">
            Preferencias del Espacio de Trabajo
          </h3>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <label htmlFor="email-notifications" className="text-sm font-semibold text-slate-800 block cursor-pointer">
                  Notificaciones por Email
                </label>
                <span id="email-notifications-desc" className="text-xs text-slate-500">
                  Recibe alertas semanales sobre el estado del sprint.
                </span>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#534AB7]" id="email-notifications" aria-describedby="email-notifications-desc" />
            </div>

            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <label htmlFor="channel-integration" className="text-sm font-semibold text-slate-800 block cursor-pointer">
                  Integración con canales internos
                </label>
                <span id="channel-integration-desc" className="text-xs text-slate-500">
                  Enviar alertas automáticas a canales vinculados.
                </span>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#534AB7]" id="channel-integration" aria-describedby="channel-integration-desc" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label htmlFor="auto-balance" className="text-sm font-semibold text-slate-800 block cursor-pointer">
                  Auto-balancear recursos
                </label>
                <span id="auto-balance-desc" className="text-xs text-slate-500">
                  Sugerir reasignaciones cuando la carga supere el 90%.
                </span>
              </div>
              <input type="checkbox" className="w-4 h-4 accent-[#534AB7]" id="auto-balance" aria-describedby="auto-balance-desc" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col gap-4">
          <h3 className="text-base font-bold text-slate-800">
            Seguridad y Cumplimiento
          </h3>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-sm font-semibold text-slate-800 block">
                  Autenticación de Dos Factores
                </span>
                <span className="text-xs text-slate-500">
                  Protege la cuenta con un código de seguridad adicional.
                </span>
              </div>
              <button className="text-xs font-bold text-[#534AB7] bg-[#EEEDFE] px-3 py-1.5 rounded-lg hover:bg-[#dbdaf9] transition-all">
                Activar
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold text-slate-800 block">
                  Cumplimiento normativo
                </span>
                <span className="text-xs text-slate-500">
                  GDPR, CCPA, Ley 21.719 e ISO/IEC 25010.
                </span>
              </div>
              <button className="text-xs font-bold text-[#534AB7] bg-[#EEEDFE] px-3 py-1.5 rounded-lg hover:bg-[#dbdaf9] transition-all">
                Revisar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const notifications = 3;

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Close mobile menu when view changes
  useEffect(() => {
    if (isMobile) {
      setMobileMenuOpen(false);
    }
  }, [activeView, isMobile]);

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  // Map active view back to sidebar active items ("proyectos-gantt" maps to "proyectos" highlight)
  const sidebarActiveView = activeView === "proyectos-gantt" ? "proyectos" : activeView;

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{
        background: "#FFFFFF",
        color: "#1E1B4B",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Mobile menu overlay */}
      {isMobile && mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu toggle */}
      {isMobile && (
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="fixed top-4 left-4 z-50 rounded-lg p-2 bg-white border border-slate-200 shadow-md focus:outline-none focus:ring-2 focus:ring-[#534AB7]"
          style={{ minHeight: "44px", minWidth: "44px" }}
          aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      )}

      {/* Sidebar navigation */}
      <Sidebar
        activeView={sidebarActiveView}
        onNavigate={(v) => setActiveView(v as View)}
        onLogout={() => setIsLoggedIn(false)}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main app panel */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <header
          className="flex items-center justify-between px-4 sm:px-8 py-3.5 shrink-0 bg-white border-b border-[#E5E7EB] h-16"
          role="banner"
        >
          {/* Breadcrumb Left */}
          <div className="flex items-center gap-2 ml-8 sm:ml-0">
            <span className="text-xs font-bold text-slate-400" aria-hidden="true">OptiResult</span>
            <span className="text-slate-300 text-xs" aria-hidden="true">/</span>
            <span className="text-xs text-[#534AB7] font-extrabold uppercase tracking-wider">
              {viewTitles[activeView]}
            </span>
          </div>

          {/* Search & Actions Right */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div
              className="hidden sm:flex items-center gap-2 rounded-lg px-3 py-1.5 bg-[#F8F7FF] border border-[#E5E7EB] h-9"
            >
              <Search size={14} className="text-slate-400" aria-hidden="true" />
              <input
                type="text"
                placeholder="Buscar proyectos, tareas..."
                className="bg-transparent border-none outline-none text-xs text-slate-800 placeholder-slate-400 w-32 sm:w-48 font-medium"
                aria-label="Buscar proyectos y tareas"
              />
              <kbd className="text-[10px] text-slate-400 bg-white border border-slate-200 rounded px-1.5 py-0.5 font-sans" aria-hidden="true">
                ⌘K
              </kbd>
            </div>

            <button
              className="relative rounded-xl p-2 bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#534AB7]"
              style={{ minHeight: "44px", minWidth: "44px", display: "inline-flex", alignItems: "center", justifyContent: "center" }}
              aria-label={`Notificaciones (${notifications} nuevas)`}
              aria-live="polite"
            >
              <Bell size={16} className="text-slate-500" />
              {notifications > 0 && (
                <span
                  className="absolute rounded-full flex items-center justify-center text-white"
                  style={{
                    width: 14,
                    height: 14,
                    top: -2,
                    right: -2,
                    background: "#D94F4F",
                    fontSize: "8px",
                    fontWeight: 800,
                  }}
                  aria-hidden="true"
                >
                  {notifications}
                </span>
              )}
            </button>

            <div className="hidden sm:block w-px h-5 bg-slate-200" />

            <div className="flex items-center gap-2">
              <button
                className="rounded-full flex items-center justify-center cursor-pointer font-bold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2 hover:opacity-90 transition-opacity"
                style={{
                  width: 32,
                  height: 32,
                  background: "#534AB7",
                  fontSize: "0.78rem",
                  minHeight: "44px",
                  minWidth: "44px",
                }}
                aria-label="Perfil de Carlos López"
              >
                CL
              </button>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-bold text-slate-800">Carlos López</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide">Developer Lead</span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 flex flex-col overflow-hidden bg-white">
          {activeView === "dashboard" && <Dashboard onNavigate={(v) => setActiveView(v as View)} />}
          {activeView === "proyectos" && <ProjectGantt />}
          {activeView === "tablero" && <AgileBoard />}
          {activeView === "recursos" && <ResourceManagement />}
          {activeView === "comunicacion" && <Collaboration />}
          {activeView === "reportes" && <Reports />}
          {activeView === "analiticas" && <AdvancedAnalytics />}
          {activeView === "configuracion" && <ConfiguracionView />}
        </main>
      </div>
    </div>
  );
}
