export function Configuration() {
  return (
    <div
      className="flex flex-col p-4 sm:p-6 gap-4 sm:gap-6 h-full overflow-y-auto"
      style={{ background: "#061673", fontFamily: "'Inter', sans-serif" }}
    >
      <div>
        <h1 className="text-2xl font-bold text-white" style={{ fontSize: 24 }}>
          Configuración del Sistema
        </h1>
        <p className="text-sm text-cyan-100/70 mt-1">
          Configura las preferencias de tu espacio de trabajo y cuenta de OptiResult para operación clínica.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-xl p-5 border shadow-sm flex flex-col gap-4" style={{ background: "rgba(13,21,71,0.92)", borderColor: "rgba(255,255,255,0.08)" }}>
          <h3 className="text-base font-bold text-white">
            Preferencias del Espacio de Trabajo
          </h3>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-sm font-semibold text-white block">
                  Notificaciones por Email
                </span>
                <span className="text-xs text-cyan-100/60">
                  Recibe alertas semanales sobre el estado clínico y operativo.
                </span>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#534AB7]" />
            </div>

            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-sm font-semibold text-white block">
                  Integración con canales internos
                </span>
                <span className="text-xs text-cyan-100/60">
                  Enviar alertas automáticas a canales vinculados.
                </span>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#534AB7]" />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold text-white block">
                  Auto-balancear recursos
                </span>
                <span className="text-xs text-cyan-100/60">
                  Sugerir reasignaciones cuando la carga supere el 90%.
                </span>
              </div>
              <input type="checkbox" className="w-4 h-4 accent-[#534AB7]" />
            </div>
          </div>
        </div>

        <div className="rounded-xl p-5 border shadow-sm flex flex-col gap-4" style={{ background: "rgba(13,21,71,0.92)", borderColor: "rgba(255,255,255,0.08)" }}>
          <h3 className="text-base font-bold text-white">
            Seguridad y Cumplimiento
          </h3>

          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-sm font-semibold text-white block">
                  Autenticación de Dos Factores
                </span>
                <span className="text-xs text-cyan-100/60">
                  Protege la cuenta con un código de seguridad adicional.
                </span>
              </div>
              <button className="text-xs font-bold text-[#534AB7] bg-[#EEEDFE] px-3 py-1.5 rounded-lg hover:bg-[#dbdaf9] transition-all">
                Activar
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <span className="text-sm font-semibold text-white block">
                  Cumplimiento normativo
                </span>
                <span className="text-xs text-cyan-100/60">
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
