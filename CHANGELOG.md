# Changelog

Todas las versiones relevantes de GlucoLuna. El proyecto sigue [Versionado Semántico](https://semver.org/lang/es/).

## [2.4.0] — 2026-11-03

Soporte completo como Progressive Web App (PWA) con instalación en Chrome móvil, implementación de Google Consent Mode v2 delimitado por región y actualización de la política de privacidad y cookies.

### Añadido

- **Soporte PWA e Instalación en Chrome Móvil ([`InstallPrompt.astro`](src/components/InstallPrompt.astro), [`sw.js`](public/sw.js))**:
  - Incorporación de Service Worker oficial (`public/sw.js`) con estrategia de caché estática offline para cumplir los criterios obligatorios de instalabilidad PWA en Google Chrome y navegadores Chromium.
  - Creación del componente `InstallPrompt.astro`: banner responsivo inferior que detecta el evento `beforeinstallprompt` en dispositivos móviles, con diseño en fondo oscuro `slate-900/95`, icono corporativo de 192px y botón en azul identidad (`bg-blue-600 hover:bg-blue-500 text-white`).
  - Detección de visualización `standalone` para no mostrar el aviso si la app ya fue instalada, y persistencia del descarte en `sessionStorage`.
  - Registro de Service Worker en el `<head>` de `BaseLayout.astro`.

### Modificado y Mejorado

- **Google Consent Mode v2 Delimitado por Región ([`BaseLayout.astro`](src/layouts/BaseLayout.astro))**:
  - Estado predeterminado `denied` en las cuatro señales (`analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`) delimitado específicamente a los 30 países del Espacio Económico Europeo (EEE), Reino Unido y Suiza.
  - Inicialización en concedido para visitantes fuera del EEE conforme a las directrices de Google Analytics 4, evitando la penalización de tasa de consentimiento del 0 %.
  - Sincronización inmediata de decisión guardada en `localStorage` antes de invocar `gtag('config')`.
- **Aviso y Política de Cookies ([`CookieBanner.astro`](src/components/CookieBanner.astro), [`cookies.astro`](src/pages/cookies.astro))**:
  - Emisión del paquete íntegro de 4 señales en `applyConsent`.
  - Ajuste del texto del banner: aclara que solo se guardan cookies con permiso previo y que no existe publicidad personalizada.
  - Creada la sección «3. Funcionamiento de Google Consent Mode v2» en la página de política de cookies detallando la navegación cookieless ante el rechazo.

## [2.3.1] — 2026-11-01

Corrección y paridad de diseño responsive para la sección de alimentación en dispositivos móviles.

### Corregido

- **Diseño responsive de la Guía de Alimentación en móvil** ([`alimentacion.css`](src/styles/alimentacion.css)): adaptación para igualar exactamente la experiencia y estética visual de la guía del pinchazo en pantallas pequeñas (`< 760px`).
  - Desactivación del contenedor rígido de folio A4 en móvil para convertirlo en un flujo de lectura cómodo y natural con tarjetas blancas redondeadas (`14px`) y sombra suave sobre fondo transparente.
  - Tipografía y títulos adaptados con jerarquía accesible para personas mayores (título `1.9rem`, subtítulo `11px`, descripciones a `0.98rem` con interlineado `1.5`).
  - Tarjetas de los 7 grupos de alimentos del día (`.day-item`) con el mismo patrón visual que los pasos del pinchazo (número circular destacado de `38px` a la izquierda y contenido a la derecha con badges informativos).
  - Ficha de horarios (`.personal`) y teléfonos de salud (`.contact-item`) adaptados a 1 columna completa con líneas de escritura extendidas.
  - Tabla comparativa de alimentos («preferir» vs. «evitar») y técnicas de cocina ligera optimizadas para lectura vertical.
  - Ocultación del pie de página de impresión (`.page-footer`) en pantalla móvil manteniendo la salida estricta en 2 folios A4 al imprimir desde cualquier dispositivo.

## [2.3.0] — 2026-11-01

Tercera release relevante. Introduce la Guía de Alimentación en formato imprimible de 2 hojas A4, selector dinámico de mes en el calendario, cumplimiento estricto de privacidad (RGPD / AEPD) con Google Consent Mode v2 y aviso de cookies nativo.

### Añadido

- **Formato A4 imprimible para la Guía de Alimentación** ([`alimentacion.astro`](src/pages/alimentacion.astro) y [`alimentacion.css`](src/styles/alimentacion.css)): maquetación idéntica a la Guía del Pinchazo con 2 hojas A4 exactas (`210mm x 297mm`), escalado inteligente con `guia.js`, ficha de horarios y teléfonos de salud para rellenar a mano, y salida perfecta en 2 páginas A4 al imprimir desde el navegador.
- **Selector de mes dinámico en el Calendario** ([`calendario.js`](src/scripts/calendario.js)): apertura automática en el mes y año en curso del usuario (`new Date()`) en lugar de un mes estático.
- **Sistema de consentimiento de cookies y Google Consent Mode v2** ([`BaseLayout.astro`](src/layouts/BaseLayout.astro)): bloqueo analítico previo por defecto (`analytics_storage: 'denied'`).
- **Componente accesible [`CookieBanner.astro`](src/components/CookieBanner.astro)** con aviso flotante inferior y modal interactivo para aceptar, rechazar o configurar preferencias con persistencia en `localStorage`.
- **Página de Política de cookies** ([`/cookies/`](src/pages/cookies.astro)) con tabla de cookies, titularidad, finalidades, plazos de conservación, enlaces para navegadores y botón interactivo para cambiar preferencias.
- Enlaces permanentes de «Política de cookies» y «Preferencias de cookies» en el pie de página global ([`Footer.astro`](src/components/Footer.astro)).
- Entrada de `/cookies/` en `sitemap.xml`.

### Corregido

- Corrección de alineación de iconos en la Guía de Alimentación: visualización limpia de los números circulares del 1 al 10 en las cabeceras de tarjeta sin superposición sobre los textos.

## [2.2.1] — 2026-11-01

Integración y configuración de analítica web.

### Añadido

- Integración de la etiqueta de Google (`gtag.js`) con ID de medición `G-PZ3W1DHYWT` en [`BaseLayout.astro`](src/layouts/BaseLayout.astro) con soporte `is:inline` en todas las páginas del sitio.

## [2.2.0] — 2026-10-31

Segunda release relevante. Introduce la nueva sección de Alimentación basada en la guía clínica del Servicio Extremeño de Salud (SES) y soporte nativo para el dominio personalizado `glucoluna.antoniohorrillo.com`.

### Añadido

- Nueva sección **Guía de alimentación** (`/alimentacion/`) adaptada para personas con diabetes y sus cuidadores.
- Desglose de los **10 consejos clínicos** de alimentación (GEDAPS / SES): horarios, azúcares rápidos, colesterol, hidratos de absorción lenta con fibra, raciones de verdura, fruta entera, carnes/pescados, lácteos desnatados, grasas saludables y precauciones con alcohol y café.
- Tabla visual interactiva y de alto contraste de **Alimentos a preferir vs Alimentos a evitar o limitar**.
- Bloque informativo destacado sobre la **coordinación de los hidratos con la dosis de insulina**.
- Soporte de **impresión en A4** (`@media print` y botón «Imprimir guía en A4») optimizado para tener la guía en la cocina o pegada a la nevera.
- Integración en la navegación global: nuevo enlace en [`Header.astro`](src/components/Header.astro), [`Footer.astro`](src/components/Footer.astro) y tercera tarjeta de herramienta en la portada (`index.astro`).
- Archivo `CNAME` en `public/` y configuración del dominio `glucoluna.antoniohorrillo.com`.
- Metadatos SEO y esquema estructurado Schema.org `MedicalWebPage` para la página de alimentación.
- Nueva entrada en `sitemap.xml` para `/alimentacion/`.

### Corregido

- Corrección de rutas base en Astro para GitHub Pages: eliminación del prefijo estático `/GlucoLuna/` que provocaba errores 404 en assets y navegación al usar el dominio personalizado `glucoluna.antoniohorrillo.com`.
- Enlaces y referencias canónicas actualizadas a la raíz del dominio personalizado.

## [2.1.0] — 2026-10-28

Primera release de producción publicada. Consolida la migración a Astro 7, Tailwind CSS 4 y Lucide, el despliegue en GitHub Pages y las correcciones de la puesta en marcha.

### Añadido

- `sitemap.xml` y `robots.txt` explícitos en `public/`.
- ZIP de producción y checksum SHA256.
- Workflow de release para etiquetas `v*` con ZIP adjunto.
- Autoría de Antonio Horrillo y licencia MIT en el footer y el README.
- Badges de tecnologías y tabla de control de versiones.

### Corregido

- CI de GitHub Actions fijada a Node **22.23.4**, mínimo requerido por Astro 7.
- Footer compacto en una sola línea.
- Controles del calendario sin las etiquetas visibles «Mes» y «Año».
- Cabeceras de calendario y guía unificadas.

## [2.0.0] — 2026-10-28

### Añadido

- Migración completa a **Astro 7** con salida estática.
- **Tailwind CSS 4** para la capa de layout y componentes.
- Iconos **Lucide** mediante `@lucide/astro`.
- Despliegue automático en GitHub Pages con GitHub Actions.
- Workflow de release para etiquetas `v*`.
- Licencia MIT y autoría en el pie de página.
- `CHANGELOG.md`, badges y control de versiones en el README.
- `sitemap.xml` y `robots.txt` explícitos en `public/`.
- Configuración de `base: /GlucoLuna` para el repositorio de GitHub Pages.

### Corregido

- CI de GitHub Actions fijada a Node **22.23.4**, mínimo requerido por Astro 7.

### Cambiado

- Estructura del proyecto a `src/`, `public/` y `dist/`.
- URLs limpias con directorios: `/calendario/` y `/guia-pinchazo/`.
- Cabeceras de calendario y guía unificadas con un componente compartido.
- Footer compacto en una línea y con autoría.
- Controles del calendario sin las etiquetas visibles «Mes» y «Año».

### Eliminado

- Carpeta de PDFs y enlaces de descarga directa. La impresión se hace desde el navegador.
- HTML, CSS y JavaScript duplicados de la versión estática anterior.

## [1.1.0] — 2026-10-28

### Añadido

- Portada tipo landing con navegación a calendario y guía.
- Menú de altura fija y menú móvil superpuesto.
- Guía visual de 4 hojas A4 con 10 pasos ilustrados.
- Modo lectura móvil para la guía y escalado del calendario.
- SEO: metadatos, Open Graph, JSON-LD, sitemap, robots, manifiesto y 404.
- Preparación para GitHub Pages.

### Corregido

- Alineación de las cabeceras de calendario y guía.
- Texto pequeño de la cabecera de la guía.
- Fechas del calendario de noviembre y diciembre de 2026.

## [1.0.0] — 2026-10-27

### Añadido

- Calendario mensual imprimible en A4.
- Registro de glucosa, dosis y casilla de pinchada.
- Navegación por meses y enlaces directos.
- Guía inicial de pinchazo con pluma.
