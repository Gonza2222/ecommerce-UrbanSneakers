document.addEventListener("DOMContentLoaded", () => {
  // Objeto con contenedores y categorías correspondientes
  const contenedores = {
    destacados: { id: "contenedor-destacados", categoria: "destacado" },
    hombre: { id: "contenedor-hombre", categoria: "hombre" },
    mujer: { id: "contenedor-mujer", categoria: "mujer" },
    nino: { id: "contenedor-nino", categoria: "niño" }
  };

  fetch("assets/data/productos.json")
    .then(res => res.json())
    .then(data => {
      Object.values(contenedores).forEach(conf => {
        const contenedor = document.getElementById(conf.id);
        if (!contenedor) return; // si el contenedor no existe, saltar

        // Filtrar la categoría correspondiente
        const categoria = data.categorias.find(c => c.nombre === conf.categoria);

        if (categoria && categoria.productos.length > 0) {
          categoria.productos.forEach(producto => {
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

          // Funcionalidad + y -
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

          // Funcionalidad de AÑADIR AL CARRITO
          contenedor.addEventListener("click", (e) => {
            if (e.target.classList.contains("btn-carrito")) {

              console.log("CLICK EN BOTÓN CARRITO ✔");

              // 1) Verificar login
              const usuarioLogueado = sessionStorage.getItem("usuarioLogueado");
              if (!usuarioLogueado) {
                alert("Debes iniciar sesión para agregar productos al carrito.");
                const basePath = window.location.pathname.includes("/assets/pages/") 
                ? "./" 
                : "assets/pages/";
                window.location.href = `${basePath}login_usuarios.html`;
                return;
              }

              // 2) Obtener datos del producto
              const card = e.target.closest(".card-producto");

              const titulo = card.querySelector("h3").textContent;
              const precio = parseFloat(
                card.querySelector(".precio").textContent.replace("$", "").replace(".", "")
              );
              const imagen = card.querySelector("img").src;
              const cantidad = parseInt(card.querySelector(".cantidad").textContent);

              const item = { titulo, precio, imagen, cantidad };

              // 3) Guardar en localStorage
              let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
              carrito.push(item);
              localStorage.setItem("carrito", JSON.stringify(carrito));

              alert("Producto agregado al carrito ✔");
            }
          });

        } else {
          contenedor.innerHTML = "<p>No hay productos disponibles.</p>";
        }
      });
    })
    .catch(error => console.error("Error al cargar los productos:", error));
});

