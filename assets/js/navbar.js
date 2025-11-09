function renderNavbar() {
  if (!Array.isArray(rutas)) {
    console.error("El array 'rutas' no está definido.");
    return;
  }

  const menu = rutas
    .map(r => `<a href="${r.url}"><span>${r.titulo}</span></a>`)
    .join("");

  const navbar = document.getElementById("navbar");

  if (!navbar) {
    console.error("No se encontró el elemento con id='navbar'.");
    return;
  }

  navbar.innerHTML = `
    <nav class="barra_navegacion">
      ${menu}
      <button id="logoutBtn" style="margin-left:auto;">Cerrar sesión</button>
    </nav>
  `;

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("usuarioLogueado");
    alert("Sesión cerrada ✅");

    window.location.href = "./assets/pages/login_usuarios.html";
  });
}