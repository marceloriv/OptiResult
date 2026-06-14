import { useState } from "react";
import {
  LayoutDashboard,
  FolderKanban,
  KanbanSquare,
  Users,
  MessageSquare,
  BarChart3,
  LineChart,
  Settings,
  LogOut,
  Zap,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "proyectos", label: "Proyectos", icon: FolderKanban },
  { id: "tablero", label: "Tablero Ágil", icon: KanbanSquare },
  { id: "recursos", label: "Recursos", icon: Users },
  { id: "comunicacion", label: "Comunicación", icon: MessageSquare },
  { id: "reportes", label: "Reportes", icon: BarChart3 },
  { id: "analiticas", label: "Analíticas Avanzadas", icon: LineChart },
  { id: "configuracion", label: "Configuración", icon: Settings },
];

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export function Sidebar({ activeView, onNavigate, onLogout }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className="flex flex-col h-screen transition-all duration-300 relative"
      style={{
        width: collapsed ? "64px" : "240px",
        background: "var(--sidebar)",
        borderRight: "1px solid var(--sidebar-border)",
        flexShrink: 0,
      }}
    >
      <div
        className="flex items-center gap-3 px-4 py-5"
        style={{ borderBottom: "1px solid var(--sidebar-border)" }}
      >
        <div
          className="flex items-center justify-center rounded-xl shrink-0"
          style={{
            width: 36,
            height: 36,
            background: "var(--primary)",
            boxShadow: "0 4px 12px rgba(83, 74, 183, 0.3)",
          }}
        >
          <Zap size={18} color="#FFFFFF" strokeWidth={2.5} fill="#FFFFFF" />
        </div>

        {!collapsed && (
          <div>
            <div
              style={{
                color: "#FFFFFF",
                fontWeight: 800,
                fontSize: "1.05rem",
                letterSpacing: "-0.01em",
                lineHeight: 1.1,
              }}
            >
              OptiResult
            </div>
            <div
              style={{
                color: "rgba(238, 237, 254, 0.6)",
                fontSize: "0.68rem",
                letterSpacing: "0.05em",
                fontWeight: 500,
              }}
            >
              Project Management
            </div>
          </div>
        )}
      </div>

      <nav className="flex-1 py-6 px-3 flex flex-col gap-1.5">
        {navItems.map(({ id, label, icon: Icon }) => {
          const active = activeView === id;

          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              title={collapsed ? label : undefined}
              className="flex items-center gap-3 rounded-xl px-3.5 py-3 w-full text-left transition-all duration-150"
              style={{
                background: active ? "rgba(83, 74, 183, 0.15)" : "transparent",
                color: active ? "#FFFFFF" : "rgba(238, 237, 254, 0.65)",
                borderLeft: active ? "3px solid #FFFFFF" : "3px solid transparent",
                cursor: "pointer",
              }}
            >
              <Icon
                size={18}
                strokeWidth={active ? 2.5 : 1.8}
                style={{
                  color: active ? "#FFFFFF" : "rgba(238, 237, 254, 0.65)",
                }}
              />

              {!collapsed && (
                <span style={{ fontSize: "0.88rem", fontWeight: active ? 600 : 500 }}>
                  {label}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div
        className="px-3 pb-6 flex flex-col gap-1.5"
        style={{ borderTop: "1px solid var(--sidebar-border)", paddingTop: "1rem" }}
      >
        <button
          onClick={onLogout}
          className="flex items-center gap-3 rounded-xl px-3.5 py-3 w-full text-left transition-all duration-150 text-red-400 hover:bg-red-500/10"
          style={{ cursor: "pointer" }}
          title={collapsed ? "Cerrar sesión" : undefined}
        >
          <LogOut size={18} strokeWidth={1.8} />
          {!collapsed && (
            <span style={{ fontSize: "0.88rem", fontWeight: 500 }}>
              Cerrar sesión
            </span>
          )}
        </button>

        <div
          className="flex items-center gap-3 px-3 py-2.5 mt-2 rounded-xl"
          style={{
            background: "rgba(238, 237, 254, 0.08)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <div
            className="rounded-full shrink-0 flex items-center justify-center font-bold"
            style={{
              width: 32,
              height: 32,
              background: "var(--primary)",
              color: "#FFFFFF",
              fontSize: "0.78rem",
            }}
          >
            AM
          </div>

          {!collapsed && (
            <div>
              <div
                style={{
                  color: "#FFFFFF",
                  fontSize: "0.82rem",
                  fontWeight: 600,
                  lineHeight: 1.2,
                }}
              >
                Ana Martínez
              </div>
              <div style={{ color: "rgba(238, 237, 254, 0.5)", fontSize: "0.68rem" }}>
                Project Manager
              </div>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute top-5 -right-3 rounded-full flex items-center justify-center transition-colors"
        style={{
          width: 22,
          height: 22,
          background: "var(--sidebar)",
          border: "1px solid var(--sidebar-border)",
          color: "var(--muted-foreground)",
          cursor: "pointer",
          zIndex: 10,
        }}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </aside>
  );
}