/* ============================================================
   GlucoLuna · calendario mensual
   Genera una hoja A4 y la ajusta al ancho de la pantalla
   ============================================================ */

const MONTHS = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

const WEEKDAYS = [
  "LUNES", "MARTES", "MIÉRCOLES", "JUEVES", "VIERNES", "SÁBADO", "DOMINGO",
];

const LEGEND = [
  { key: "1º Línea de<br>arriba", desc: "Apuntar medida máquina<br>(mg/dL)" },
  { key: "2º Línea de<br>abajo", desc: "Apuntar dosis a poner<br>(Unid.)" },
  { key: "3º<br>Cuadrado", desc: "Marcar X al haberse<br>pinchado" },
];

const REMINDER = [
  "Medir el azúcar y apuntar arriba (mg/dL).",
  "Apuntar la dosis en la segunda línea (Unid.).",
  "Marcar con una X el cuadrado de PINCHADA nada más aplicarse la dosis.",
];

const A4_WIDTH_PX = (210 * 96) / 25.4;

const state = {
  year: 2026,
  month: 9, // 0 = enero
};

// Enlaces directos: /calendario/?m=11&y=2026
const params = new URLSearchParams(window.location.search);
const queryMonth = Number(params.get("m"));
const queryYear = Number(params.get("y"));

if (Number.isInteger(queryMonth) && queryMonth >= 1 && queryMonth <= 12) {
  state.month = queryMonth - 1;
}

if (Number.isInteger(queryYear) && queryYear >= 2000 && queryYear <= 2100) {
  state.year = queryYear;
}

const frame = document.getElementById("sheet-frame");
const monthSelect = document.getElementById("start-month");
const yearInput = document.getElementById("start-year");

/* ---------- Utilidades ---------- */

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);

/* ---------- Plantillas ---------- */

function headerTemplate(monthName) {
  return `
    <header class="sheet-header">
      <div class="title-row">
        <div>
          <h1>CONTROL NOCTURNO DE AZÚCAR Y DOSIS</h1>
          <p class="subtitle">Calendario mensual — Apuntar cada noche la medición, la dosis y marcar la casilla al pincharse</p>
        </div>
        <div class="month-badge">${monthName.toUpperCase()}</div>
      </div>
      <div class="identity">
        <div class="identity__row">
          <span>NOMBRE:</span>
          <div class="identity__line"></div>
        </div>
        <div class="identity__row">
          <span>PAUTA MÉDICA:</span>
          <div class="identity__line"></div>
        </div>
      </div>
    </header>
  `;
}

function legendTemplate() {
  return `
    <section class="legend" aria-label="Cómo rellenar el calendario">
      ${LEGEND.map((item) => `
        <div class="legend__item">
          <div class="legend__key">${item.key}</div>
          <div class="legend__desc">${item.desc}</div>
        </div>
      `).join("")}
    </section>
  `;
}

function dayTemplate(day) {
  return `
    <div class="cell day" role="gridcell" aria-label="Día ${day}">
      <span class="day__num" aria-hidden="true">${day}</span>
      <div class="day__fields">
        <div class="field field--glucose">
          <span class="field__line"></span>
          <span class="field__unit">mg/dL</span>
        </div>
        <div class="field field--dose">
          <span class="field__line"></span>
          <span class="field__unit">Unid.</span>
        </div>
        <div class="pinch">
          <span>PINCHADA</span>
          <span class="pinch__box" aria-hidden="true"></span>
        </div>
      </div>
    </div>
  `;
}

function noteTemplate({ title, items = [], monthName = "", span = 1, trailing = false }) {
  if (!trailing && span === 1) {
    return `
      <div class="cell note-compact" role="gridcell" aria-label="Recordatorio">
        <span class="note-compact__month">${monthName.toUpperCase()}</span>
        <ul class="note-compact__list">
          <li>1º Medida</li>
          <li>2º Dosis</li>
          <li>3º Pinchada</li>
        </ul>
      </div>
    `;
  }

  if (trailing && span === 1) {
    return `
      <div class="cell note" role="gridcell" aria-label="Notas">
        <p class="note__title">NOTAS:</p>
      </div>
    `;
  }

  return `
    <div class="cell note${span < 3 ? " note--narrow" : ""}" role="gridcell" aria-label="${escapeHtml(title)}">
      <p class="note__title">${escapeHtml(title)}</p>
      ${items.length ? `<ol class="note__list">${items.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>` : ""}
    </div>
  `;
}

/* ---------- Calendario ---------- */

function calendarTemplate(year, month) {
  const first = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const lead = (first.getDay() + 6) % 7; // lunes = 0
  const totalCells = Math.ceil((lead + daysInMonth) / 7) * 7;
  const rows = totalCells / 7;
  const monthName = MONTHS[month];

  const cells = [];

  WEEKDAYS.forEach((name, index) => {
    cells.push(`
      <div class="weekday" role="columnheader" style="grid-row:1;grid-column:${index + 1}">${name}</div>
    `);
  });

  if (lead > 0) {
    cells.push(`
      <div style="grid-row:2;grid-column:1 / span ${lead};display:flex;min-width:0">
        ${noteTemplate({
          title: "RECUERDE CADA NOCHE:",
          items: REMINDER,
          monthName,
          span: lead,
        })}
      </div>
    `);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    const index = lead + day - 1;
    const row = Math.floor(index / 7) + 2;
    const column = (index % 7) + 1;

    cells.push(`
      <div style="grid-row:${row};grid-column:${column};display:flex;min-width:0;min-height:0">
        ${dayTemplate(day)}
      </div>
    `);
  }

  const trailing = totalCells - (lead + daysInMonth);
  if (trailing > 0) {
    const index = lead + daysInMonth;
    const row = Math.floor(index / 7) + 2;
    const column = (index % 7) + 1;

    cells.push(`
      <div style="grid-row:${row};grid-column:${column} / span ${trailing};display:flex;min-width:0;min-height:0">
        ${noteTemplate({
          title: trailing > 1 ? "NOTAS / OBSERVACIONES MÉDICAS:" : "NOTAS:",
          span: trailing,
          trailing: true,
        })}
      </div>
    `);
  }

  return `
    <section class="sheet" aria-label="Calendario de ${monthName} de ${year}">
      ${headerTemplate(monthName)}
      ${legendTemplate()}
      <div class="calendar" role="grid" aria-label="Calendario de ${monthName} de ${year}" style="--rows:${rows}">
        ${cells.join("")}
      </div>
      <footer class="sheet-footer">
        <span>Registro Mensual de Control Nocturno (Glucosa y Dosis) — ${monthName.toUpperCase()}</span>
      </footer>
    </section>
  `;
}

/* ---------- Ajuste al ancho de pantalla ---------- */

function fitSheet() {
  const sheet = frame.querySelector(".sheet");

  if (!sheet) {
    return;
  }

  const styles = window.getComputedStyle(frame);
  const horizontalPadding =
    (parseFloat(styles.paddingLeft) || 0) + (parseFloat(styles.paddingRight) || 0);
  const available = frame.clientWidth - horizontalPadding;
  const scale = Math.min(1, available / A4_WIDTH_PX);

  if (scale < 1) {
    sheet.style.zoom = String(scale);
  } else {
    sheet.style.removeProperty("zoom");
  }
}

let resizeTimer = 0;

function scheduleFit() {
  window.clearTimeout(resizeTimer);
  resizeTimer = window.setTimeout(fitSheet, 80);
}

/* ---------- Render ---------- */

function updateUrl() {
  try {
    const url = new URL(window.location.href);
    url.searchParams.set("m", state.month + 1);
    url.searchParams.set("y", state.year);
    window.history.replaceState({}, "", url);
  } catch (error) {
    // file:// o navegadores restrictivos: no es imprescindible.
  }
}

function render() {
  const { year, month } = state;

  frame.innerHTML = calendarTemplate(year, month);
  document.title = `Calendario de ${MONTHS[month]} de ${year} | GlucoLuna`;
  updateUrl();
  requestAnimationFrame(fitSheet);
}

function shiftMonth(delta) {
  const absolute = state.year * 12 + state.month + delta;
  state.year = Math.floor(absolute / 12);
  state.month = ((absolute % 12) + 12) % 12;

  yearInput.value = state.year;
  monthSelect.value = state.month;
  render();
}

/* ---------- Inicialización ---------- */

MONTHS.forEach((name, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.textContent = name.charAt(0).toUpperCase() + name.slice(1);
  monthSelect.appendChild(option);
});

monthSelect.value = state.month;
yearInput.value = state.year;

monthSelect.addEventListener("change", () => {
  state.month = Number(monthSelect.value);
  render();
});

yearInput.addEventListener("change", () => {
  const value = Number(yearInput.value);

  if (!Number.isInteger(value) || value < 2000 || value > 2100) {
    yearInput.value = state.year;
    return;
  }

  state.year = value;
  render();
});

document.getElementById("prev").addEventListener("click", () => shiftMonth(-1));
document.getElementById("next").addEventListener("click", () => shiftMonth(1));
document.getElementById("print").addEventListener("click", () => window.print());

document.addEventListener("keydown", (event) => {
  if (event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement) {
    return;
  }

  if (event.key === "ArrowLeft") {
    event.preventDefault();
    shiftMonth(-1);
  }

  if (event.key === "ArrowRight") {
    event.preventDefault();
    shiftMonth(1);
  }
});

window.addEventListener("resize", scheduleFit);
window.addEventListener("orientationchange", scheduleFit);
window.addEventListener("load", fitSheet);

if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(fitSheet);
}

if ("ResizeObserver" in window) {
  new ResizeObserver(scheduleFit).observe(frame);
}

render();
