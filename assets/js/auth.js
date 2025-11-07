document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
  const header = document.getElementById("main-header");

  if (usuario) {
    header.innerHTML = `
      <div class="usuario-activo">
        <span>Bienvenido 👋 ${usuario.nombre}</span>
        <a href="/assets/pages/carrito.html" id="carritoLink">🛒 Carrito</a>
        <button id="logoutBtn">Cerrar sesión</button>
      </div>
    `;

    document.getElementById("logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("usuarioLogueado");
      alert("Sesión cerrada ✅");
      window.location.href = "/assets/pages/login_usuarios.html";
    });
  } else {
    header.innerHTML = `
      <div id="header-no-logueado">
        <p>No tienes una cuenta aún? <a href="/assets/pages/registro_usuarios.html">Regístrate</a></p>
        <a href="/assets/pages/login_usuarios.html">Iniciar sesión</a>
      </div>
    `;
  }
});