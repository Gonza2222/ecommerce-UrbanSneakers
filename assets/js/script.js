document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-comprar")) {
    
    const logueado = localStorage.getItem("usuarioLogueado");

    if (!logueado) {
      alert("Debes iniciar sesión para comprar 🛒");
      
      // CORRECTO - desde páginas en assets/pages/
      window.location.href = "login_usuarios.html";
      return;
    }

    alert("Producto agregado al carrito ✅");
  }
});