// productosNinos.js
document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-nino");

  if (!contenedor) return;

  fetch("../data/productos.json")
    .then(res => res.json())
    .then(data => {
      // Buscamos la categoría "niño"
      const categoriaNino = data.categorias.find(c => c.nombre === "niño");

      if (categoriaNino && categoriaNino.productos.length > 0) {
        categoriaNino.productos.forEach(producto => {
          const card = document.createElement("div");
          card.classList.add("card-producto");

          card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.titulo}" class="img-producto" />
            <h3>${producto.titulo}</h3>
            <p>${producto.descripcion}</p>
            <p class="precio">$${producto.precio.toLocaleString("es-AR")}</p>

            <div class="acciones">
              <button class="btn-restar">-</button>
              <span class="cantidad">1</span>
              <button class="btn-sumar">+</button>
            </div>

            <button class="btn-carrito">Añadir al carrito</button>
          `;

          contenedor.appendChild(card);
        });

        // ---- funcionalidad de los botones + y - ----
        contenedor.addEventListener("click", (e) => {
          if (e.target.classList.contains("btn-sumar")) {
            const cantidad = e.target.parentElement.querySelector(".cantidad");
            cantidad.textContent = parseInt(cantidad.textContent) + 1;
          }

          if (e.target.classList.contains("btn-restar")) {
            const cantidad = e.target.parentElement.querySelector(".cantidad");
            const valorActual = parseInt(cantidad.textContent);
            if (valorActual > 1) cantidad.textContent = valorActual - 1;
          }
        });

      } else {
        contenedor.innerHTML = "<p>No hay productos disponibles.</p>";
      }
    })
    .catch(error => console.error("Error al cargar los productos:", error));
});