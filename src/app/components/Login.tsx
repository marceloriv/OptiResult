import { Eye, EyeOff, Lock, Mail, Zap } from "lucide-react";
import React, { useState } from "react";

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("correo@innovatech.cl");
  const [password, setPassword] = useState("••••••••");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div
      className="flex min-h-screen w-full"
      style={{
        background: "#FFFFFF",
        fontFamily: "'Inter', sans-serif",
      }}
      role="main"
      aria-label="Página de inicio de sesión"
    >
      {/* Left Half - Gradient & Visuals */}
      <div
        className="hidden lg:flex lg:w-1/2 flex-col justify-between p-8 lg:p-12 relative overflow-hidden text-white"
        style={{
          background: "linear-gradient(135deg, #534AB7 0%, #26215C 100%)",
        }}
        aria-hidden="true"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid-login" width="50" height="50" patternUnits="userSpaceOnUse">
                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="#FFFFFF" strokeWidth="1" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid-login)" />
          </svg>
        </div>
        <div className="absolute -top-32 -left-32 w-80 h-80 rounded-full blur-3xl opacity-20 bg-white"></div>
        <div className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-20 bg-[#7F77DD]"></div>

        {/* Top: Brand Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <div className="flex items-center justify-center rounded-xl bg-white w-9 h-9 shadow-md text-[#534AB7]">
            <Zap size={20} fill="#534AB7" strokeWidth={1.5} />
          </div>
          <span className="font-extrabold text-xl tracking-tight">OptiResult</span>
        </div>

        {/* Center: Headline and Description */}
        <div className="my-auto max-w-[500px] relative z-10 flex flex-col gap-6">
          <h1 className="text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight">
            Bienvenido a OptiResult
          </h1>
          <p className="text-base lg:text-lg opacity-90 font-normal leading-relaxed text-[#EEEDFE]">
            La plataforma que transforma la forma en que Innovatech gestiona sus proyectos.
          </p>

          {/* Floating Stat Cards */}
          <div className="flex flex-col gap-3.5 mt-8">
            <div
              className="flex items-center gap-3 p-4 rounded-xl backdrop-blur-md border border-white/10 transition-transform hover:translate-x-1 duration-200"
              style={{ background: "rgba(255, 255, 255, 0.08)" }}
            >
              <span className="text-xl">📉</span>
              <div>
                <span className="font-bold block text-sm">60% menos retrasos</span>
                <span className="text-xs opacity-75">Optimización en la entrega de hitos</span>
              </div>
            </div>
            <div
              className="flex items-center gap-3 p-4 rounded-xl backdrop-blur-md border border-white/10 transition-transform hover:translate-x-1 duration-200"
              style={{ background: "rgba(255, 255, 255, 0.08)" }}
            >
              <span className="text-xl">👁️</span>
              <div>
                <span className="font-bold block text-sm">Visibilidad 100% en tiempo real</span>
                <span className="text-xs opacity-75">Control absoluto de flujos de trabajo</span>
              </div>
            </div>
            <div
              className="flex items-center gap-3 p-4 rounded-xl backdrop-blur-md border border-white/10 transition-transform hover:translate-x-1 duration-200"
              style={{ background: "rgba(255, 255, 255, 0.08)" }}
            >
              <span className="text-xl">👥</span>
              <div>
                <span className="font-bold block text-sm">3 equipos sincronizados</span>
                <span className="text-xs opacity-75">Ingeniería, QA y Diseño conectados</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-xs opacity-60 relative z-10">
          © 2026 Innovatech Solutions. Todos los derechos reservados.
        </div>
      </div>

      {/* Right Half - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between p-6 sm:p-8 lg:p-12 bg-white relative">
        {/* Top Support Link */}
        <div className="text-right text-xs font-semibold text-[#6B7280]">
          ¿Necesitas ayuda?{" "}
          <a href="mailto:soporte@optiresult.cl" className="text-[#534AB7] hover:underline font-bold focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2 rounded px-1">
            soporte@optiresult.cl
          </a>
        </div>

        {/* Central Card */}
        <div className="max-w-[420px] w-full mx-auto my-auto flex flex-col gap-4 sm:gap-6">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-2 mb-2">
            <div className="flex items-center justify-center rounded-xl bg-[#EEEDFE] w-12 h-12 text-[#534AB7] mb-2 lg:mb-0">
              <Zap size={24} fill="#534AB7" strokeWidth={1.5} aria-hidden="true" />
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1A2E]">
              Iniciar sesión en tu cuenta
            </h2>
            <p className="text-xs text-[#6B7280] font-medium">
              Introduce tus credenciales autorizadas por Innovatech Solutions.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
            {/* Email field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" aria-hidden="true" />
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="correo@innovatech.cl"
                  className="w-full pl-10 pr-4 py-3 rounded-lg text-sm transition-all outline-none border border-[#E5E7EB] focus:border-[#534AB7] focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2 bg-white text-slate-800"
                  style={{ minHeight: "48px" }}
                  aria-label="Correo electrónico"
                />
              </div>
            </div>

            {/* Password field */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">
                Contraseña
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]" aria-hidden="true" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-3 rounded-lg text-sm transition-all outline-none border border-[#E5E7EB] focus:border-[#534AB7] focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2 bg-white text-slate-800"
                  style={{ minHeight: "48px" }}
                  aria-label="Contraseña"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#1A1A2E] cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2 rounded p-1"
                  style={{ minHeight: "32px", minWidth: "32px" }}
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
                </button>
              </div>
            </div>

            {/* Checkbox & Forgot Password */}
            <div className="flex items-center justify-between text-xs mt-1">
              <label className="flex items-center gap-2 text-[#6B7280] cursor-pointer font-medium">
                <input type="checkbox" defaultChecked className="rounded accent-[#534AB7] w-4 h-4 cursor-pointer" id="remember-me" />
                <span>Recordarme</span>
              </label>
              <a href="#" className="text-[#534AB7] hover:underline font-bold focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2 rounded px-1">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-bold text-white transition-all cursor-pointer text-sm shadow-md hover:shadow-lg active:scale-[0.98] mt-2 flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2"
              style={{
                background: "#534AB7",
                minHeight: "48px",
              }}
            >
              Iniciar sesión
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 text-xs text-[#9CA3AF] my-1">
            <div className="flex-1 h-px bg-[#E5E7EB]"></div>
            <span>o continúa con</span>
            <div className="flex-1 h-px bg-[#E5E7EB]"></div>
          </div>

          {/* SSO Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={onLogin}
              className="flex items-center justify-center gap-2 py-2.5 border border-[#E5E7EB] rounded-lg text-xs font-bold text-[#374151] hover:bg-slate-50 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2"
              style={{ minHeight: "44px" }}
              aria-label="Iniciar sesión con Google"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Google
            </button>
            <button
              type="button"
              onClick={onLogin}
              className="flex items-center justify-center gap-2 py-2.5 border border-[#E5E7EB] rounded-lg text-xs font-bold text-[#374151] hover:bg-slate-50 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2"
              style={{ minHeight: "44px" }}
              aria-label="Iniciar sesión con Microsoft"
            >
              <svg className="w-4 h-4" viewBox="0 0 23 23" aria-hidden="true">
                <path fill="#F35325" d="M0 0h11v11H0z" />
                <path fill="#81BC06" d="M12 0h11v11H12z" />
                <path fill="#05A6F0" d="M0 12h11v11H0z" />
                <path fill="#FFBA08" d="M12 12h11v11H12z" />
              </svg>
              Microsoft
            </button>
          </div>
        </div>

        {/* Bottom footer text */}
        <div className="text-center text-xs text-[#9CA3AF] mt-6">
          ¿Primera vez aquí?{" "}
          <a href="#" className="text-[#534AB7] hover:underline font-bold focus:outline-none focus:ring-2 focus:ring-[#534AB7] focus:ring-offset-2 rounded px-1">
            Contacta a tu administrador
          </a>
        </div>
      </div>
    </div>
  );
}
