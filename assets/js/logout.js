document.addEventListener("DOMContentLoaded", () => {
    const btnCerrarSesion = document.getElementById("btn-cerrar-sesion");

    // Detectar si estamos en una subcarpeta
    const basePath = window.location.pathname.includes("/pages/") ? "../../" : "";

    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", () => {
            // Eliminar usuario del localStorage
            localStorage.removeItem("usuarioLogueado");

            alert("Cierre de sesión exitoso ✅");

            // Redirigir al login con ruta relativa
            window.location.href = `${basePath}assets/pages/login_usuarios.html`;
        });
    }

    // Detectar si se cerró sesión desde otra pestaña
    window.addEventListener("storage", (event) => {
        if (event.key === "usuarioLogueado" && event.newValue === null) {
            alert("Tu sesión fue cerrada desde otra pestaña.");
            window.location.href = `${basePath}assets/pages/login_usuarios.html`;
        }
    });
});