# Web de promociones y carta – Avellaneda, Santa Fe

Sitio estático (HTML + CSS + JavaScript, sin dependencias ni build). Listo para GitHub Pages.

## Estructura
```
index.html          página única (Inicio, Promociones, Nuestra carta, Ubicación, Mi pedido)
css/style.css       estilos (tema oscuro; colores en :root)
js/data.js          DATOS EDITABLES: WhatsApp, promociones, carta, precios, fotos
js/app.js           lógica: carrito, buscadores, animaciones, formulario
assets/images/      ilustraciones de promos y platos (SVG) + hero + favicon
.nojekyll           evita que GitHub Pages procese el sitio con Jekyll
```
Todas las rutas son relativas (sin `/` inicial), por lo que funciona en `usuario.github.io/repositorio/`.

## Publicar en GitHub Pages
1. Creá un repositorio en GitHub y subí **el contenido** de esta carpeta (index.html en la raíz).
2. Settings → Pages → Source: *Deploy from a branch* → Branch: `main` / carpeta `/ (root)` → Save.
3. En 1–2 minutos queda en `https://TU-USUARIO.github.io/NOMBRE-DEL-REPO/`.

## Qué editar (todo en js/data.js)
- `CFG.tel`: WhatsApp con código de país, sin “+” ni espacios (ej. `549342XXXXXXX`). Mientras esté vacío, “Enviar pedido” y el formulario muestran el mensaje listo para copiar y enviar; al completarlo abren WhatsApp directo y aparecen los botones Llamar/WhatsApp en Ubicación.
- `CFG.telTexto`: teléfono que se muestra en Ubicación (en la gráfica original dice “684030 0”; confirmar el número completo).
- Precios de la carta: cambiar `p:null` por el número (ej. `p:9500`). Con `null` muestra “Consultar precio” y no suma al total.
- Fotos reales: reemplazar el archivo en `assets/images/` por tu foto con el mismo nombre, o cambiar la ruta en `f:"..."`.
- Promo 2: la gráfica dice “11 doc”; está cargado como ½ docena de cada tipo. Confirmar.

## Sobre las imágenes
Son ilustraciones vectoriales creadas para este proyecto, **no fotografías**. Se pueden reemplazar por fotos propias (ver arriba).

## Pruebas realizadas (Chromium automatizado, servido desde una subruta como GitHub Pages)
Carga de index, navegación entre las 5 secciones, 10 promociones con nombres, productos y precios, 14 platos de la carta, carga de todas las imágenes, buscadores, variantes, notas y cantidades, carrito único (total, ítems a consultar, persistencia al recargar, vaciar), envío del pedido, formulario de contacto, ausencia de errores y de 404, y ausencia de desborde horizontal a 375, 768 y 1280 px.
No se probó en dispositivos reales ni en GitHub Pages real, ni el envío efectivo por WhatsApp (falta el número).
