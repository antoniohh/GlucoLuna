# GlucoLuna

[![Versión](https://img.shields.io/badge/versi%C3%B3n-2.0.0-1e3a8a?style=flat-square)](CHANGELOG.md)
[![Astro](https://img.shields.io/badge/Astro-7.4.2-BC52EE?style=flat-square&logo=astro&logoColor=white)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3.3-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Lucide](https://img.shields.io/badge/Lucide-1.62.0-F56565?style=flat-square&logo=lucide&logoColor=white)](https://lucide.dev)
[![Node](https://img.shields.io/badge/Node-22.23.4%2B-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org)
[![Licencia](https://img.shields.io/badge/licencia-MIT-yellow?style=flat-square)](LICENSE)
[![Deploy](https://img.shields.io/badge/deploy-GitHub%20Pages-1e3a8a?style=flat-square&logo=github&logoColor=white)](https://antoniohh.github.io/GlucoLuna/)

**Calendario nocturno de glucosa y guía visual de pinchazo con pluma.**

GlucoLuna reúne dos herramientas pensadas para usar en casa:

- Un **calendario mensual imprimible** para apuntar la glucosa (`mg/dL`), la dosis (`Unid.`) y marcar la casilla de pinchada.
- Una **guía visual de pinchazo** con letra grande, dibujos y explicaciones paso a paso para preparar la pluma, ajustar la dosis, poner y quitar la aguja y actuar si baja el azúcar.

No necesita registro ni base de datos. Es una web estática, sin React ni islas de cliente: **Astro genera HTML estático**, y el JavaScript solo se usa para el menú móvil, la navegación del calendario y el ajuste de las hojas A4.

## Stack

- **Astro 7** — páginas y componentes estáticos.
- **Tailwind CSS 4** — utilidades de layout y componentes nuevos.
- **Lucide (`@lucide/astro`)** — iconos de interfaz.
- **CSS propio** — hojas A4, impresión y las ilustraciones médicas paso a paso.
- **GitHub Actions** — despliegue automático en GitHub Pages.

No se añade React: no hay estado compartido ni interactividad compleja que lo justifique. Astro + JavaScript puntual es más ligero y mantiene la web rápida.

## Estructura

```text
GlucoLuna/
├── src/
│   ├── components/
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── PageHeader.astro
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── lib/
│   │   └── site.ts
│   ├── pages/
│   │   ├── index.astro
│   │   ├── calendario.astro
│   │   ├── guia-pinchazo.astro
│   │   └── 404.astro
│   ├── scripts/
│   │   ├── ui.js
│   │   ├── calendario.js
│   │   └── guia.js
│   └── styles/
│       ├── global.css
│       ├── base.css
│       ├── landing.css
│       ├── calendario.css
│       └── guia.css
├── public/
│   ├── assets/
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── site.webmanifest
│   └── .nojekyll
├── .github/workflows/
│   ├── deploy.yml
│   └── release.yml
├── astro.config.mjs
├── package.json
├── LICENSE
├── CHANGELOG.md
└── README.md
```

## Desarrollo

```bash
npm install
npm run dev
```

Abre la URL que indique Astro. La web se sirve con la base `/GlucoLuna/`, igual que en GitHub Pages.

### Otros comandos

```bash
npm run build      # genera dist/
npm run preview    # sirve dist/ localmente
npm run check      # comprobación de Astro
```

## Cómo usarlo

- **Inicio:** portada con acceso al calendario y a la guía.
- **Calendario:** elige mes y año. Pulsa **«Imprimir mes»** para sacar una hoja A4.
- **Guía:** 4 hojas A4 con 10 pasos visuales, zonas, cuidados y seguridad.
- **Enlaces directos:** `/calendario/?m=11&y=2026` abre noviembre de 2026.

## Impresión

En el diálogo del navegador:

| Ajuste | Valor |
|---|---|
| Destino | Impresora o «Guardar como PDF» |
| Tamaño de papel | A4 |
| Orientación | Vertical |
| Márgenes | **Ninguno** |
| Escala | 100 % |
| **Gráficos de fondo** | **Activado** |
| Encabezados y pies de página | Desactivados |

«Gráficos de fondo» es necesario para que se impriman los bloques azules del calendario y de la guía.

## Móvil y accesibilidad

- Cabecera fija de **64 px** en móvil y **76 px** en escritorio. El menú móvil es un panel superpuesto y no cambia la altura.
- La guía pasa a **modo lectura** en pantallas pequeñas: pasos apilados, texto más grande y dibujos debajo.
- El calendario se escala al ancho disponible y se puede ampliar con los dedos.
- Se respetan `prefers-reduced-motion`, el foco visible y los enlaces de salto de contenido.

## Despliegue en GitHub Pages

El repositorio ya está configurado para `https://antoniohh.github.io/GlucoLuna/`.

1. Sube los cambios a `main`.
2. En GitHub entra en **Settings → Pages**.
3. En **Build and deployment**, elige **GitHub Actions**.
4. El workflow `.github/workflows/deploy.yml` hará el build y publicará `dist/` automáticamente.

La configuración de Astro ya incluye:

- `site: "https://antoniohh.github.io"`
- `base: "/GlucoLuna"`
- `build.format: "directory"`
- Sitemap estático en `public/sitemap.xml`

Si cambias el nombre del repositorio o el usuario, actualiza `src/lib/site.ts` y `astro.config.mjs`.

## SEO

- Títulos y descripciones únicos por página.
- Canónicas, Open Graph y Twitter Cards.
- Datos estructurados JSON-LD (`WebSite`, `WebApplication`, `FAQPage`, `MedicalWebPage`).
- `sitemap.xml` y `robots.txt` en `public/`, copiados al build.
- Imagen social `public/assets/og-image.png`.
- Página 404 y manifiesto PWA.

## Control de versiones

Versión actual: **2.0.0** · [Historial completo](CHANGELOG.md)

| Versión | Fecha | Cambios principales |
|---|---|---|
| **2.0.0** | 2026-10-28 | Astro 7, Tailwind 4, Lucide, GitHub Pages y licencia MIT |
| 1.1.0 | 2026-10-28 | Landing, menú fijo, guía visual y responsive |
| 1.0.0 | 2026-10-27 | Calendario A4 y guía inicial |

Para publicar una release:

```bash
git tag -a v2.0.0 -m "GlucoLuna 2.0.0"
git push origin v2.0.0
```

El workflow `release.yml` crea la release en GitHub y adjunta un ZIP del sitio compilado.

## Autoría y licencia

Creado por [Antonio Horrillo](https://github.com/antoniohh).

Código y contenido bajo licencia [MIT](LICENSE). El contenido sanitario es orientativo y no sustituye la atención profesional.

## Aviso médico

GlucoLuna es una herramienta de apoyo para organizar el registro y repasar los pasos del pinchazo. **No sustituye las instrucciones del médico, enfermera o farmacéutico.** La dosis, la pauta y el tipo de aguja deben ser siempre los de la prescripción personal. Ante una urgencia, llama al **112**.
