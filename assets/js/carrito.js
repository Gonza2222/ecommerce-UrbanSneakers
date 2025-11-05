// Recuperar carrito desde localStorage o crear uno vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Render del carrito
function renderCarrito() {
    const contenedor = document.getElementById("contenedor-carrito");
    const totalSpan = document.getElementById("total");
    contenedor.innerHTML = "";

    if(carrito.length === 0){
        contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
        totalSpan.textContent = "0";
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
        `;
        contenedor.appendChild(card);
    });

    totalSpan.textContent = total.toLocaleString();

    // Eventos botones + y -
    document.querySelectorAll(".cantidad-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.dataset.id);
            const accion = btn.dataset.accion;

            carrito = carrito.map(p => {
                if(p.id === id){
                    if(accion === "sumar") p.cantidad++;
                    if(accion === "restar" && p.cantidad > 1) p.cantidad--;
                }
                return p;
            });

            localStorage.setItem("carrito", JSON.stringify(carrito));
            renderCarrito();
        });
    });
}

// Vaciar carrito
document.getElementById("vaciar-carrito").addEventListener("click", () => {
    carrito = [];
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderCarrito();
});

// Renderizar al cargar
document.addEventListener("DOMContentLoaded", renderCarrito);