document.addEventListener("DOMContentLoaded", () => {
    const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));
    const header = document.querySelector("header");

    // Renderizar header según sesión
    if (usuario) {
        header.innerHTML = `
            <div class="usuario-activo">
                <span>Bienvenido 👋 ${usuario.nombre}</span>
                <a href="/assets/pages/carrito.html" id="carritoLink">🛒 Carrito</a>
                <button id="logoutBtn">Cerrar sesión</button>
            </div>
        `;
    } else {
        header.innerHTML = `
            <div id="header-no-logueado">
                <p>No tienes una cuenta aún? <a href="/assets/pages/registro_usuarios.html">Regístrate</a></p>
                <a href="/assets/pages/login_usuarios.html">Iniciar sesión</a>
            </div>
        `;
    }

    // Proteger páginas privadas
    const paginasProtegidas = ["carrito.html", "perfil.html"];
    const rutaActual = window.location.pathname;
    const requiereLogin = paginasProtegidas.some(p => rutaActual.includes(p));

    if (!usuario && requiereLogin) {
        alert("Debes iniciar sesión para acceder a esta página.");
        window.location.href = "/assets/pages/login_usuarios.html";
    }

    // Logout
    document.addEventListener("click", (e) => {
        if (e.target.id === "logoutBtn") {
            localStorage.removeItem("usuarioLogueado");
            alert("Sesión cerrada ✅");
            window.location.href = "/assets/pages/login_usuarios.html";
        }
    });

    // Detectar logout desde otra pestaña
    window.addEventListener("storage", (event) => {
        if (event.key === "usuarioLogueado" && event.newValue === null) {
            alert("Tu sesión fue cerrada desde otra pestaña.");
            window.location.href = "/assets/pages/login_usuarios.html";
        }
    });
});