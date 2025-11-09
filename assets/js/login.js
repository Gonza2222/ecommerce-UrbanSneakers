document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault(); // Evita que recargue la página

  const email = document.getElementById("correo").value.trim();
  const password = document.getElementById("contrasena").value.trim();

  // Simulación de login básico
  if (email !== "" && password !== "") {
    alert("Inicio de sesión exitoso ✅");
    // Redirige a home o index
    window.location.href = "../../index.html";
  } else {
    alert("Por favor, completa todos los campos ❌");
  }
});
