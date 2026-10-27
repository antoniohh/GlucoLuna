/* ============================================================
   GlucoLuna · interacción común
   Menú móvil con altura fija (no desplaza el contenido)
   ============================================================ */

(function () {
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("mobile-menu");

  if (!toggle || !menu) {
    return;
  }

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    menu.classList.toggle("is-open", open);
    menu.setAttribute("aria-hidden", String(!open));
  };

  setOpen(false);

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      setOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setOpen(false);
      toggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    if (
      toggle.getAttribute("aria-expanded") === "true" &&
      !menu.contains(event.target) &&
      !toggle.contains(event.target)
    ) {
      setOpen(false);
    }
  });

  const desktop = window.matchMedia("(min-width: 761px)");
  const onChange = (event) => {
    if (event.matches) {
      setOpen(false);
    }
  };

  if (desktop.addEventListener) {
    desktop.addEventListener("change", onChange);
  } else {
    desktop.addListener(onChange);
  }
})();
