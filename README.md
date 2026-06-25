# CATfé

CATfé es un sitio web institucional para una cafetería temática con gatos, adopciones responsables, donaciones y reservas de visitas. El proyecto fue actualizado como entrega de Proyecto Final para tecnicatura, incorporando navegación completa, secciones informativas, interactividad, diseño adaptable y un pequeño backend serverless.

## Sitio publicado

https://catfeteriagato.netlify.app/

## Secciones principales

- Inicio
- Sobre Nosotros
- Adopciones
- Donaciones
- Reservas
- Contacto
- Sucursales
- Reglas generales
- Horarios y reservas
- Preguntas/contacto por servicios

## Tecnologías utilizadas

- HTML5 para la estructura de páginas.
- CSS3 para estilos personalizados.
- Bootstrap para diseño adaptable y componentes responsive.
- Boxicons para iconografía.
- JavaScript para interactividad propia.
- jQuery e Isotope para filtros de contenido.
- Netlify para hosting.
- Netlify Functions para el backend serverless.
- Netlify Blobs para persistencia de reservas.
- JSON para datos estructurados de gatos en adopción.

## Funcionalidades destacadas

- Menú de navegación entre páginas.
- Índice con anclas locales en la página principal.
- Links gráficos mediante imágenes e íconos.
- Tabla de horarios y reservas.
- Galería e imágenes clickeables.
- Rollovers de imágenes.
- Popups de reserva/contacto.
- Formulario de reservas con backend serverless.
- Listado de reservas guardadas desde `/api/reservas`.
- Diseño adaptable para escritorio y dispositivos móviles.

## Backend serverless

El sitio está publicado en Netlify y usa una función serverless ubicada en:

```text
netlify/functions/reservas.mjs
```

El endpoint expuesto es:

```text
/api/reservas
```

La página `reservas.html` envía los datos del formulario mediante `fetch`. La función valida los campos obligatorios, guarda la reserva en Netlify Blobs y devuelve la información en formato JSON.

## Archivos relevantes

- `index.html`: página principal.
- `nosotros.html`: información institucional.
- `adopciones.html`: gatos y proceso de adopción.
- `donaciones.html`: planes y donaciones.
- `reservas.html`: formulario conectado al backend.
- `contacto.html`: formulario de contacto.
- `assets/css/estilos.css`: estilos personalizados.
- `assets/js/custom.js`: popups y rollovers.
- `assets/js/reservas.js`: lógica de reservas.
- `assets/data/gatos.json`: datos de gatos en adopción.
- `netlify.toml`: configuración de deploy y redirección API.

## Autoría

Proyecto desarrollado por Indira Rueda.

