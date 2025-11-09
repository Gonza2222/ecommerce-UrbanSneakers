document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-comprar")) {
    
    const logueado = localStorage.getItem("usuarioLogueado");

    if (!logueado) {
      alert("Debes iniciar sesión para comprar 🛒");

      // Detectamos si estamos dentro de "assets/pages"
      const rutaLogin = window.location.pathname.includes("assets/pages/")
        ? "../pages/login_usuarios.html"
        : "assets/pages/login_usuarios.html";

      window.location.href = rutaLogin;
      return;
    }

    alert("Producto agregado al carrito ✅");
  }
});