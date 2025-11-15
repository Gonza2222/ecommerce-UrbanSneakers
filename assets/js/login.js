document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("correo").value.trim();
  const password = document.getElementById("contrasena").value.trim();

  if (email !== "" && password !== "") {
    const usuario = {
      nombre: email.split("@")[0],
      email: email
    };

    sessionStorage.setItem("usuarioLogueado", JSON.stringify(usuario));

    alert("Inicio de sesión exitoso ✅");

    const basePath = window.location.pathname.includes("/assets/pages/")
      ? "../../"
      : "./";

    window.location.href = `${basePath}index.html`;
  } else {
    alert("Por favor, completa todos los campos ❌");
  }
});

