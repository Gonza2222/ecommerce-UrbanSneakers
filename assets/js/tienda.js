document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-comprar")) {
    
    const logueado = localStorage.getItem("usuarioLogueado");

    if (!logueado) {
      alert("Debes iniciar sesión para comprar 🛒");

      // Detectar si estamos en una subcarpeta
      const basePath = window.location.pathname.includes("/pages/") ? "../../" : "";

      // Redirigir al login con ruta relativa
      window.location.href = `${basePath}assets/pages/login_usuarios.html`;
      return;
    }

    alert("Producto agregado al carrito ✅");
  }
});