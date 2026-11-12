# Directrices para Agentes (AGENTS.md) — GlucoLuna

Este documento define las reglas operativas, de arquitectura y de publicación de versiones que cualquier agente de IA debe cumplir estrictamente al trabajar en este repositorio.

---

## 1. Regla Crítica sobre Git Tags y Releases

> **PROHIBIDO CREAR ETIQUETAS GIT (`git tag`) LOCALMENTE.**
> - **NUNCA** ejecutes `git tag` ni `git push --tags`.
> - El usuario gestiona la creación de etiquetas y la publicación de releases manualmente desde su cliente de GitHub o la interfaz web de GitHub.
> - Cuando el usuario pida preparar una nueva release (ej. `v2.5.0`), debes:
>   1. Actualizar la versión en `package.json`.
>   2. Documentar la versión en `CHANGELOG.md`, `README.md` y `docs/` si aplica.
>   3. Compilar el proyecto (`npm run build`).
>   4. Generar en la carpeta `release/` (ignorada por Git):
>      - `release/glucoluna-vX.Y.Z.zip` (con el contenido de `dist/`)
>      - `release/glucoluna-vX.Y.Z.zip.sha256`
>      - `release/RELEASE_NOTES_vX.Y.Z.md`
>   5. Hacer únicamente `git add` y `git commit` en la rama `main` (sin crear ningún tag).

---

## 2. Identidad y Configuración del Proyecto

- **Nombre:** GlucoLuna (`glucoluna`)
- **Dominio de producción:** `https://glucoluna.antoniohorrillo.com` (configurado en `public/CNAME`, `astro.config.mjs` y `src/lib/site.ts`)
- **Repositorio:** `https://github.com/antoniohh/GlucoLuna`
- **Autor:** Antonio Horrillo (`https://antoniohorrillo.com`)
- **Stack:** Astro 7 (`output: "static"`), Tailwind CSS v4 (`@tailwindcss/vite`), `@lucide/astro` y TypeScript / JavaScript estático sobre Node.js `>= 22.23.4` (`.nvmrc`).
- **Filosofía técnica:** Web estática sin React ni islas de cliente pesadas. Generación HTML pura con CSS especializado para maquetación e impresión A4 de fichas médicas y calendarios.

---

## 3. Ecosistema de Red y Enlazado Inter-Dominio

- **Componente `NetworkBar.astro`:** Barra superior unificada de 36px que enlaza los proyectos del ecosistema (*GlucoLuna*, *Luz*, *Combustible*, *Embalses* y `antoniohorrillo.com`). Debe mantenerse 100% responsiva (scroll horizontal táctil en viewport móvil sin alterar la altura del viewport ni provocar desbordamientos). Incluye `print:hidden` para no interferir con las hojas A4 impresas.
- **Enlazado en `Footer.astro`:** Columna dedicada a la Red de Proyectos con enlaces semánticos y textos de ancla descriptivos (*anchor text* SEO) hacia los paneles de datos abiertos de Extremadura.

---

## 4. Estándares de Accesibilidad, Impresión y Privacidad

- **Impresión:** Toda vista o componente imprimible (calendario, guía de pinchazo, pautas de alimentación) debe ocultar navegación, encabezados y pie mediante clases `@media print` (`.no-print`, `print:hidden`).
- **Privacidad (RGPD / AEPD):** Cumplimiento de Google Consent Mode v2 delimitado a la región EEE/Reino Unido/Suiza en `src/layouts/BaseLayout.astro`, gestión de consentimiento con `src/components/CookieBanner.astro` y política en `src/pages/cookies.astro`.
