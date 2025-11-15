document.addEventListener("DOMContentLoaded", () => {
  // Recuperar carrito desde localStorage o crear uno vacío
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  const contenedor = document.getElementById("contenedor-carrito");
  const totalSpan = document.getElementById("total");
  const btnVaciar = document.getElementById("vaciar-carrito");

  if (!contenedor || !totalSpan) return; // Evita errores si no está el carrito

  // Render del carrito
  function renderCarrito() {
    contenedor.innerHTML = "";

    if (carrito.length === 0) {
      contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
      totalSpan.textContent = "$0";
      return;
    }

    let total = 0;

    carrito.forEach(prod => {
      // DETECTAR EL TIPO DE PRODUCTO Y USAR PROPIEDADES CORRECTAS
      const titulo = prod.titulo || prod.nombre || "Producto sin nombre";
      const imagen = prod.imagen || prod.img || "";
      const precio = prod.precio || 0;
      const cantidad = prod.cantidad || 1;
      
      total += precio * cantidad;
      
      const card = document.createElement("div");
      card.className = "item-carrito"; 
      card.innerHTML = `
        <img src="${imagen}" alt="${titulo}" class="img-producto">
        <h3>${titulo}</h3>
        <p class="precio">$${precio.toLocaleString()}</p>
        <div class="controles-cantidad">
            <button class="cantidad-btn" data-titulo="${titulo}" data-accion="restar">-</button>
            <span class="cantidad">${cantidad}</span>
            <button class="cantidad-btn" data-titulo="${titulo}" data-accion="sumar">+</button>
        </div>
        <button class="btn-eliminar" data-titulo="${titulo}">🗑️ Eliminar</button>
      `;
      contenedor.appendChild(card);
    });

    totalSpan.textContent = `$${total.toLocaleString()}`;
  }

  // Delegación de eventos para botones +, –, eliminar
  contenedor.addEventListener("click", (e) => {
    const titulo = e.target.dataset.titulo;

    if (e.target.classList.contains("cantidad-btn")) {
      const accion = e.target.dataset.accion;

      carrito = carrito.map(p => {
        // COMPARAR CON AMBAS PROPIEDADES POSIBLES
        const prodTitulo = p.titulo || p.nombre;
        if (prodTitulo === titulo) {
          if (accion === "sumar") p.cantidad++;
          if (accion === "restar" && p.cantidad > 1) p.cantidad--;
        }
        return p;
      });

      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderCarrito();
    }

    if (e.target.classList.contains("btn-eliminar")) { // CLASE CORRECTA
      carrito = carrito.filter(p => {
        const prodTitulo = p.titulo || p.nombre;
        return prodTitulo !== titulo;
      });
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderCarrito();
    }
  });

  // Vaciar carrito con confirmación
  if (btnVaciar) {
    btnVaciar.addEventListener("click", () => {
      if (confirm("¿Estás seguro de que querés vaciar el carrito?")) {
        carrito = [];
        localStorage.setItem("carrito", JSON.stringify(carrito));
        renderCarrito();
      }
    });
  }

  // Renderizar al cargar
  renderCarrito();
});