# Documentación del Proyecto Final: CATfé

## Datos generales

**Nombre del sitio:** CATfé  
**URL publicada:** https://catfeteriagato.netlify.app/  
**Autora:** Indira Rueda  
**Tipo de proyecto:** sitio web institucional con funcionalidad dinámica de reservas.

## Tema del sitio

CATfé es una cafetería temática orientada al bienestar animal. El sitio presenta información institucional, sucursales, reglas de convivencia, gatos disponibles para adopción, planes de donación, contacto y reservas para visitas, entrevistas de adopción o consultas relacionadas con donaciones.

La temática permite integrar contenido informativo, navegación entre secciones, imágenes, formularios, tablas, interactividad y una funcionalidad dinámica relacionada con reservas.

## Objetivo

El objetivo del sitio es brindar una experiencia clara para usuarios interesados en:

- Conocer la propuesta de la cafetería.
- Consultar sucursales y horarios.
- Ver reglas generales de convivencia con los gatos.
- Informarse sobre adopciones responsables.
- Realizar donaciones.
- Registrar reservas, entrevistas de adopción o consultas por donaciones.
- Contactarse con el equipo de CATfé.

## Estructura del sitio

El proyecto está compuesto por varias páginas HTML:

- `index.html`: página principal, carrusel, índice local, sucursales, reglas y horarios.
- `nosotros.html`: presentación del equipo, misión, visión y objetivos.
- `adopciones.html`: gatos disponibles y pasos para adoptar.
- `donaciones.html`: membresías, donaciones particulares y merchandising.
- `reservas.html`: formulario para reservas, entrevistas de adopción y consultas por donaciones.
- `contacto.html`: datos de contacto y formulario de consulta.

Además, el sitio incluye carpetas de recursos:

- `assets/css`: hojas de estilo.
- `assets/js`: scripts JavaScript.
- `assets/img`: imágenes.
- `assets/icons`: íconos.
- `assets/data`: archivos JSON.
- `netlify/functions`: funciones serverless.

## Requisitos de la consigna

### Navegabilidad

El sitio permite navegar mediante un menú principal presente en las páginas. También contiene links internos, links gráficos, enlaces a redes externas y accesos entre secciones.

Requisitos cubiertos:

- Menú de navegación.
- Aproximadamente 10 secciones.
- Links gráficos con imágenes e íconos.
- Links tipo índice a anclas locales.
- Tablas.

La tabla principal se encuentra en la sección de horarios y reservas de `index.html`. La página `reservas.html` también muestra una tabla dinámica con las reservas registradas.

### Interactividad

El sitio incorpora varias características interactivas:

- Carrusel en la página principal.
- Filtros de contenido con jQuery/Isotope.
- Rollovers de imágenes.
- Popups mediante JavaScript.
- Apertura de enlaces externos en nuevas ventanas.
- Formularios de contacto y reservas.
- Carga dinámica de datos desde JSON.
- Consumo de API mediante `fetch`.

### CSS

El sitio utiliza:

- Bootstrap para grillas, componentes y comportamiento responsive.
- CSS personalizado en `assets/css/estilos.css`.
- Clases propias para colores, botones, índice local, rollovers, tarjetas y secciones.

### JavaScript y jQuery

El proyecto incluye:

- JavaScript propio en `assets/js/custom.js`.
- JavaScript para reservas en `assets/js/reservas.js`.
- jQuery para filtros de contenido.
- Isotope para filtrado de cards.
- Bootstrap Bundle para componentes interactivos.

### Diseño adaptable

El diseño utiliza Bootstrap, grillas responsive y clases adaptables para escritorio y dispositivos móviles. El menú se transforma en navegación colapsable en pantallas pequeñas.

### Hosting

El sitio está publicado en Netlify:

https://catfeteriagato.netlify.app/

Netlify toma los cambios desde el repositorio de GitHub y publica automáticamente la rama principal.

## Tecnologías utilizadas

### HTML5

Se utiliza HTML5 para estructurar el contenido del sitio mediante páginas, secciones, encabezados, formularios, tablas, imágenes y enlaces.

### CSS3

CSS3 se utiliza para personalizar colores, tipografías, fondos, efectos visuales, rollovers, tarjetas, botones y presentación general.

### Bootstrap

Bootstrap aporta el sistema responsive, el menú adaptable, grillas, botones, formularios, tablas, cards y utilidades de espaciado.

### Boxicons

Boxicons se usa como biblioteca de íconos para mejorar la navegación visual y los links gráficos.

### JavaScript

JavaScript se utiliza para:

- Mostrar popups.
- Aplicar rollovers.
- Procesar formularios.
- Cargar datos JSON.
- Enviar datos al backend.
- Renderizar reservas en una tabla.

### jQuery e Isotope

jQuery e Isotope se utilizan para filtrar elementos visuales, principalmente en secciones de cards.

### JSON

El archivo `assets/data/gatos.json` funciona como fuente de datos estructurados para cargar opciones de gatos en la página de reservas.

### Netlify

Netlify se utiliza como plataforma de hosting y despliegue. Permite publicar el sitio de forma pública y ejecutar funciones serverless.

### Netlify Functions

Netlify Functions permite incorporar backend sin administrar un servidor tradicional. En este proyecto se utiliza una función para gestionar reservas.

Archivo:

```text
netlify/functions/reservas.mjs
```

Endpoint:

```text
/api/reservas
```

### Netlify Blobs

Netlify Blobs se utiliza para persistir reservas del lado servidor. Esto permite que la información enviada desde el formulario no quede solamente en el navegador, sino que se guarde mediante una funcionalidad backend.

## Funcionamiento del backend

La página `reservas.html` contiene un formulario para registrar:

- Nombre.
- Email.
- Teléfono.
- Fecha.
- Horario.
- Sucursal.
- Motivo de la reserva.
- Gato de interés.
- Comentarios.

El archivo `assets/js/reservas.js` toma los datos del formulario y realiza una petición `POST` a:

```text
/api/reservas
```

La función serverless:

1. Recibe los datos en formato JSON.
2. Valida los campos obligatorios.
3. Genera un identificador único.
4. Guarda la reserva en Netlify Blobs.
5. Devuelve una respuesta JSON.

La misma API también permite consultar las reservas mediante `GET`, y la página las muestra en una tabla.

## Explicación para defensa

El sitio comenzó como una web estática y fue actualizado para cumplir los requisitos actuales del Proyecto Final. Se mantuvo la temática original de una cafetería de gatos, pero se agregaron secciones, navegación, tabla, anclas locales, interactividad, diseño responsive y una mini aplicación de reservas.

La funcionalidad de reservas representa el componente más técnico del proyecto: combina un formulario HTML, validaciones, JavaScript del lado cliente, consumo de una API con `fetch`, una función serverless en Netlify y persistencia con Netlify Blobs.

Esto permite explicar tanto el armado visual del sitio como la separación entre frontend y backend.

## Cumplimiento resumido

- Sitio publicado en Internet: sí.
- Navegación por menú: sí.
- Aproximadamente 10 secciones: sí.
- Links gráficos: sí.
- Anclas locales: sí.
- Tablas: sí.
- CSS: sí.
- JavaScript/jQuery: sí.
- Interactividad: sí.
- Diseño adaptable: sí.
- Backend simple: sí, mediante Netlify Functions.

## Conclusión

CATfé cumple con los requisitos de la consigna y agrega una funcionalidad adicional de backend serverless. El sitio presenta una temática clara, navegación completa, contenido visual, formularios, tablas, efectos interactivos y publicación en Netlify.
