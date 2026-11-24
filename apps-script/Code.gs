/**
 * Google Apps Script — Conector RSVP -> Google Sheets
 * Planilla: "Casamiento Ignacio y Lilén - Confirmaciones"
 *
 * CÓMO ACTIVARLO (1 minuto):
 * 1. Abrí tu planilla en Google Sheets.
 * 2. Andá a Extensiones > Apps Script.
 * 3. Borrá el contenido que aparece y pegá todo este código.
 * 4. Tocá "Implementar" (arriba a la derecha) > "Nueva implementación".
 * 5. Tipo: "Aplicación web".
 *    - Ejecutar como: "Yo"
 *    - Quién tiene acceso: "Cualquier persona"
 * 6. Copiá la "URL de la aplicación web" y pegala en config.js -> rsvp.googleScriptUrl
 */

const SHEET_NAME = "Confirmaciones";

function doPost(e) {
  try {
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];
    const data = JSON.parse(e.postData.contents || "{}");

    const now = Utilities.formatDate(
      new Date(),
      "America/Argentina/Cordoba",
      "dd/MM/yyyy HH:mm"
    );

    sheet.appendRow([
      now,
      data.nombre || "",
      data.asiste || "Sí",
      Number(data.cantidad || 0),
      data.acompanantes || "",
      data.menu || "",
      data.cancion || "",
      data.mensaje || ""
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({ ok: true })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(
      JSON.stringify({ ok: false, error: String(err) })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService.createTextOutput(
    JSON.stringify({ ok: true, message: "RSVP Casamiento Ignacio y Lilén activo" })
  ).setMimeType(ContentService.MimeType.JSON);
}
