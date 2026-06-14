import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Dashboard } from "./components/Dashboard";
import { ResourceManagement } from "./components/ResourceManagement";
import { ProjectGantt } from "./components/ProjectGantt";
import { Reports } from "./components/Reports";
import { Collaboration } from "./components/Collaboration";
import { Login } from "./components/Login";
import { AgileBoard } from "./components/AgileBoard";
import { AdvancedAnalytics } from "./components/AdvancedAnalytics";
import { Bell, Search } from "lucide-react";

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

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm flex flex-col gap-4">
          <h3 className="text-base font-bold text-slate-800">
            Preferencias del Espacio de Trabajo
          </h3>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-sm font-semibold text-slate-800 block">
                  Notificaciones por Email
                </span>
                <span className="text-xs text-slate-500">
                  Recibe alertas semanales sobre el estado del sprint.
                </span>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#534AB7]" />
            </div>

            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-sm font-semibold text-slate-800 block">
                  Integración con canales internos
                </span>
                <span className="text-xs text-slate-500">
                  Enviar alertas automáticas a canales vinculados.
                </span>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#534AB7]" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold text-slate-800 block">
                  Auto-balancear recursos
                </span>
                <span className="text-xs text-slate-500">
                  Sugerir reasignaciones cuando la carga supere el 90%.
                </span>
              </div>
              <input type="checkbox" className="w-4 h-4 accent-[#534AB7]" />
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
  const notifications = 3;

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{
        background: "#FFFFFF",
        color: "#1E1B4B",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <Sidebar
        activeView={activeView}
        onNavigate={(v) => setActiveView(v as View)}
        onLogout={() => setIsLoggedIn(false)}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <header
          className="flex items-center justify-between px-6 py-4 shrink-0"
          style={{
            borderBottom: "1px solid #E2E8F0",
            background: "#FFFFFF",
          }}
        >
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">OptiResult</span>
            <span className="text-slate-300 text-xs">/</span>
            <span className="text-xs text-[#534AB7] font-semibold">
              {viewTitles[activeView]}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div
              className="flex items-center gap-2 rounded-xl px-3 py-2"
              style={{ background: "#F8FAFC", border: "1px solid #E2E8F0" }}
            >
              <Search size={14} className="text-slate-400" />
              <input
                placeholder="Buscar tareas, proyectos..."
                className="bg-transparent border-none outline-none text-xs text-slate-800 placeholder-slate-400 w-48"
              />
              <kbd className="text-[10px] text-slate-400 bg-white border border-slate-200 rounded px-1.5 py-0.5 font-sans">
                ⌘K
              </kbd>
            </div>

            <button className="relative rounded-xl p-2 bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100 transition-colors">
              <Bell size={16} className="text-slate-500" />
              {notifications > 0 && (
                <span
                  className="absolute rounded-full flex items-center justify-center text-white"
                  style={{
                    width: 16,
                    height: 16,
                    top: -4,
                    right: -4,
                    background: "#D94F4F",
                    fontSize: "9px",
                    fontWeight: 700,
                  }}
                >
                  {notifications}
                </span>
              )}
            </button>

            <div className="w-px h-6 bg-slate-200" />

            <div className="flex items-center gap-2">
              <div
                className="rounded-full flex items-center justify-center cursor-pointer font-bold text-white shadow-sm"
                style={{
                  width: 32,
                  height: 32,
                  background: "#534AB7",
                  fontSize: "0.78rem",
                }}
              >
                AM
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-hidden bg-white">
          {activeView === "dashboard" && <Dashboard />}
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