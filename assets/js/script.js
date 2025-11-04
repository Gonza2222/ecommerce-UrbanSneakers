document.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-comprar")) {
    
    const logueado = localStorage.getItem("usuarioLogueado");

    if (!logueado) {
      alert("Debes iniciar sesión para comprar 🛒");
      window.location.href = "./assets/pages/login_usuarios.html";
      return;
    }

    alert("Producto agregado al carrito ✅");
  }
});