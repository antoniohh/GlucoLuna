# GlucoLuna

**Calendario nocturno de glucosa y guía visual de pinchazo con pluma.**

GlucoLuna reúne dos herramientas pensadas para usar en casa:

- Un **calendario mensual imprimible** para apuntar la glucosa (`mg/dL`), la dosis (`Unid.`) y marcar la casilla de pinchada.
- Una **guía visual de pinchazo** con letra grande, dibujos y explicaciones paso a paso para preparar la pluma, ajustar la dosis, poner y quitar la aguja y actuar si baja el azúcar.

No necesita registro, instalación ni conexión a internet. Funciona abriendo los archivos HTML en el navegador y está preparada para publicarse en GitHub Pages.

## Estructura del proyecto

```
glucoluna/
├── index.html                    Portada / landing
├── calendario.html               Calendario mensual A4
├── guia-pinchazo.html            Guía visual de pinchazo
├── 404.html                      Página de error para GitHub Pages
├── css/
│   ├── base.css                  Cabecera, menú, botones, pie y estilos comunes
│   ├── landing.css               Portada
│   ├── calendario.css            Hoja A4 y controles del calendario
│   └── guia.css                  Guía visual, hojas A4 y modo lectura móvil
├── js/
│   ├── ui.js                     Menú móvil de altura fija
│   ├── calendario.js             Generación del mes y ajuste A4 en pantalla
│   └── guia.js                   Ajuste de la guía e impresión
├── assets/
│   ├── favicon.svg
│   ├── apple-touch-icon.png
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── og-image.png              Imagen para redes sociales
│   └── og-image.svg              Fuente de la imagen social
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── .nojekyll
└── README.md
```

## Cómo ejecutarlo

### Opción 1 — Abrir directamente

Haz doble clic en `index.html` o ejecuta:

```bash
xdg-open index.html
```

No hay dependencias ni compilación.

### Opción 2 — Servidor local

```bash
cd /home/antoniohh/Proyectos/glucoluna
python3 -m http.server 8000
```

Abre <http://localhost:8000>.

## Cómo usarlo

- **Portada:** explica la app y enlaza al calendario y a la guía.
- **Menú:** `Inicio`, `Calendario` y `Guía de pinchazo`. Mantiene siempre la misma altura, también en móvil.
- **Calendario:** elige mes y año con las flechas o los selectores. Pulsa **«Imprimir mes»** para sacar una sola hoja A4.
- **Guía:** muestra 4 hojas A4 con 10 pasos visuales, zonas, cuidados y seguridad. Puedes imprimirla directamente desde el navegador.
- **Enlaces directos:** `calendario.html?m=11&y=2026` abre noviembre de 2026.

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

«Gráficos de fondo» es importante para que se impriman los bloques azules del calendario y de la guía.

## Móvil y accesibilidad

- Cabecera fija de **64 px** en móvil y **76 px** en escritorio. El menú móvil se abre como panel superpuesto y **no cambia la altura** ni empuja el contenido.
- La guía cambia a un **modo lectura** en pantallas pequeñas: los pasos se apilan, el texto crece y los dibujos pasan debajo. La impresión sigue saliendo en A4.
- El calendario se escala para caber en el ancho del móvil; se puede ampliar con los dedos.
- Se respetan `prefers-reduced-motion`, el foco visible y los enlaces de salto de contenido.
- Todos los textos e imágenes tienen alternativa o descripción accesible.

## Publicar en GitHub Pages

La web es completamente estática y usa rutas relativas, así que funciona en un repositorio de proyecto.

1. **Sustituye los placeholders de URL.** Busca `TUUSUARIO` en los HTML, `sitemap.xml` y `robots.txt`:

   ```bash
   grep -rl "TUUSUARIO" index.html calendario.html guia-pinchazo.html sitemap.xml robots.txt
   sed -i 's/TUUSUARIO/tu-usuario-de-github/g' index.html calendario.html guia-pinchazo.html sitemap.xml robots.txt
   ```

   Si el repositorio no se llama `glucoluna`, cambia también `glucoluna` por el nombre real en las mismas URLs.

2. **Crea el repositorio** en GitHub con el nombre `glucoluna` (o el que hayas elegido).

3. **Sube el proyecto:**

   ```bash
   git init
   git add .
   git commit -m "GlucoLuna: calendario y guía de pinchazo"
   git branch -M main
   git remote add origin https://github.com/tu-usuario-de-github/glucoluna.git
   git push -u origin main
   ```

4. En GitHub entra en **Settings → Pages**.
5. En **Build and deployment**, elige **Deploy from a branch**.
6. Selecciona la rama **main** y la carpeta **/(root)**. Guarda.
7. La web quedará en:

   ```
   https://tu-usuario-de-github.github.io/glucoluna/
   ```

El archivo `.nojekyll` ya está incluido para que GitHub Pages no procese el sitio con Jekyll.

## SEO incluido

- Títulos y descripciones únicos por página.
- `lang="es"`, `viewport`, `theme-color` y `robots`.
- URLs canónicas y Open Graph/Twitter Cards.
- Imagen social `assets/og-image.png` (1200 × 630).
- Datos estructurados JSON-LD: `WebSite`, `WebApplication`, `FAQPage`, `MedicalWebPage` y migas de pan.
- `sitemap.xml`, `robots.txt` y `site.webmanifest`.
- Página `404.html` y `.nojekyll` para GitHub Pages.

Antes de publicar, revisa que las URLs canónicas, `og:url`, `og:image`, `sitemap.xml` y `robots.txt` apunten a tu usuario y repositorio reales.

## Aviso médico

GlucoLuna es una herramienta de apoyo para organizar el registro y repasar los pasos del pinchazo. **No sustituye las instrucciones del médico, enfermera o farmacéutico.** La dosis, la pauta y el tipo de aguja deben ser siempre los de la prescripción personal. Ante una urgencia, llama al **112**.
