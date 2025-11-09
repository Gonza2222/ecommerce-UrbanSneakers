document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault(); // Evita envío real del formulario

  alert("Registro exitoso ✅");

  window.location.href = "login_usuarios.html";
});