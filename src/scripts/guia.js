/* ============================================================
   GlucoLuna · guía de pinchazo
   Ajuste de las hojas A4 al ancho de pantalla y botón de impresión
   ============================================================ */

(function () {
  const A4_WIDTH_PX = (210 * 96) / 25.4;
  const frame = document.getElementById("guide-pages");
  const pages = frame ? Array.from(frame.querySelectorAll(".page")) : [];
  const printButton = document.getElementById("print-guide");
  const mobileReading = window.matchMedia("(max-width: 760px)");

  if (!frame || !pages.length) {
    return;
  }

  function fitPages() {
    if (mobileReading.matches) {
      pages.forEach((page) => page.style.removeProperty("zoom"));
      return;
    }

    const scale = Math.min(1, frame.clientWidth / A4_WIDTH_PX);

    pages.forEach((page) => {
      if (scale < 1) {
        page.style.zoom = String(scale);
      } else {
        page.style.removeProperty("zoom");
      }
    });
  }

  let timer = 0;

  function scheduleFit() {
    window.clearTimeout(timer);
    timer = window.setTimeout(fitPages, 80);
  }

  if (printButton) {
    printButton.addEventListener("click", () => window.print());
  }

  window.addEventListener("resize", scheduleFit);
  window.addEventListener("orientationchange", scheduleFit);
  window.addEventListener("load", fitPages);

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(fitPages);
  }

  if ("ResizeObserver" in window) {
    new ResizeObserver(scheduleFit).observe(frame);
  }

  if (mobileReading.addEventListener) {
    mobileReading.addEventListener("change", fitPages);
  }

  fitPages();
})();
