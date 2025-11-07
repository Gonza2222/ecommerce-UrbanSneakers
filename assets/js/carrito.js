// Recuperar carrito desde localStorage o crear uno vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Render del carrito
function renderCarrito() {
    const contenedor = document.getElementById("contenedor-carrito");
    const totalSpan = document.getElementById("total");
    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
        totalSpan.textContent = "$0";
        return;
    }

    let total = 0;

    carrito.forEach(prod => {
        total += prod.precio * prod.cantidad;
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${prod.img}" alt="${prod.nombre}">
            <h3>${prod.nombre}</h3>
            <p>$${prod.precio.toLocaleString()}</p>
            <div class="cantidad-control">
                <button class="cantidad-btn" data-id="${prod.id}" data-accion="restar">-</button>
                <span id="cantidad-${prod.id}">${prod.cantidad}</span>
                <button class="cantidad-btn" data-id="${prod.id}" data-accion="sumar">+</button>
            </div>
            <button class="eliminar-btn" data-id="${prod.id}">🗑️ Eliminar</button>
        `;
        contenedor.appendChild(card);
    });

    totalSpan.textContent = `$${total.toLocaleString()}`;
}

// Delegación de eventos para botones +, –, eliminar
document.getElementById("contenedor-carrito").addEventListener("click", (e) => {
    const id = parseInt(e.target.dataset.id);

    if (e.target.classList.contains("cantidad-btn")) {
        const accion = e.target.dataset.accion;

        carrito = carrito.map(p => {
            if (p.id === id) {
                if (accion === "sumar") p.cantidad++;
                if (accion === "restar" && p.cantidad > 1) p.cantidad--;
            }
            return p;
        });

        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderCarrito();
    }

    if (e.target.classList.contains("eliminar-btn")) {
        carrito = carrito.filter(p => p.id !== id);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderCarrito();
    }
});

// Vaciar carrito con confirmación
document.getElementById("vaciar-carrito").addEventListener("click", () => {
    if (confirm("¿Estás seguro de que querés vaciar el carrito?")) {
        carrito = [];
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderCarrito();
    }
});

// Renderizar al cargar
document.addEventListener("DOMContentLoaded", renderCarrito);