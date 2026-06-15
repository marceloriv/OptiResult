import { useEffect, useState } from "react";
import {
    AlertTriangle,
    Brain,
    CheckCircle2,
    Clock,
    Lightbulb,
    LineChart as LineChartIcon,
    TrendingUp,
    Users,
} from "lucide-react";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const efficiencyData = [
  { week: "Sem 1", eficiencia: 72, riesgo: 46 },
  { week: "Sem 2", eficiencia: 76, riesgo: 42 },
  { week: "Sem 3", eficiencia: 81, riesgo: 35 },
  { week: "Sem 4", eficiencia: 84, riesgo: 29 },
];

const projectRiskData = [
  { name: "Health Platform", riesgo: 78 },
  { name: "Financial App", riesgo: 54 },
  { name: "Learning Platform", riesgo: 72 },
  { name: "EduCloud", riesgo: 28 },
];

const workloadData = [
  { team: "Backend", carga: 82 },
  { team: "Frontend", carga: 76 },
  { team: "QA", carga: 95 },
  { team: "DevOps", carga: 88 },
  { team: "UX/UI", carga: 61 },
];

const alerts = [
  {
    title: "Proyecto Health Platform con riesgo alto",
    description: "Presenta 3 tareas críticas bloqueadas hace más de 5 días.",
    level: "Crítico",
  },
  {
    title: "Equipo QA sobrecargado",
    description: "La carga semanal llegó al 95%, superando el umbral recomendado.",
    level: "Alto",
  },
  {
    title: "Sprint actual bajo lo esperado",
    description: "El avance está 18% por debajo de la planificación inicial.",
    level: "Medio",
  },
];

const recommendations = [
  "Redistribuir 2 tareas del equipo QA hacia Backend.",
  "Priorizar tareas bloqueadas del proyecto Health Platform.",
  "Asignar recursos subutilizados al proyecto Learning Platform.",
  "Programar reunión de seguimiento para proyectos con avance menor al 70%.",
];

const projectTable = [
  {
    project: "Health Platform",
    progress: "62%",
    risk: "Alto",
    cause: "QA sobrecargado",
    action: "Redistribuir tareas",
  },
  {
    project: "Financial App",
    progress: "74%",
    risk: "Medio",
    cause: "Tareas bloqueadas",
    action: "Priorizar revisión",
  },
  {
    project: "Learning Platform",
    progress: "58%",
    risk: "Alto",
    cause: "Comunicación deficiente",
    action: "Reunión de seguimiento",
  },
  {
    project: "EduCloud",
    progress: "81%",
    risk: "Bajo",
    cause: "Sin alertas críticas",
    action: "Mantener planificación",
  },
];

function KpiCard({
  title,
  value,
  description,
  icon: Icon,
  tone,
}: {
  title: string;
  value: string;
  description: string;
  icon: React.ElementType;
  tone: "purple" | "red" | "green" | "orange";
}) {
  const colors = {
    purple: { bg: "#EEEDFE", text: "#534AB7" },
    red: { bg: "#FEE2E2", text: "#B91C1C" },
    green: { bg: "#DCFCE7", text: "#15803D" },
    orange: { bg: "#FFEDD5", text: "#C2410C" },
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 flex items-start justify-between">
      <div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">
          {title}
        </p>
        <h3 className="text-3xl font-extrabold text-slate-900 mt-2">{value}</h3>
        <p className="text-xs text-slate-500 mt-1">{description}</p>
      </div>

      <div
        className="rounded-xl flex items-center justify-center"
        style={{
          width: 42,
          height: 42,
          background: colors[tone].bg,
          color: colors[tone].text,
        }}
      >
        <Icon size={20} />
      </div>
    </div>
  );
}

function RiskBadge({ risk }: { risk: string }) {
  const styles =
    risk === "Alto"
      ? "bg-red-100 text-red-700"
      : risk === "Medio"
      ? "bg-orange-100 text-orange-700"
      : "bg-green-100 text-green-700";

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${styles}`}>
      {risk}
    </span>
  );
}

export function AdvancedAnalytics() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div
      className="h-full overflow-y-auto p-4 sm:p-6 flex flex-col gap-4 sm:gap-6"
      style={{ background: "#F8FAFC", fontFamily: "'Inter', sans-serif" }}
      role="main"
      aria-label="Analíticas avanzadas"
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Brain size={24} className="text-[#534AB7]" aria-hidden="true" />
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Analíticas Avanzadas
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Predicción, tendencias, alertas inteligentes y recomendaciones para la toma de decisiones en OptiResult.
          </p>
        </div>

        <button className="bg-[#534AB7] text-white rounded-xl px-4 py-2 text-sm font-bold shadow-sm hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2" style={{ minHeight: "40px" }} aria-label="Generar informe predictivo">
          Generar informe predictivo
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Riesgo global"
          value="68%"
          description="Probabilidad de retraso si no se redistribuyen recursos."
          icon={AlertTriangle}
          tone="red"
        />
        <KpiCard
          title="Proyectos en riesgo"
          value="4"
          description="Proyectos con desviaciones relevantes."
          icon={Clock}
          tone="orange"
        />
        <KpiCard
          title="Eficiencia proyectada"
          value="84%"
          description="Tendencia estimada para el cierre del mes."
          icon={TrendingUp}
          tone="green"
        />
        <KpiCard
          title="Recursos críticos"
          value="6"
          description="Miembros con carga mayor al 90%."
          icon={Users}
          tone="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="col-span-1 lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Tendencia de eficiencia y riesgo
              </h2>
              <p className="text-xs text-slate-500">
                Evolución semanal de la eficiencia global y disminución del riesgo.
              </p>
            </div>
            <LineChartIcon size={20} className="text-[#534AB7]" aria-hidden="true" />
          </div>

          <div style={{ width: "100%", height: 280 }}>
            <ResponsiveContainer>
              <AreaChart data={efficiencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="week" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="eficiencia"
                  stroke="#534AB7"
                  fill="#EEEDFE"
                  strokeWidth={3}
                  name="Eficiencia"
                />
                <Area
                  type="monotone"
                  dataKey="riesgo"
                  stroke="#D94F4F"
                  fill="#FEE2E2"
                  strokeWidth={3}
                  name="Riesgo"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={18} className="text-red-600" aria-hidden="true" />
            <h2 className="text-base font-bold text-slate-900">
              Alertas inteligentes
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {alerts.map((alert) => (
              <div
                key={alert.title}
                className="rounded-xl border border-slate-200 p-3 bg-slate-50"
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-slate-800">{alert.title}</h3>
                  <span className="text-[10px] font-bold bg-red-100 text-red-700 px-2 py-1 rounded-full">
                    {alert.level}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-1">{alert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5">
          <h2 className="text-base font-bold text-slate-900 mb-1">
            Riesgo predictivo por proyecto
          </h2>
          <p className="text-xs text-slate-500 mb-4">
            Porcentaje estimado de desviación según avance, bloqueos y carga del equipo.
          </p>

          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer>
              <BarChart data={projectRiskData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="name" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip />
                <Bar dataKey="riesgo" radius={[8, 8, 0, 0]}>
                  {projectRiskData.map((entry) => (
                    <Cell
                      key={entry.name}
                      fill={entry.riesgo >= 70 ? "#D94F4F" : entry.riesgo >= 50 ? "#F59E0B" : "#22C55E"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5">
          <h2 className="text-base font-bold text-slate-900 mb-1">
            Carga laboral por equipo
          </h2>
          <p className="text-xs text-slate-500 mb-4">
            Permite detectar recursos sobrecargados o subutilizados.
          </p>

          <div style={{ width: "100%", height: 250 }}>
            <ResponsiveContainer>
              <BarChart data={workloadData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="team" stroke="#64748B" fontSize={11} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip />
                <Bar dataKey="carga" radius={[8, 8, 0, 0]}>
                  {workloadData.map((entry) => (
                    <Cell
                      key={entry.team}
                      fill={entry.carga >= 90 ? "#D94F4F" : entry.carga >= 80 ? "#F59E0B" : "#534AB7"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="col-span-1 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb size={18} className="text-[#534AB7]" aria-hidden="true" />
            <h2 className="text-base font-bold text-slate-900">
              Recomendaciones del sistema
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {recommendations.map((item) => (
              <div key={item} className="flex gap-2">
                <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-0.5" aria-hidden="true" />
                <p className="text-sm text-slate-600">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5">
          <h2 className="text-base font-bold text-slate-900 mb-1">
            Matriz de proyectos con riesgo
          </h2>
          <p className="text-xs text-slate-500 mb-4">
            Vista ejecutiva para priorizar acciones correctivas.
          </p>

          <div className="overflow-x-auto rounded-xl border border-slate-200" role="region" aria-label="Tabla de proyectos con riesgo" tabIndex={0}>
          <table className="w-full text-sm" role="table">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="text-left px-4 py-3 font-bold" scope="col">Proyecto</th>
                <th className="text-left px-4 py-3 font-bold" scope="col">Avance</th>
                <th className="text-left px-4 py-3 font-bold" scope="col">Riesgo</th>
                <th className="text-left px-4 py-3 font-bold hidden sm:table-cell" scope="col">Causa</th>
                <th className="text-left px-4 py-3 font-bold hidden sm:table-cell" scope="col">Acción sugerida</th>
              </tr>
            </thead>
              <tbody className="divide-y divide-slate-100">
                {projectTable.map((row) => (
                  <tr key={row.project} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-bold text-slate-800">{row.project}</td>
                    <td className="px-4 py-3 text-slate-600">{row.progress}</td>
                    <td className="px-4 py-3">
                      <RiskBadge risk={row.risk} />
                    </td>
                    <td className="px-4 py-3 text-slate-600 hidden sm:table-cell">{row.cause}</td>
                    <td className="px-4 py-3 text-[#534AB7] font-semibold hidden sm:table-cell">
                      {row.action}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
        </div>
      </div>
    </div>
  );
}
