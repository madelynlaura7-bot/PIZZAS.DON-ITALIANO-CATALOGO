# Pizzería Don Italiano

Catálogo web académico responsive, preparado para escritorio y celular.

## Abrir
- Abre `index.html` en un navegador para revisar la interfaz.
- Para probar el Service Worker/PWA y el modo offline, sirve esta carpeta mediante un servidor local (por ejemplo, la extensión Live Server de VS Code) o publícala en GitHub Pages. Los Service Workers no funcionan desde `file://`.

## Funcionalidades incluidas
- Inicio, Conócenos, catálogo, sabores, reservas y preguntas frecuentes.
- Menú hamburguesa responsive, diseño mobile-first con Grid y Flexbox.
- Filtro por categorías y buscador de pizzas.
- Modo claro/oscuro con preferencia guardada.
- Estado de conexión en línea/sin conexión.
- Formulario con validaciones de nombre, WhatsApp, correo, departamento, pizza, tamaño, cantidad y fecha.
- Resumen de total estimado y armado de mensaje para WhatsApp.
- Calculadora en ventana modal.
- Acordeón de preguntas frecuentes.
- Botón “Hidratar catálogo” para volver a renderizar/actualizar la vista del catálogo.
- PWA: manifest y Service Worker con caché de recursos locales para funcionamiento offline básico.
- Fetch API para cargar el catálogo desde `pizzas.json`, con catálogo integrado de respaldo.
- Carga diferida de imágenes y escape de texto dinámico para reducir riesgos de inyección.

## Precios
Individual Bs 28; Pequeña Bs 39; Mediana Bs 60; Especial Bs 70; Grande Bs 100; Familiar Bs 130.

## Importante antes de publicar
El número `+591 77761768` es ficticio/de demostración y debe reemplazarse por un número de WhatsApp autorizado. Las imágenes se cargan desde URLs de Unsplash y necesitan internet la primera vez; no se almacenan dentro del ZIP. Los precios y variedades son datos de muestra editables en `app.js`.


## Personalización solicitada
- Se incorporó el logotipo proporcionado por el negocio.
- WhatsApp de pedidos: +591 77761768.
- Enlaces de Facebook, TikTok y correo: fusiondelsabor13@gmail.com.
- El formulario valida que el nombre tenga entre 4 y 60 caracteres y contenga únicamente letras y espacios.
- Las tarjetas del catálogo se desplazan horizontalmente mediante carrusel.
- Se añadieron las medidas de cada tamaño: 25×25, 30×30, 35×35, 40×40, 45×45 y 50×50 cm.
