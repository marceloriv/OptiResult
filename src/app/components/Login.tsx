import React, { useState } from "react";
import { Zap, Mail, Lock, ArrowRight } from "lucide-react";

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("admin@optiresult.com");
  const [password, setPassword] = useState("••••••••");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  return (
    <div
      className="flex min-h-screen items-center justify-center p-6 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #534AB7 0%, #26215C 100%)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Background patterns */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl opacity-30" style={{ background: "#EEEDFE" }}></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl opacity-20" style={{ background: "#534AB7" }}></div>

      <div
        className="w-full max-w-[420px] rounded-2xl p-8 transition-all duration-300 relative z-10 animate-fade-in"
        style={{
          background: "rgba(255, 255, 255, 0.08)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.25)",
        }}
      >
        {/* Brand Logo & Name */}
        <div className="flex flex-col items-center text-center mb-8">
          <div
            className="flex items-center justify-center rounded-2xl mb-4 transition-transform hover:rotate-12 duration-300 shadow-lg"
            style={{
              width: 56,
              height: 56,
              background: "#FFFFFF",
              color: "#534AB7",
            }}
          >
            <Zap size={32} fill="#534AB7" strokeWidth={1.5} />
          </div>
          <h1
            style={{
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: "2rem",
              letterSpacing: "-0.02em",
              margin: 0,
            }}
          >
            OptiResult
          </h1>
          <p
            style={{
              color: "#EEEDFE",
              fontSize: "0.95rem",
              fontWeight: 500,
              letterSpacing: "0.05em",
              marginTop: "4px",
              opacity: 0.9,
            }}
          >
            Gestiona. Automatiza. Crece.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1.5">
            <label
              style={{
                color: "#EEEDFE",
                fontSize: "0.78rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Correo Electrónico
            </label>
            <div className="relative">
              <Mail
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "rgba(238, 237, 254, 0.6)" }}
              />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@compania.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl transition-all outline-none"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#FFFFFF",
                  fontSize: "0.88rem",
                }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              style={{
                color: "#EEEDFE",
                fontSize: "0.78rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Contraseña
            </label>
            <div className="relative">
              <Lock
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2"
                style={{ color: "rgba(238, 237, 254, 0.6)" }}
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-xl transition-all outline-none"
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  color: "#FFFFFF",
                  fontSize: "0.88rem",
                }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs mt-1">
            <label className="flex items-center gap-2 text-[#EEEDFE] cursor-pointer">
              <input type="checkbox" defaultChecked className="rounded border-none accent-[#534AB7]" />
              Recordarme
            </label>
            <a href="#" className="text-[#EEEDFE] hover:underline" style={{ opacity: 0.8 }}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-semibold flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 hover:shadow-lg active:scale-98"
            style={{
              background: "#FFFFFF",
              color: "#534AB7",
              border: "none",
              fontSize: "0.95rem",
              marginTop: "8px",
            }}
          >
            Iniciar sesión
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="text-center mt-8 text-xs text-[#EEEDFE]" style={{ opacity: 0.6 }}>
          ¿No tienes una cuenta? <a href="#" className="underline font-medium text-white">Prueba gratis 14 días</a>
        </div>
      </div>
    </div>
  );
}
