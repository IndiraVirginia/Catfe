document.addEventListener('DOMContentLoaded', function () {
  const navbarContainer = document.getElementById('navBar'); //  div donde irá el navbar
  if (navbarContainer) {
    navbarContainer.innerHTML = `<nav
      id="main_nav"
      class="navbar navbar-expand-lg navbar-light bg-white shadow"
    >
      <!--navbar-expand-lg = envoltorio para que el navbar se estire en lg
	navbar-light = texto negro de la letra
	bg-white = fondo de color blanco
	-->

      <div class="container d-flex justify-content-between align-items-center">
        <a class="navbar-brand h1" href="index.html">
          <!--navbar-brand = clase se utiliza para resaltar la marca o logotipo de su página-->
          <img
            class="pr-3"
            src="/assets/img/kitty.svg"
            alt="icono-cat-coffee"
            style="height: 85px; width: auto"
          />
          <span class="oscuro h4 font-nerko align-middle">CAT</span
          ><span class="secundario2 h4 font-nerko align-middle">fé</span></a
        >

        <!--	boton de hamburguesa -->
        <button
          class="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar-toggler-success"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"> </span>
        </button>
        <!------------------------------------------- Opciones del Menu		-->
        <div
          class="align-self-center collapse navbar-collapse flex-fill d-lg-flex justify-content-lg-between"
          id="navbar-toggler-success"
        >
          <!-------collapse navbar-collapse= para agrupar y ocultar el contenido de la barra de navegación 
		por un punto de interrupción principal.
		flex-fill = obliga a que todos los elementos tengan el mismo tamaño de ancho
		d-lg-flex = utilidades para crear un contenedor flexbox y transforme los elementos secundarios 
		directos en elementos flexibles
		-->
          <div class="flex-fill mx-xl-5 mb-2">
            <!--	  mx=para clases que establecen tanto *-lefty*-right-->
            <ul
              class="nav navbar-nav d-flex justify-content-between mx-xl-5 text-center text-dark"
            >
              <!--   .navbar-nav para una navegación ligera y de altura completa 
					   (incluida la compatibilidad con menús desplegables).-->
              <li class="nav-item">
                <a
                  class="nav-link btn-color-nav rounded-pill px-2"
                  href="index.html"
                  >Inicio</a
                >
                <!-- px = padding y mx es el margin 
						rounded-pill =genera ese boton con bordes redondeados rounded-circle-->
              </li>
              <li class="nav-item">
                <a
                  class="nav-link btn-color-nav rounded-pill px-2"
                  href="nosotros.html"
                  >Sobre Nosotros</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link btn-color-nav rounded-pill px-2"
                  href="adopciones.html"
                  >Adopciones</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link btn-color-nav rounded-pill px-2"
                  href="donaciones.html"
                  >Donaciones</a
                >
              </li>
              <li class="nav-item">
                <a
                  class="nav-link btn-color-nav rounded-pill px-2"
                  href="contacto.html"
                  >Contacto</a
                >
              </li>
            </ul>
          </div>

          <!---------------------------------------------------------Fin de las opciones del menu
------------------------------------------------------------ Inicio de los iconos del menu-->
          <div class="navbar align-self-center d-flex">
            <a class="nav-link" href="#"
              ><i class="bx bx-bell bx-sm bx-tada-hover icono-color"></i
            ></a>
            <a class="nav-link" href="#"
              ><i class="bx bx-cog bx-sm icono-color"></i
            ></a>
            <a class="nav-link" href="#"
              ><i class="bx bx-user-circle bx-sm icono-color"></i
            ></a>
            <!--	https://iconify.design/icon-sets/bx/-->
          </div>
        </div>
      </div>
    </nav> 
        
      `;
  }
});
