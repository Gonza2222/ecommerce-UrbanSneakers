document.addEventListener("DOMContentLoaded", () => {
    const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");

    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", () => {
            // Eliminar usuario del localStorage
            localStorage.removeItem("usuarioLogueado");

            alert("Cierre de sesión exitoso ✅");

            // Redirigir al login con ruta absoluta
            window.location.href = "/assets/pages/login_usuarios.html";
        });
    }

    // Detectar si se cerró sesión desde otra pestaña
    window.addEventListener("storage", (event) => {
        if (event.key === "usuarioLogueado" && event.newValue === null) {
            alert("Tu sesión fue cerrada desde otra pestaña.");
            window.location.href = "/assets/pages/login_usuarios.html";
        }
    });
});