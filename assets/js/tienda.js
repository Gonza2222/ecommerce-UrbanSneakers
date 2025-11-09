document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-comprar")) {
    
    const logueado = localStorage.getItem("usuarioLogueado");

    if (!logueado) {
      alert("Debes iniciar sesión para comprar 🛒");
      // Detectamos si estamos dentro de "assets/pages"
      const rutaLogin = window.location.pathname.includes("assets/pages/")
        ? "../pages/login_usuarios.html"
        : "assets/pages/login_usuarios.html";
      // Redirigir al login con ruta relativa
      window.location.href = `${basePath}assets/pages/login_usuarios.html`;
      return;
    }

    alert("Producto agregado al carrito ✅");
  }
});