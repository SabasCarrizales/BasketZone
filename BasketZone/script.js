
const productos = [
  { id: 1, nombre: "Jordan Jumpman", precio: 120 },
  { id: 2, nombre: "Balón Spalding", precio: 35 },
  { id: 3, nombre: "Camiseta Lakers", precio: 60 },
];

function cambiarCantidad(id, delta) {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || {};
  carrito[id] = (carrito[id] || 0) + delta;
  if (carrito[id] <= 0) delete carrito[id];
  localStorage.setItem("carrito", JSON.stringify(carrito));
  const span = document.getElementById(`cantidad-${id}`);
  if (span) span.textContent = carrito[id] || 0;
  if (document.body.contains(document.getElementById("carrito-body"))) renderCarrito();
}

function renderCarrito() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || {};
  const tbody = document.getElementById("carrito-body");
  const totalSpan = document.getElementById("total");
  tbody.innerHTML = "";
  let total = 0;

  for (const id in carrito) {
    const prod = productos.find(p => p.id == id);
    const cantidad = carrito[id];
    const subtotal = prod.precio * cantidad;
    total += subtotal;
    tbody.innerHTML += `
      <tr>
        <td>${prod.nombre}</td>
        <td>$${prod.precio}</td>
        <td>${cantidad}</td>
        <td>$${subtotal}</td>
      </tr>
    `;
  }

  if (totalSpan) totalSpan.textContent = total.toFixed(2);
}

function renderFactura() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || {};
  const tbody = document.getElementById("factura-body");
  const totalSpan = document.getElementById("factura-total");
  tbody.innerHTML = "";
  let total = 0;

  for (const id in carrito) {
    const prod = productos.find(p => p.id == id);
    const cantidad = carrito[id];
    const subtotal = prod.precio * cantidad;
    total += subtotal;
    tbody.innerHTML += `
      <tr>
        <td>${prod.nombre}</td>
        <td>$${prod.precio}</td>
        <td>${cantidad}</td>
        <td>$${subtotal}</td>
      </tr>
    `;
  }

  if (totalSpan) totalSpan.textContent = total.toFixed(2);
}

document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("carrito-body")) renderCarrito();
  if (document.getElementById("factura-body")) renderFactura();
});
