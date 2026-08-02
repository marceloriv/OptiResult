# AGENTS.md — OptiResult

## 0. Jerarquía de reglas

1. Seguridad y corrección
2. Convenciones del proyecto (stack, estilo, arquitectura)
3. Minimalismo (sección 5)

## 1. Resumen del proyecto

Dashboard de gestión de proyectos (login, kanban, Gantt, analíticas, recursos, colaboración). Frontend estático Figma Make. Sin backend.

## 2. Stack técnico

- **Lenguaje:** TypeScript (sin `tsconfig.json`, compilado por Vite/ESBuild)
- **Framework:** React 19 (sin Next.js/Remix)
- **Bundler:** Vite 8
- **Package manager:** npm (`package-lock.json`, ignorar `pnpm-workspace.yaml`)
- **UI:** componentes propios en `src/app/components/` (sin shadcn/ui)
- **Estilos:** Tailwind CSS v4 + `tw-animate-css` + inline `style` objects
- **Charts:** recharts 2.15
- **Iconos:** lucide-react

## 3. Comandos de setup

```bash
npm install        # instalar dependencias
npm run dev        # servidor de desarrollo Vite
npm run build      # build producción
```

No hay comandos de test, lint ni typecheck.

## 4. Estilo de código

- Routing manual con `useState` + `activeView` — NO usar React Router
- Estado con hooks nativos (`useState`, `useEffect`, `useRef`)
- Componentes funcionales, sin clases
- `useIsMobile()` de `components/use-mobile.ts` para detectar viewport móvil
- `vite.config.ts`: solo plugins `react()` y `tailwindcss()`

## 5. Disciplina anti-sobreingeniería (Ponytail)

Escalera antes de escribir código:

1. ¿Es necesario? (YAGNI)
2. ¿Stdlib lo resuelve?
3. ¿Función nativa de plataforma lo cubre?
4. ¿Dependencia ya instalada lo resuelve?
5. ¿Una línea basta?
6. Mínimo código funcional.

No aplicar pereza en: comprensión del problema, validación en fronteras de confianza, errores que previenen pérdida de datos, seguridad, accesibilidad, calibración hardware, requests explícitas.

Toda lógica no trivial deja una verificación ejecutable mínima (assert/test pequeño).

## 6. Pruebas unitarias

No existen. No hay framework de test en `devDependencies`. No agregar tests sin pedido explícito.

## 7. Métricas de claridad

No hay linter configurado. Usar criterio personal.

## 8. Procedimientos QA

Único check pre-entrega: `npm run build` compila sin errores.

## 9. Seguridad

Nunca commitear secrets. App frontend estática — no hay auth real ni backend que proteger.

## 10. Commits y PR

Formato: Conventional Commits (`feat:`, `fix:`, `refactor:`). PRs cortos describiendo qué cambia y por qué.

## 11. Límites del agente

Sin restricciones especiales — no hay migraciones, CI/CD, ni `.env` files en este repo.

## 12. Enforcement

No hay enforcement mecánico (sin pre-commit hooks ni CI). Depende de disciplina del agente.

## 13. Mantenimiento

Tratar como código. Empezar corto, añadir secciones cuando el agente falle repetidamente, eliminar cuando cambien convenciones. Revisar cada sprint.
