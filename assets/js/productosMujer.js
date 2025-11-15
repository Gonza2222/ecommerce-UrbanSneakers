document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("contenedor-mujer");

  if (!contenedor) return;

  // Ruta dinámica del JSON
  const jsonPath = window.location.pathname.includes("/assets/pages/")
    ? "../data/productos.json"
    : "assets/data/productos.json";

  // Recuperar carrito
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  fetch(jsonPath)
    .then(res => res.json())
    .then(data => {
      const categoriaMujer = data.categorias.find(c => c.nombre === "mujer");

      if (categoriaMujer && categoriaMujer.productos.length > 0) {
        categoriaMujer.productos.forEach(producto => {
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

        // --- Botones + y - ---
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

          // --- Botón Agregar al carrito ---
          if (e.target.classList.contains("btn-carrito")) {
            const usuarioLogueado = sessionStorage.getItem("usuarioLogueado");

            // Si NO está logueado → lo mando al login
            if (!usuarioLogueado) {
              alert("Debes iniciar sesión para agregar productos al carrito ❌");

              const basePath = window.location.pathname.includes("/assets/pages/")
                ? "./"
                : "assets/pages/";

              window.location.href = `${basePath}login_usuarios.html`;
              return;
            }

            // Obtener datos del producto desde la card
            const card = e.target.closest(".card-producto");
            const nombre = card.querySelector("h3").textContent;
            const precio = parseInt(
              card.querySelector(".precio").textContent.replace("$", "").replace(/\./g, "")
            );
            const img = card.querySelector("img").src;
            const cantidad = parseInt(card.querySelector(".cantidad").textContent);

            const nuevoProducto = {
              id: Date.now(),
              nombre,
              precio,
              img,
              cantidad
            };

            carrito.push(nuevoProducto);
            localStorage.setItem("carrito", JSON.stringify(carrito));

            alert("Producto agregado al carrito 🛒✨");
          }
        });

      } else {
        contenedor.innerHTML = "<p>No hay productos disponibles.</p>";
      }
    })
    .catch(error => console.error("Error al cargar los productos:", error));
});
