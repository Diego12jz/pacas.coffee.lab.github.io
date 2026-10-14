// ====== PRODUCTOS ======
const productos = [
  // Remeras
  { id: 1, nombre: "Remera Clásica", precio: 8000, categoria: "remeras", img: "https://via.placeholder.com/300x200?text=Remera+Clásica", desc: "Algodón 100%, varios colores" },
  { id: 2, nombre: "Remera Oversize", precio: 10000, categoria: "remeras", img: "https://via.placeholder.com/300x200?text=Remera+Oversize", desc: "Corte amplio, cómoda" },
  { id: 3, nombre: "Remera Estampada", precio: 9500, categoria: "remeras", img: "https://via.placeholder.com/300x200?text=Remera+Estampada", desc: "Diseños exclusivos" },
  { id: 4, nombre: "Remera Manga Larga", precio: 11000, categoria: "remeras", img: "https://via.placeholder.com/300x200?text=Manga+Larga", desc: "Ideal para media estación" },
  // Café
  { id: 5, nombre: "Café Molido 250g", precio: 4500, categoria: "cafe", img: "https://via.placeholder.com/300x200?text=Café+Molido", desc: "Tueste medio" },
  { id: 6, nombre: "Café en Granos 500g", precio: 7000, categoria: "cafe", img: "https://via.placeholder.com/300x200?text=Café+Granos", desc: "Tueste intenso" },
  { id: 7, nombre: "Café Instantáneo 100g", precio: 3200, categoria: "cafe", img: "https://via.placeholder.com/300x200?text=Instantáneo", desc: "Práctico y rápido" },
  { id: 8, nombre: "Café de Especialidad", precio: 9500, categoria: "cafe", img: "https://via.placeholder.com/300x200?text=Especialidad", desc: "Origen único, Colombia" },
  // Accesorios
  { id: 9, nombre: "Taza Cerámica", precio: 3500, categoria: "accesorios", img: "https://via.placeholder.com/300x200?text=Taza", desc: "Con logo de la tienda" },
  { id: 10, nombre: "Prensa Francesa", precio: 12000, categoria: "accesorios", img: "https://via.placeholder.com/300x200?text=Prensa", desc: "600 ml, vidrio templado" },
  { id: 11, nombre: "Gorro de Lana", precio: 5000, categoria: "accesorios", img: "https://via.placeholder.com/300x200?text=Gorro", desc: "Unisex, varios colores" }
];

// ====== CONFIGURACIÓN ======
// ⚠️ CAMBIÁ ESTO por tu número real (sin +, sin espacios, sin guiones)
const NUMERO_WHATSAPP = "5491112345678";

// ====== CARRITO ======
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
  actualizarContador();
}

function agregarAlCarrito(id) {
  const prod = productos.find(p => p.id === id);
  const existe = carrito.find(p => p.id === id);
  if (existe) {
    existe.cantidad++;
  } else {
    carrito.push({ ...prod, cantidad: 1 });
  }
  guardarCarrito();
  alert(`✅ ${prod.nombre} agregado al carrito`);
}

function quitarDelCarrito(id) {
  carrito = carrito.filter(p => p.id !== id);
  guardarCarrito();
  mostrarCarrito();
}

function cambiarCantidad(id, delta) {
  const item = carrito.find(p => p.id === id);
  if (!item) return;
  item.cantidad += delta;
  if (item.cantidad <= 0) {
    quitarDelCarrito(id);
  } else {
    guardarCarrito();
    mostrarCarrito();
  }
}

function vaciarCarrito() {
  if (confirm("¿Vaciar el carrito?")) {
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
  }
}

function actualizarContador() {
  const total = carrito.reduce((acc, p) => acc + p.cantidad, 0);
  document.getElementById("contadorCarrito").textContent = total;
}

function abrirCarrito() {
  mostrarCarrito();
  document.getElementById("modalCarrito").classList.remove("hidden");
}

function cerrarCarrito() {
  document.getElementById("modalCarrito").classList.add("hidden");
}

function mostrarCarrito() {
  const lista = document.getElementById("listaCarrito");
  if (carrito.length === 0) {
    lista.innerHTML = '<p class="text-gray-500 text-center py-4">Tu carrito está vacío 🛒</p>';
    document.getElementById("totalCarrito").textContent = "$0";
    return;
  }
  lista.innerHTML = carrito.map(p => `
    <div class="flex justify-between items-center border-b pb-2">
      <div>
        <p class="font-semibold">${p.nombre}</p>
        <p class="text-sm text-gray-500">$${p.precio.toLocaleString()} c/u</p>
        <div class="flex items-center gap-2 mt-1">
          <button onclick="cambiarCantidad(${p.id}, -1)" class="btn-cantidad bg-gray-200">−</button>
          <span>${p.cantidad}</span>
          <button onclick="cambiarCantidad(${p.id}, 1)" class="btn-cantidad bg-gray-200">+</button>
        </div>
      </div>
      <div class="text-right">
        <p class="font-bold text-cafe">$${(p.precio * p.cantidad).toLocaleString()}</p>
        <button onclick="quitarDelCarrito(${p.id})" class="text-red-500 text-sm hover:underline">Eliminar</button>
      </div>
    </div>
  `).join("");
  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  document.getElementById("totalCarrito").textContent = "$" + total.toLocaleString();
}

// ====== RENDER PRODUCTOS ======
function renderizarProductos() {
  ["remeras", "cafe", "accesorios"].forEach(cat => {
    const grid = document.getElementById(`grid-${cat}`);
    grid.innerHTML = productos
      .filter(p => p.categoria === cat)
      .map(p => `
        <div class="producto-card bg-white rounded-lg shadow hover:shadow-lg overflow-hidden">
          <img src="${p.img}" alt="${p.nombre}" class="w-full h-48 object-cover">
          <div class="p-4">
            <h3 class="font-bold text-cafeOscuro">${p.nombre}</h3>
            <p class="text-sm text-gray-600 mb-2">${p.desc}</p>
            <p class="font-bold text-cafe text-lg">$${p.precio.toLocaleString()}</p>
            <button onclick="agregarAlCarrito(${p.id})" class="mt-3 w-full bg-cafe text-white py-2 rounded hover:bg-cafeOscuro transition">
              Agregar al carrito
            </button>
          </div>
        </div>
      `).join("");
  });
}

// ====== WHATSAPP ======
function enviarCarritoWhatsApp() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío");
    return;
  }
  let mensaje = "¡Hola! Quiero hacer este pedido:\n\n";
  carrito.forEach(p => {
    mensaje += `• ${p.nombre} x${p.cantidad} = $${(p.precio * p.cantidad).toLocaleString()}\n`;
  });
  const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
  mensaje += `\nTotal: $${total.toLocaleString()}`;
  const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
  window.open(url, "_blank");
}

// ====== FORMULARIO CONTACTO ======
document.getElementById("formPedido").addEventListener("submit", function(e) {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const telefono = document.getElementById("telefono").value;
  const mensaje = document.getElementById("mensaje").value;
  const texto = `¡Hola! Soy ${nombre} (tel: ${telefono}).\n${mensaje}`;
  const url = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texto)}`;
  window.open(url, "_blank");
});

// Cerrar modal al hacer clic afuera
document.getElementById("modalCarrito").addEventListener("click", function(e) {
  if (e.target === this) cerrarCarrito();
});

// ====== INICIALIZAR ======
renderizarProductos();
actualizarContador();