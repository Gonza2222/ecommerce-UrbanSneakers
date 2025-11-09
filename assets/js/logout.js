document.addEventListener("DOMContentLoaded", () => {
  const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");

  if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", () => {
      localStorage.removeItem("usuarioLogueado");
      alert("Cierre de sesión exitoso ✅");
      
      // CORRECTO - desde páginas en assets/pages/
      window.location.href = "login_usuarios.html";
    });
  }

  window.addEventListener("storage", (event) => {
    if (event.key === "usuarioLogueado" && event.newValue === null) {
      alert("Tu sesión fue cerrada desde otra pestaña.");
      window.location.href = "login_usuarios.html";
    }
  });
});