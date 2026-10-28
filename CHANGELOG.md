# Changelog

Todas las versiones relevantes de GlucoLuna. El proyecto sigue [Versionado Semántico](https://semver.org/lang/es/).

## [2.0.0] — 2026-10-28

### Añadido

- Migración completa a **Astro 7** con salida estática.
- **Tailwind CSS 4** para la capa de layout y componentes.
- Iconos **Lucide** mediante `@lucide/astro`.
- Despliegue automático en GitHub Pages con GitHub Actions.
- Workflow de release para etiquetas `v*`.
- Licencia MIT y autoría en el pie de página.
- `CHANGELOG.md`, badges y control de versiones en el README.
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
