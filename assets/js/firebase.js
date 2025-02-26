// Importar las funciones necesarias de Firebase
import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js';
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCxkWC3Ybe2Kgswn91-PfWBsMfa6pEr3js',
  authDomain: 'catfe-8d8d2.firebaseapp.com',
  projectId: 'catfe-8d8d2',
  storageBucket: 'catfe-8d8d2.appspot.com',  // Corrección del storageBucket
  messagingSenderId: '796846992688',
  appId: '1:796846992688:web:90591f491d80d4d4fa6cf5',
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
console.log('Firebase cargado correctamente', app);

// Obtener la instancia de Firestore
const db = getFirestore(app);

// Función para obtener las sucursales
async function obtenerSucursales() {
  try {
    const querySnapshot = await getDocs(collection(db, 'sucursales'));
    const sucursales = [];
    
    querySnapshot.forEach((doc) => {
      sucursales.push({ id: doc.id, ...doc.data() });
    });

    console.log('Sucursales obtenidas:', sucursales);
    return sucursales
  } catch (error) {
    console.error('Error al obtener las sucursales:', error);
    return []
  }
}

// Llamar a la función para obtener datos
const sucursales = await obtenerSucursales();
const sucursalesContainer = document.getElementById("sucursales-container");
console.log(sucursalesContainer);
for (const element of sucursales) {
    console.log(element);
    sucursalesContainer.innerHTML = sucursalesContainer.innerHTML+ `<div class="col-xl-3 col-md-4 col-sm-6 project arg ${element.pais} branding py-2" >
          <a
            href="#"
            class="service-work card border-0 text-white shadow-sm overflow-hidden mx-5 m-sm-0"
          >
            <img
              class="service card-img"
              src="${element.imagen}"
              alt="Card image"
              style="height: 200px; max-height: 200px;"
            />
            <div
              class="service-work-vertical card-img-overlay d-flex align-items-end"
            >
              <div class="service-work-content text-left text-light">
                <span
                  class="btn btn-outline-light rounded-pill mb-lg-3 px-lg-4 light-300 btn-sm"
                  >${element.nombre}</span
                >
              </div>
            </div>
          </a>
        </div>`
}








