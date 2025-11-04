document.addEventListener("click", (e) => {
    if (e.target.id === "logoutBtn") {
        localStorage.removeItem("usuarioLogueado");
        alert("Sesión cerrada ✅");
        window.location.href = "../pages/login_usuarios.html";
    }
});