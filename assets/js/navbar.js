const navbar = document.getElementById("navbar");

// Definimos los links del navbar
const links = [
    { texto: "Destacados", url: "../../index.html" },
    { texto: "Hombre", url: "zapatillas_hombre.html" },
    { texto: "Mujer", url: "zapatillas_mujer.html" },
    { texto: "Niños", url: "zapatillas_ninos.html" }
];

// Creamos el <nav> y lo llenamos con los links
const nav = document.createElement("nav");
nav.classList.add("barra_navegacion");

links.forEach(link => {
    const a = document.createElement("a");
    a.href = link.url;
    const span = document.createElement("span");
    span.textContent = link.texto;
    a.appendChild(span);
    nav.appendChild(a);
});

// Insertamos el navbar en el div
navbar.appendChild(nav);