document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("main-header");

  const usuario = JSON.parse(sessionStorage.getItem("usuarioLogueado"));

  const basePath =
    window.location.pathname.endsWith("index.html") ||
    window.location.pathname === "/"
      ? "assets/pages/"
      : "./";

  if (usuario) {
    // Mostrar menú de usuario logueado
    header.innerHTML = `
      <div class="usuario-activo">
        <span>Bienvenido 👋 ${usuario.nombre}</span>
        <a href="${basePath}carrito.html" id="carritoLink">🛒 Carrito</a>
        <button id="logoutBtn">Cerrar sesión</button>
      </div>
    `;
  } else {
    //Mostrar menú para usuarios no logueados
    header.innerHTML = `
      <div id="header-no-logueado">
        <p>¿No tienes una cuenta aún? 
          <a href="${basePath}registro_usuarios.html">Regístrate</a>
        </p>
        <a href="${basePath}login_usuarios.html">Iniciar sesión</a>
      </div>
    `;
  }

  document.addEventListener("click", (e) => {
    if (e.target.id === "logoutBtn") {
      sessionStorage.removeItem("usuarioLogueado");
      alert("Sesión cerrada ✅");
      window.location.href = `${basePath}login_usuarios.html`;
    }
  });
});




