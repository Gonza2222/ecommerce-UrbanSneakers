function renderNavbar() {
  const menu = rutas.map(r => `<a href="${r.url}"><span>${r.titulo}</span></a>`).join("");

  document.getElementById("navbar").innerHTML = `
    <nav class="barra_navegacion">
      ${menu}
      <button id="logoutBtn" style="margin-left:auto;">Cerrar sesión</button>
    </nav>
  `;

  document.getElementById("logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("usuarioLogueado");
    window.location.href = "./login.html";
  });
}