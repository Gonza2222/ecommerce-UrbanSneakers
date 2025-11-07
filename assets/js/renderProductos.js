// Detecta si el HTML está dentro de "pages" y ajusta la ruta
const basePath = window.location.pathname.includes("/pages/") ? "../../" : "";

function renderProductos(lista, contenedorId) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    contenedor.innerHTML = lista.map(prod => `
        <div class="card">
            <img src="${basePath}${prod.img}" alt="${prod.nombre}">
            <h3>${prod.nombre}</h3>
            <p>$${prod.precio.toLocaleString()}</p>
            <div class="cantidad-control">
                <button class="btn-restar" data-id="${prod.id}">-</button>
                <span class="cantidad" id="cantidad-${prod.id}">1</span>
                <button class="btn-sumar" data-id="${prod.id}">+</button>
            </div>
            <button class="btn-agregar" data-id="${prod.id}">Agregar al carrito</button>
        </div>
    `).join("");

    // Manejo de botones + y -
    lista.forEach(prod => {
        const spanCantidad = document.getElementById(`cantidad-${prod.id}`);
        let cantidad = 1;

        const btnSumar = document.querySelector(`.btn-sumar[data-id="${prod.id}"]`);
        const btnRestar = document.querySelector(`.btn-restar[data-id="${prod.id}"]`);

        btnSumar.addEventListener("click", () => {
            cantidad++;
            spanCantidad.textContent = cantidad;
        });

        btnRestar.addEventListener("click", () => {
            if(cantidad > 1) cantidad--;
            spanCantidad.textContent = cantidad;
        });
    });

    document.querySelectorAll(".btn-agregar").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = parseInt(btn.getAttribute("data-id"));
            const producto = lista.find(p => p.id === id);
            const cantidad = parseInt(document.getElementById(`cantidad-${id}`).textContent);
            agregarAlCarrito(producto, cantidad); // pasás el producto y la cantidad
        });
    });
}

document.addEventListener("DOMContentLoaded", () => {
    if(document.getElementById("contenedor-hombre")) {
        renderProductos(productos.filter(p => p.categoria === "hombre"), "contenedor-hombre");
    }
    if(document.getElementById("contenedor-mujer")) {
        renderProductos(productos.filter(p => p.categoria === "mujer"), "contenedor-mujer");
    }
    if(document.getElementById("contenedor-niño")) {
        renderProductos(productos.filter(p => p.categoria === "niño"), "contenedor-niño");
    }
    if(document.getElementById("contenedor-destacados")) {
        renderProductos(productos.filter(p => p.categoria === "destacado"), "contenedor-destacados");
    }
});