// ============================================================
// CONFIGURACIÓN CENTRAL — CASAMIENTO IGNACIO Y LILÉN
// Editá cualquier dato acá y los cambios se reflejan en toda la web.
// ============================================================

window.WEDDING_CONFIG = {
  // Nombres y fecha del evento
  coupleNames: "Ignacio y Lilén",
  heroSubtitle: "Ignacio & Lilén",
  dateDisplay: "20.03.2027",
  dateFooter: "20 · 03 · 2027",
  // Fecha exacta del inicio de la ceremonia (Hora Argentina GMT-3)
  eventDateISO: "2027-03-20T19:00:00-03:00",
  eventEndISO: "2027-03-21T05:00:00-03:00",

  // Música de fondo (guardá tu archivo MP3 en assets/musica.mp3)
  musicFile: "assets/musica.mp3",

  // Frase de bienvenida
  welcomeQuote:
    "Dicen que la felicidad es aún más grande cuando se comparte... Por eso queremos que seas parte de nuestro gran día.",

  // Eventos (Solo Ceremonia Religiosa + Fiesta)
  events: [
    {
      id: "ceremonia",
      icon: "church",
      title: "Ceremonia",
      time: "19:00 Hs.",
      place: "IGLESIA SAN FRANCISCO",
      address: "Alvear 620 · Río Cuarto, Córdoba",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Iglesia+San+Francisco+Solano+Alvear+620+Rio+Cuarto+Cordoba"
    },
    {
      id: "fiesta",
      icon: "party",
      title: "Fiesta",
      time: "20:30 Hs.",
      place: "RECREO ARGENTALIA",
      address: "Ex Ruta 36 · Río Cuarto, Córdoba",
      mapsUrl:
        "https://www.google.com/maps/search/?api=1&query=Recreo+Argentalia+Rio+Cuarto+Cordoba"
    }
  ],

  // Confirmación de asistencia (RSVP -> Google Sheets vía Apps Script)
  rsvp: {
    deadlineText:
      "Nos encantaría contar con tu presencia. Por favor, confirmá tu asistencia antes del 20 de Febrero de 2027.",
    // Pegá aquí la URL del Web App de Google Apps Script (ver README.md)
    // Ejemplo: "https://script.google.com/macros/s/AKfycb.../exec"
    googleScriptUrl: "",
    // Opcional: si querés un respaldo por WhatsApp (formato internacional sin +, ej. "5493581234567")
    whatsappFallback: ""
  },

  // Datos bancarios / Regalos (dejá vacío lo que no quieras mostrar)
  gift: {
    subtitle:
      "Tu presencia es nuestro mejor regalo. Si además deseás hacernos un presente, te dejamos nuestros datos:",
    alias: "A.DEFINIR.IGNA.LI",
    aliasPendingNote: "Alias provisorio — próximamente actualizaremos el definitivo.",
    cbu: "",
    bank: "",
    holder: "Ignacio y Lilén"
  },

  // Dress Code y paleta reservada para la novia
  dressCode: {
    headline: "HAGAMOS JUNTOS UNA FIESTA INOLVIDABLE",
    style: "ELEGANTE · GALA · ELEGANTE SPORT",
    reservedTitle: "Colores reservados para la novia",
    reservedNote:
      "Por favor, evitá vestir blanco y toda su gama de tonos claros para que brillen únicamente en Lilén.",
    reservedColors: [
      { name: "Blanco", hex: "#FFFFFF" },
      { name: "Blanco roto", hex: "#FAF7F0" },
      { name: "Marfil", hex: "#F4ECD8" },
      { name: "Crema", hex: "#EFE2C6" },
      { name: "Champagne", hex: "#E7D5B8" },
      { name: "Beige claro", hex: "#DFCCB1" }
    ]
  },

  // Sección Fotos (Carpeta real creada en tu Google Drive)
  photos: {
    title: "Fotos",
    description:
      "Compartí tus momentos con nosotros. Escaneá el código QR o tocá el botón para subir tus fotos y videos de la fiesta a nuestro álbum.",
    driveUrl:
      "https://drive.google.com/drive/folders/1orB_gO9y9F0OphedrHxoBN4p_beIe2BY",
    buttonLabel: "SUBIR FOTOS AL DRIVE"
  },

  // Rutas de imágenes (reemplazá estos archivos cuando tengan sus fotos finales)
  images: {
    hero: "assets/foto-portada.jpg",
    couple: "assets/foto-pareja.jpg",
    eucalyptus: "assets/eucalipto.jpg"
  }
};
