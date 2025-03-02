document.addEventListener("DOMContentLoaded", function () {
    const footerContainer = document.getElementById("footer"); // Busca el div donde irá el footer
    if (footerContainer) {
      footerContainer.innerHTML = `
        <footer class="bgk-m1 pt-4">
          <div class="container">
            <div class="row py-4">
              <div class="col-lg-3 col-12 align-left">
                <a class="navbar-brand" href="index.html">
                  <img
                    src="/assets/img/iconos.ico/android-icon-144x144.png"
                    alt="kitty-icono"
                    style="height: 70px; width: auto"
                  />
                  <span class="f2 h4 font-nerko align-middle">CAT</span
                  ><span class="f3 h4 font-nerko align-middle">fé</span></a
                >
                <p class="text-dark bold-700 my-lg-4 my-2">
                  Cafetería que cuenta con gatos para adoptar en sus
                  establecimientos. Recaudaciones para gastos en veterinaria,
                  comida, accesorios etc.
                </p>
                <ul class="list-inline footer-icons light-300">
                  <li class="list-inline-item m-0">
                    <a class="text-dark" target="_blank" href="http://facebook.com/">
                      <i class="bx bxl-facebook-square bx-md"></i>
                    </a>
                  </li>
                  <li class="list-inline-item m-0">
                    <a class="text-dark" target="_blank" href="https://www.linkedin.com/">
                      <i class="bx bxl-linkedin-square bx-md"></i>
                    </a>
                  </li>
                  <li class="list-inline-item m-0">
                    <a class="text-dark" target="_blank" href="https://www.whatsapp.com/">
                      <i class="bx bxl-whatsapp-square bx-md"></i>
                    </a>
                  </li>
                  <li class="list-inline-item m-0">
                    <a class="text-dark" target="_blank" href="https://www.flickr.com/">
                      <i class="bx bxl-flickr-square bx-md"></i>
                    </a>
                  </li>
                  <li class="list-inline-item m-0">
                    <a class="text-dark" target="_blank" href="https://www.medium.com/">
                      <i class="bx bxl-medium-square bx-md"></i>
                    </a>
                  </li>
                </ul>
              </div>
  
              <div class="col-lg-3 col-md-4 my-sm-0 mt-4">
                <h3 class="h4 pb-lg-3 text-body regular-400">Nuestros Servicios</h3>
                <ul class="list-unstyled oscuro light-300">
                  <li class="pb-2">
                    <i class="bx-fw bx bxs-chevron-right bx-xs"></i>
                    <a class="text-decoration-none text-body" href="index.html">Inicio</a>
                  </li>
                  <li class="pb-2">
                    <i class="bx-fw bx bxs-chevron-right bx-xs"></i>
                    <a class="text-decoration-none text-body py-1" href="nosotros.html">Nosotros</a>
                  </li>
                  <li class="pb-2">
                    <i class="bx-fw bx bxs-chevron-right bx-xs"></i>
                    <a class="text-decoration-none text-body py-1" href="adopciones.html">Adopciones</a>
                  </li>
                  <li class="pb-2">
                    <i class="bx-fw bx bxs-chevron-right bx-xs"></i>
                    <a class="text-decoration-none text-body py-1" href="donaciones.html">Donaciones</a>
                  </li>
                  <li class="pb-2">
                    <i class="bx-fw bx bxs-chevron-right bx-xs"></i>
                    <a class="text-decoration-none text-body py-1" href="contacto.html">Contactos</a>
                  </li>
                </ul>
              </div>
  
              <div class="col-lg-3 col-md-4 my-sm-0 mt-4">
                <h2 class="h4 pb-lg-3 text-body regular-400">Sucursales</h2>
                <ul class="list-unstyled oscuro light-300">
                  <li class="pb-2">
                    <i class="bx-fw bx bxs-chevron-right bx-xs"></i>
                    <a class="text-decoration-none text-body py-1" href="#">Argentina</a>
                  </li>
                  <li class="pb-2">
                    <i class="bx-fw bx bxs-chevron-right bx-xs"></i>
                    <a class="text-decoration-none text-body py-1" href="#">México</a>
                  </li>
                  <li class="pb-2">
                    <i class="bx-fw bx bxs-chevron-right bx-xs"></i>
                    <a class="text-decoration-none text-body py-1" href="#">España</a>
                  </li>
                </ul>
              </div>
  
              <div class="col-lg-3 col-md-4 my-sm-0 mt-4">
                <h2 class="h4 pb-lg-3 text-body regular-400">Atendemos en:</h2>
                <ul class="list-unstyled text-body light-300">
                  <li class="pb-2">
                    <i class="bx-fw bx bx-phone bx-xs"></i>
                    <a class="text-decoration-none text-body py-1" href="tel:010-020-0340">3438-458595</a>
                  </li>
                  <li class="pb-2">
                    <i class="bx-fw bx bx-mail-send bx-xs"></i>
                    <a class="text-decoration-none text-body py-1" href="mailto:info@company.com">adoptaungato@catfe.com</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
  
          <div class="w-100 bgk-m2 py-3">
            <div class="container">
              <div class="row pt-2">
                <div class="col-lg-6 col-sm-12">
                  <p class="text-lg-start text-center text-light light-300">
                    © Copyright 2021 CAT-fé. Todos los derechos reservados.
                  </p>
                </div>
                <div class="col-lg-6 col-sm-12">
                  <p class="text-lg-end text-center text-light light-300">
                    Diseñado por
                    <a rel="sponsored" class="text-decoration-none text-light" href="https://cursophp.com.ar/" target="_blank">
                      <strong>Indira CAC FullStack</strong>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      `;
    }
  });
  