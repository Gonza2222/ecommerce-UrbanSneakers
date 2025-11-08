document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // evita que recargue la página

        const correo = document.getElementById("correo").value.trim();
        const contrasena = document.getElementById("contrasena").value.trim();

        // Validación simple (usuario de prueba)
        const usuarioValido = "test@correo.com";
        const passValida = "1234";

        if (correo === usuarioValido && contrasena === passValida) {
            // Guardar sesión en localStorage
            const usuario = {
                nombre: "Test User",
                correo: correo,
                rol: "cliente"
            };

            localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));

            alert("Inicio de sesión exitoso ✅");

            // Detectar si estamos en subcarpeta
            const basePath = window.location.pathname.includes("/pages/") ? "../../" : "";

            // Redirige a la página principal con ruta relativa
            window.location.href = `${basePath}index.html`;
        } else {
            alert("Usuario o contraseña incorrectos ❌");
        }
    });
});