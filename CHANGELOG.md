# Changelog

Todas las versiones relevantes de GlucoLuna. El proyecto sigue [Versionado Semántico](https://semver.org/lang/es/).

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
