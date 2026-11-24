# Invitación de Casamiento — Ignacio y Lilén (20.03.2027)

Invitación web *mobile-first* lista para compartir por WhatsApp y publicada con **GitHub Pages**.

## Personalización rápida (`config.js`)

Todo el contenido editable está centralizado en [`config.js`](config.js):
- **Alias / CBU / Banco:** editá `gift.alias` (y opcionalmente `cbu`, `bank`, `holder`).
- **Fecha límite de confirmación:** editá `rsvp.deadlineText`.
- **Fotos:** reemplazá los archivos en `assets/` manteniendo los mismos nombres:
  - `assets/foto-portada.jpg` (portada principal vertical)
  - `assets/foto-pareja.jpg` (foto secundaria horizontal)
- **Música:** guardá el `.mp3` que elijan en `assets/musica.mp3`.

## Conectar el formulario RSVP con tu planilla de Google Sheets (1 minuto)

1. Abrí tu planilla **Casamiento Ignacio y Lilén - Confirmaciones** en Google Sheets.
2. En el menú superior, abrí **Extensiones → Apps Script**.
3. Pegá el contenido de [`apps-script/Code.gs`](apps-script/Code.gs) y guardá.
4. Tocá **Implementar → Nueva implementación**:
   - Tipo: **Aplicación web**
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier persona**
5. Copiá la URL que te da Google (`https://script.google.com/macros/s/.../exec`) y pegala en `config.js` dentro de `rsvp.googleScriptUrl`.
6. Hacé `git push` y cada respuesta que envíen tus invitados aparecerá automáticamente en la pestaña **Confirmaciones** y actualizará las métricas de **Resumen**.

## Habilitar la carga de fotos en la carpeta de Google Drive

El código QR y el botón **Subir fotos al Drive** ya apuntan a tu carpeta `Fotos - Casamiento Ignacio y Lilén`.
Para que los invitados puedan subir archivos sin pedirte permiso uno por uno:
1. Abrí la carpeta en Google Drive → **Compartir**.
2. En *Acceso general*, cambiá a **Cualquier persona con el enlace** → rol **Editor**.
