(function () {
  const cfg = window.WEDDING_CONFIG;
  if (!cfg) return;

  // ==================== HELPERS ====================
  const $ = (sel) => document.querySelector(sel);

  let toastTimer = null;
  function showToast(message) {
    const toast = $("#toast");
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 3000);
  }

  async function copyText(text, successMsg) {
    try {
      await navigator.clipboard.writeText(text);
      showToast(successMsg);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      showToast(successMsg);
    }
  }

  // ==================== ICONOS LINEALES ====================
  const ICONS = {
    church: `
      <svg class="line-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M32 6v10M28 10h8" />
        <path d="M22 26l10-10 10 10" />
        <path d="M12 36l10-10h20l10 10" />
        <path d="M16 36v20h32V36" />
        <path d="M26 56V43a6 6 0 0 1 12 0v13" />
        <circle cx="32" cy="28" r="2.5" />
        <path d="M10 56h44" />
      </svg>`,
    party: `
      <svg class="line-icon" viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M14 50l10-26 16 16-26 10z" />
        <path d="M19 37l8 8" />
        <path d="M23 28l9 9" />
        <path d="M34 18c2-3 5-5 8-5" />
        <path d="M42 26c4-2 8-1 10 2" />
        <path d="M38 10l1.5 3.5L43 15l-3.5 1.5L38 20l-1.5-3.5L33 15l3.5-1.5L38 10z" />
        <circle cx="51" cy="18" r="1.8" fill="currentColor" />
        <circle cx="48" cy="36" r="1.6" fill="currentColor" />
        <circle cx="28" cy="14" r="1.5" fill="currentColor" />
      </svg>`
  };

  // ==================== POBLAR CONTENIDO ====================
  function hydrateContent() {
    $("#hero-names").textContent = cfg.heroSubtitle;
    $("#hero-date").textContent = cfg.dateDisplay;
    $("#welcome-quote").textContent = cfg.welcomeQuote;
    $("#rsvp-deadline").textContent = cfg.rsvp.deadlineText;
    $("#gift-subtitle").textContent = cfg.gift.subtitle;
    $("#dresscode-headline").textContent = cfg.dressCode.headline;
    $("#dresscode-style").textContent = cfg.dressCode.style;
    $("#reserved-title").textContent = cfg.dressCode.reservedTitle;
    $("#reserved-note").textContent = cfg.dressCode.reservedNote;
    $("#photos-title").textContent = cfg.photos.title;
    $("#photos-desc").textContent = cfg.photos.description;
    $("#footer-names").textContent = cfg.coupleNames;
    $("#footer-date").textContent = cfg.dateFooter;

    if (cfg.images?.hero) $("#hero-img").src = cfg.images.hero;
    if (cfg.images?.couple) $("#couple-img").src = cfg.images.couple;

    // Eventos
    const eventsContainer = $("#events-container");
    eventsContainer.innerHTML = cfg.events
      .map(
        (ev) => `
      <article class="event-block">
        ${ICONS[ev.icon] || ICONS.party}
        <h2 class="script-title event-block__title">${ev.title}</h2>
        <p class="event-block__time">${ev.time}</p>
        <p class="event-block__place">${ev.place}</p>
        <p class="event-block__address">${ev.address}</p>
        <a
          href="${ev.mapsUrl}"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn--olive"
        >CÓMO LLEGAR</a>
      </article>`
      )
      .join("");

    // Paleta de colores reservados para la novia
    const swatchesEl = $("#color-swatches");
    swatchesEl.innerHTML = cfg.dressCode.reservedColors
      .map(
        (c) => `
      <div class="swatch">
        <span class="swatch__circle" style="background-color: ${c.hex};" title="${c.name} (reservado para la novia)"></span>
        <span class="swatch__name">${c.name}</span>
      </div>`
      )
      .join("");

    // Datos bancarios
    $("#gift-alias").textContent = cfg.gift.alias;
    if (cfg.gift.cbu) {
      $("#gift-cbu").textContent = cfg.gift.cbu;
      $("#gift-cbu-row").hidden = false;
    }
    const metaParts = [];
    if (cfg.gift.holder) metaParts.push(`Titular: ${cfg.gift.holder}`);
    if (cfg.gift.bank) metaParts.push(`Banco: ${cfg.gift.bank}`);
    $("#gift-meta").textContent = metaParts.join(" · ");
    if (cfg.gift.aliasPendingNote) {
      const noteEl = $("#gift-note");
      noteEl.textContent = cfg.gift.aliasPendingNote;
      noteEl.hidden = false;
    }

    // Link de fotos y QR
    const driveLink = $("#photos-drive-link");
    driveLink.href = cfg.photos.driveUrl;
    driveLink.textContent = cfg.photos.buttonLabel;
    renderQrCode(cfg.photos.driveUrl);
  }

  // ==================== CÓDIGO QR REAL ====================
  function renderQrCode(url) {
    const container = $("#qr-code");
    if (!container) return;
    if (typeof window.qrcode === "function") {
      const qr = window.qrcode(0, "M");
      qr.addData(url);
      qr.make();
      const svgMarkup = qr.createSvgTag({ cellSize: 4, margin: 0, scalable: true });
      container.innerHTML = svgMarkup.replace(
        /<path /g,
        '<path fill="#354929" '
      );
    } else {
      container.innerHTML = `<p style="font-family:var(--font-sans);font-size:0.75rem;color:var(--text-muted)">Tocá el botón de abajo para subir tus fotos</p>`;
    }
  }

  // ==================== CUENTA REGRESIVA ====================
  function initCountdown() {
    const target = new Date(cfg.eventDateISO).getTime();
    const elDays = $("#cd-days");
    const elHours = $("#cd-hours");
    const elMinutes = $("#cd-minutes");
    const elSeconds = $("#cd-seconds");

    function update() {
      const diff = Math.max(0, target - Date.now());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      elDays.textContent = String(days).padStart(2, "0");
      elHours.textContent = String(hours).padStart(2, "0");
      elMinutes.textContent = String(minutes).padStart(2, "0");
      elSeconds.textContent = String(seconds).padStart(2, "0");
    }

    update();
    setInterval(update, 1000);
  }

  // ==================== REPRODUCTOR DE MÚSICA ====================
  function initMusicPlayer() {
    const btn = $("#music-toggle");
    const label = $("#music-label");
    const audio = $("#bg-audio");

    if (cfg.musicFile) {
      audio.src = cfg.musicFile;
    }

    btn.addEventListener("click", async () => {
      if (!audio.paused) {
        audio.pause();
        btn.classList.remove("is-playing");
        btn.setAttribute("aria-pressed", "false");
        label.textContent = "DALE PLAY!";
        return;
      }

      try {
        await audio.play();
        btn.classList.add("is-playing");
        btn.setAttribute("aria-pressed", "true");
        label.textContent = "PAUSAR MÚSICA";
      } catch {
        showToast("Agregá tu canción en assets/musica.mp3 para reproducirla");
      }
    });
  }

  // ==================== AGENDAR EN CALENDARIO (.ics) ====================
  function initCalendarButton() {
    $("#btn-calendar").addEventListener("click", () => {
      const formatICS = (iso) =>
        new Date(iso).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");

      const ics = [
        "BEGIN:VCALENDAR",
        "VERSION:2.0",
        "PRODID:-//Casamiento Ignacio y Lilen//ES",
        "BEGIN:VEVENT",
        `DTSTART:${formatICS(cfg.eventDateISO)}`,
        `DTEND:${formatICS(cfg.eventEndISO)}`,
        `SUMMARY:Casamiento de ${cfg.coupleNames}`,
        "LOCATION:Iglesia San Francisco (19:00 hs) y Recreo Argentalia (20:30 hs) - Río Cuarto, Córdoba",
        "DESCRIPTION:¡Nos casamos! Ceremonia 19:00 hs en Iglesia San Francisco y Fiesta 20:30 hs en Recreo Argentalia.",
        "END:VEVENT",
        "END:VCALENDAR"
      ].join("\r\n");

      const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "casamiento-ignacio-y-lilen.ics";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast("Evento descargado para tu calendario");
    });
  }

  // ==================== MODALES ====================
  function openModal(id) {
    const modal = $(id);
    if (!modal) return;
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    requestAnimationFrame(() => modal.classList.add("is-open"));
    document.body.style.overflow = "hidden";
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    setTimeout(() => {
      modal.hidden = true;
      document.body.style.overflow = "";
    }, 220);
  }

  function initModals() {
    $("#btn-open-rsvp").addEventListener("click", () => openModal("#modal-rsvp"));
    $("#btn-open-gift").addEventListener("click", () => openModal("#modal-gift"));

    document.querySelectorAll("[data-close-modal]").forEach((btn) => {
      btn.addEventListener("click", () => closeModal(btn.closest(".modal-overlay")));
    });

    document.querySelectorAll(".modal-overlay").forEach((overlay) => {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal(overlay);
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-overlay.is-open").forEach(closeModal);
      }
    });

    $("#btn-copy-alias").addEventListener("click", () => {
      copyText(cfg.gift.alias, "¡Alias copiado al portapapeles!");
    });

    const copyCbuBtn = $("#btn-copy-cbu");
    if (copyCbuBtn) {
      copyCbuBtn.addEventListener("click", () => {
        copyText(cfg.gift.cbu, "¡CBU copiado al portapapeles!");
      });
    }
  }

  // ==================== FORMULARIO RSVP ====================
  function initRsvpForm() {
    const form = $("#rsvp-form");
    const attendingFields = $("#rsvp-attending-fields");
    const guestsSelect = $("#rsvp-guests");
    const companionsField = $("#rsvp-companions-field");
    const feedback = $("#rsvp-feedback");
    const submitBtn = $("#rsvp-submit");

    form.querySelectorAll('input[name="asiste"]').forEach((radio) => {
      radio.addEventListener("change", () => {
        attendingFields.hidden = radio.value !== "Sí";
      });
    });

    guestsSelect.addEventListener("change", () => {
      companionsField.hidden = Number(guestsSelect.value) <= 1;
    });

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      feedback.textContent = "";
      feedback.className = "form-feedback";

      const nombre = $("#rsvp-name").value.trim();
      if (!nombre) {
        feedback.textContent = "Por favor, ingresá tu nombre y apellido.";
        feedback.classList.add("is-error");
        $("#rsvp-name").focus();
        return;
      }

      const asiste = form.querySelector('input[name="asiste"]:checked')?.value || "Sí";
      const payload = {
        nombre,
        asiste,
        cantidad: asiste === "Sí" ? Number(guestsSelect.value) : 0,
        acompanantes: asiste === "Sí" ? $("#rsvp-companions").value.trim() : "",
        menu: asiste === "Sí" ? $("#rsvp-diet").value : "-",
        cancion: asiste === "Sí" ? $("#rsvp-song").value.trim() : "",
        mensaje: $("#rsvp-message").value.trim()
      };

      // Si todavía no se configuró la URL de Google Apps Script
      if (!cfg.rsvp.googleScriptUrl) {
        if (cfg.rsvp.whatsappFallback) {
          const text = encodeURIComponent(
            `¡Hola! Confirmación para el casamiento de ${cfg.coupleNames}:\n` +
              `• Nombre: ${payload.nombre}\n` +
              `• Asiste: ${payload.asiste}\n` +
              (payload.asiste === "Sí"
                ? `• Personas: ${payload.cantidad}\n• Menú: ${payload.menu}\n` +
                  (payload.acompanantes ? `• Acompañantes: ${payload.acompanantes}\n` : "") +
                  (payload.cancion ? `• Canción sugerida: ${payload.cancion}\n` : "")
                : "") +
              (payload.mensaje ? `• Mensaje: ${payload.mensaje}` : "")
          );
          window.open(`https://wa.me/${cfg.rsvp.whatsappFallback}?text=${text}`, "_blank");
          return;
        }

        feedback.textContent =
          "Formulario listo. Falta pegar la URL de Google Apps Script en config.js para guardar respuestas en tu planilla de Google Sheets.";
        feedback.classList.add("is-error");
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "ENVIANDO...";

      try {
        await fetch(cfg.rsvp.googleScriptUrl, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify(payload)
        });

        feedback.textContent =
          asiste === "Sí"
            ? "¡Gracias por confirmar! Nos hace muy felices compartir este día con vos."
            : "Gracias por avisarnos. ¡Te vamos a extrañar!";
        feedback.classList.add("is-success");
        form.reset();
        attendingFields.hidden = false;
        companionsField.hidden = true;
        showToast("¡Confirmación registrada!");
      } catch {
        feedback.textContent =
          "Hubo un problema al enviar tu confirmación. Por favor, intentá nuevamente.";
        feedback.classList.add("is-error");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "ENVIAR CONFIRMACIÓN";
      }
    });
  }

  // ==================== ANIMACIONES AL SCROLLEAR ====================
  function initScrollReveal() {
    const els = document.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    els.forEach((el) => observer.observe(el));
  }

  // ==================== INIT ====================
  hydrateContent();
  initCountdown();
  initMusicPlayer();
  initCalendarButton();
  initModals();
  initRsvpForm();
  initScrollReveal();
})();
