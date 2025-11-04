document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("usuarioLogueado");
            alert("Sesión cerrada ✅");
            window.location.href = "login_usuarios.html"; 
        });
    }
});