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
                rol: "cliente" // opcional, útil si querés roles más adelante
            };

            localStorage.setItem("usuarioLogueado", JSON.stringify(usuario));

            alert("Inicio de sesión exitoso ✅");

            // Redirige a la página principal con ruta absoluta
            window.location.href = "/index.html";
        } else {
            alert("Usuario o contraseña incorrectos ❌");
        }
    });
});
