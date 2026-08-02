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
import { Configuration } from "./components/Configuration";
import { Bell, Menu, Search, X } from "lucide-react";

type View =
  | "dashboard"
  | "proyectos"
  | "tablero"
  | "recursos"
  | "comunicacion"
  | "reportes"
  | "analiticas"
  | "configuracion";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const notifications = 3;

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  return (
    <div
      className="flex h-screen overflow-hidden"
      style={{
        background: "#061673",
        color: "#F8FAFC",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      <Sidebar
        activeView={activeView}
        onNavigate={(v) => {
          setActiveView(v as View);
          setMobileMenuOpen(false);
        }}
        onLogout={() => setIsLoggedIn(false)}
        mobileMenuOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <div className="flex flex-col flex-1 overflow-hidden">
        <header
          className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 shrink-0"
          style={{
            borderBottom: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(6,22,115,0.9)",
          }}
        >
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden rounded-xl p-2 bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
              aria-label={mobileMenuOpen ? "Cerrar menú de navegación" : "Abrir menú de navegación"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={18} color="#C7D2FE" /> : <Menu size={18} color="#C7D2FE" />}
            </button>

            <span className="text-xs font-bold text-cyan-100/70 hidden sm:inline">OptiResult</span>
            <span className="text-cyan-100/30 text-xs hidden sm:inline">/</span>
            <span className="text-xs text-[#79AEF2] font-semibold truncate">
              {{"dashboard":"Dashboard Principal","proyectos":"Módulo de Proyectos (Vista Gantt)","tablero":"Tablero Ágil","recursos":"Gestor de Recursos","comunicacion":"Colaboración del Equipo","reportes":"Módulo de Reportes","analiticas":"Analíticas Avanzadas","configuracion":"Configuración del Sistema"}[activeView]}
            </span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            <div
              className="hidden md:flex items-center gap-2 rounded-xl px-3 py-2"
              style={{ background: "rgba(13,21,71,0.9)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <Search size={14} color="#79AEF2" />
              <input
                placeholder="Buscar tareas, proyectos..."
                className="bg-transparent border-none outline-none text-xs text-white placeholder:text-cyan-100/40 w-48"
              />
              <kbd className="text-[10px] text-cyan-100/40 bg-white/5 border border-white/10 rounded px-1.5 py-0.5 font-sans">
                ⌘K
              </kbd>
            </div>

            <button className="relative rounded-xl p-2 bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-colors">
              <Bell size={16} color="#C7D2FE" />
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

            <div className="hidden sm:block w-px h-6 bg-white/10" />

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

        <main className="flex-1 overflow-hidden" style={{ background: "#061673" }}>
          {activeView === "dashboard" && <Dashboard />}
          {activeView === "proyectos" && <ProjectGantt />}
          {activeView === "tablero" && <AgileBoard />}
          {activeView === "recursos" && <ResourceManagement />}
          {activeView === "comunicacion" && <Collaboration />}
          {activeView === "reportes" && <Reports />}
          {activeView === "analiticas" && <AdvancedAnalytics />}
          {activeView === "configuracion" && <Configuration />}
        </main>
      </div>
    </div>
  );
}