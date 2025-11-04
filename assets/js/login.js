document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // evita que recargue la página

        const correo = document.getElementById("correo").value;
        const contrasena = document.getElementById("contrasena").value;

        // Validación simple (usuario de prueba)
        const usuarioValido = "test@correo.com";
        const passValida = "1234";

        if (correo === usuarioValido && contrasena === passValida) {
            localStorage.setItem("usuarioLogueado", correo);
            alert("Inicio de sesión exitoso ✅");

            // Redirige a la tienda
            window.location.href = "../../index.html";
        } else {
            alert("Usuario o contraseña incorrectos ❌");
        }
    });
});
