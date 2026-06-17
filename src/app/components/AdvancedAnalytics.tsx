import {
  AlertTriangle,
  Brain,
  CheckCircle2,
  Clock,
  Lightbulb,
  LineChart as LineChartIcon,
  PiggyBankIcon,
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
  { week: "Sem 1", disponibilidad: 72, riesgo: 46 },
  { week: "Sem 2", disponibilidad: 76, riesgo: 42 },
  { week: "Sem 3", disponibilidad: 81, riesgo: 35 },
  { week: "Sem 4", disponibilidad: 84, riesgo: 29 },
];

const projectRiskData = [
  { name: "Portal de Pacientes", riesgo: 78 },
  { name: "Integración HIS", riesgo: 54 },
  { name: "Telemedicina", riesgo: 72 },
  { name: "Laboratorio Clínico", riesgo: 28 },
];

const workloadData = [
  { team: "QA Healthcare", carga: 82 },
  { team: "Integración HIS", carga: 76 },
  { team: "Clínica TI", carga: 95 },
  { team: "DevOps", carga: 88 },
  { team: "Frontend Salud", carga: 61 },
];

const alerts = [
  {
    title: "Portal de Pacientes presenta riesgo alto",
    description: "Tiene pruebas QA pendientes y una dependencia crítica por cerrar.",
    level: "Crítico",
  },
  {
    title: "Integración HIS pendiente de validación externa",
    description: "El proveedor aún no confirma la ventana de validación final.",
    level: "Alto",
  },
  {
    title: "Telemedicina con requisitos funcionales abiertos",
    description: "Persisten pendientes clínicos que afectan la demo con stakeholders.",
    level: "Medio",
  },
];

const recommendations = [
  "Redistribuir pruebas QA hacia Portal de Pacientes.",
  "Priorizar validación de Integración HIS.",
  "Agendar reunión con stakeholders clínicos para Telemedicina.",
  "Mantener monitoreo de disponibilidad en módulos críticos.",
];

const projectTable = [
  {
    project: "Portal de Pacientes",
    progress: "62%",
    risk: "Alto",
    cause: "QA sobrecargado",
    action: "Redistribuir pruebas",
  },
  {
    project: "Integración HIS",
    progress: "74%",
    risk: "Medio",
    cause: "Dependencia externa",
    action: "Priorizar validación",
  },
  {
    project: "Telemedicina",
    progress: "58%",
    risk: "Alto",
    cause: "Requisitos pendientes",
    action: "Reunión con stakeholders",
  },
  {
    project: "Laboratorio Clínico",
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
    red: { bg: "#FEE2E2", text: "#b52bdf" },
    green: { bg: "#DCFCE7", text: "#201580" },
    orange: { bg: "#FFEDD5", text: "#c20c9b" },
  };

  return (
      <div
        className="rounded-2xl border border-white/10 shadow-sm p-5 flex items-start justify-between"
        style={{ background: "rgba(13,21,71,0.95)" }}
      >
        <div>
          <p className="text-xs font-bold text-cyan-100/55 uppercase tracking-wide">
            {title}
          </p>
          <h3 className="text-3xl font-extrabold text-white mt-2">{value}</h3>
          <p className="text-xs text-cyan-100/65 mt-1">{description}</p>
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
        ? "bg-red-500/15 text-[#FFB4B4]"
      : risk === "Medio"
        ? "bg-orange-500/15 text-[#FDBA74]"
        : "bg-green-500/15 text-[#86EFAC]";

  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${styles}`}>
      {risk}
    </span>
  );
}

export function AdvancedAnalytics() {
  return (
    <div
      className="h-full overflow-y-auto p-6 flex flex-col gap-6"
      style={{ background: "#061673", fontFamily: "'Inter', sans-serif" }}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Brain size={24} className="text-[#534AB7]" />
            <h1 className="text-2xl font-extrabold text-white">
              Analíticas Avanzadas
            </h1>
          </div>
          <p className="text-sm text-cyan-100/70 mt-1">
            Predicción, tendencias, alertas inteligentes y recomendaciones para la toma de decisiones en clínicas y hospitales privados.
          </p>
        </div>

        <button className="bg-[#534AB7] text-white rounded-xl px-4 py-2 text-sm font-bold shadow-sm hover:opacity-90 transition-all">
          Generar informe predictivo
        </button>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <KpiCard
          title="Riesgo de retraso"
          value="68%"
          description="Probabilidad de retraso en módulos críticos clínicos."
          icon={AlertTriangle}
        tone="red"
        />
        <KpiCard
          title="Disponibilidad operativa"
          value="4"
          description="Proyección de continuidad operativa para la semana."
          icon={Clock}
          tone="orange"
        />
        <KpiCard
          title="Impacto clínico alto"
          value="84%"
          description="Proyectos con mayor efecto sobre la atención privada."
          icon={TrendingUp}
          tone="green"
        />
        <KpiCard
          title="Cumplimiento SLA"
          value="6"
          description="Nivel de cumplimiento esperado en módulos clave."
          icon={Users}
          tone="purple"
        />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 rounded-2xl border shadow-sm p-5" style={{ background: "rgba(13,21,71,0.92)", borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-base font-bold text-white">
                Disponibilidad operativa y riesgo
              </h2>
              <p className="text-xs text-cyan-100/60">
                Evolución semanal de la disponibilidad operativa y del riesgo en módulos críticos.
              </p>
            </div>
            <LineChartIcon size={20} className="text-[#534AB7]" />
          </div>

          <div style={{ width: "100%", height: 280 }}>
            <ResponsiveContainer>
              <AreaChart data={efficiencyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis dataKey="week" stroke="#64748B" fontSize={12} />
                <YAxis stroke="#64748B" fontSize={12} />
                <Tooltip />
                <Area type="monotone" dataKey="disponibilidad" stroke="#79AEF2" fill="#EEEDFE" strokeWidth={3} name="Disponibilidad" />
                <Area
                  type="monotone"
                  dataKey="riesgo"
                  stroke="#7f4fd9"
                  fill="#FEE2E2"
                  strokeWidth={3}
                  name="Riesgo"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border shadow-sm p-5" style={{ background: "rgba(13,21,71,0.92)", borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={18} className="text-red-600" />
            <h2 className="text-base font-bold text-white">
              Alertas inteligentes
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {alerts.map((alert) => (
              <div
                key={alert.title}
                className="rounded-xl border p-3"
                style={{ borderColor: "rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)" }}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-bold text-white">{alert.title}</h3>
                  <span className="text-[10px] font-bold bg-red-500/15 text-[#FFB4B4] px-2 py-1 rounded-full">
                    {alert.level}
                  </span>
                </div>
                <p className="text-xs text-cyan-100/60 mt-1">{alert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-2xl border shadow-sm p-5" style={{ background: "rgba(13,21,71,0.92)", borderColor: "rgba(255,255,255,0.08)" }}>
          <h2 className="text-base font-bold text-white mb-1">
            Riesgo predictivo por proyecto
          </h2>
          <p className="text-xs text-cyan-100/60 mb-4">
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
                      fill={entry.riesgo >= 70 ? "#b94fd9" : entry.riesgo >= 50 ? "#f50be2" : "#6e22c5"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border shadow-sm p-5" style={{ background: "rgba(13,21,71,0.92)", borderColor: "rgba(255,255,255,0.08)" }}>
          <h2 className="text-base font-bold text-white mb-1">
            Recursos críticos por área
          </h2>
          <p className="text-xs text-cyan-100/60 mb-4">
            Permite detectar recursos sobrecargados o subutilizados por frente de trabajo.
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
                      fill={entry.carga >= 90 ? "#ad4fd9" : entry.carga >= 80 ? "#f50be9" : "#534AB7"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 rounded-2xl border shadow-sm p-5" style={{ background: "rgba(13,21,71,0.92)", borderColor: "rgba(255,255,255,0.08)" }}>
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb size={18} className="text-[#534AB7]" />
            <h2 className="text-base font-bold text-white">
              Recomendaciones del sistema
            </h2>
          </div>

          <div className="flex flex-col gap-3">
            {recommendations.map((item) => (
              <div key={item} className="flex gap-2">
                <CheckCircle2 size={16} className="text-green-600 shrink-0 mt-0.5" />
                <p className="text-sm text-cyan-100/70">{item}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="col-span-2 rounded-2xl border shadow-sm p-5" style={{ background: "rgba(13,21,71,0.92)", borderColor: "rgba(255,255,255,0.08)" }}>
          <h2 className="text-base font-bold text-white mb-1">
            Matriz de riesgos clínicos
          </h2>
          <p className="text-xs text-cyan-100/60 mb-4">
            Vista ejecutiva para priorizar acciones correctivas en la operación salud.
          </p>

          <div className="overflow-hidden rounded-xl border" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
            <table className="w-full text-sm">
              <thead className="text-cyan-100/60" style={{ background: "rgba(255,255,255,0.04)" }}>
                <tr>
                  <th className="text-left px-4 py-3 font-bold">Proyecto</th>
                  <th className="text-left px-4 py-3 font-bold">Avance</th>
                  <th className="text-left px-4 py-3 font-bold">Riesgo</th>
                  <th className="text-left px-4 py-3 font-bold">Causa</th>
                  <th className="text-left px-4 py-3 font-bold">Acción sugerida</th>
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "rgba(255,255,255,0.08)" }}>
                {projectTable.map((row) => (
                  <tr key={row.project} className="hover:bg-white/5">
                    <td className="px-4 py-3 font-bold text-white">{row.project}</td>
                    <td className="px-4 py-3 text-cyan-100/70">{row.progress}</td>
                    <td className="px-4 py-3">
                      <RiskBadge risk={row.risk} />
                    </td>
                    <td className="px-4 py-3 text-cyan-100/70">{row.cause}</td>
                    <td className="px-4 py-3 text-[#79AEF2] font-semibold">
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