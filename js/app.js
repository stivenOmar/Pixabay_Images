import * as ui from "./ui.js";
import * as apiPixabay from "./apiPixabay.js";
const term = document.getElementById("termino");
const form = document.getElementById("formulario");
const content = document.getElementById("content");
const pagination = document.getElementById("paginacion");
const btnBuscador = document.getElementById("btnBuscador");
const btnFavoritos = document.getElementById("btnFavoritos");
let TERM = "";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (term.value.trim()) {
    ui.showInfo(true, null, "<p id='txtLoader'>Loading...</p>");
    TERM = term.value.toLowerCase();
    apiPixabay.requestImages(TERM, "photo");
  }

  if (!term.value.trim()) {
    ui.showInfo(
      true,
      null,
      `<p id='txtNotTerm' class='bg-red-100 border-red-400
          text-red-700 '> Ingresa un término </p>`
    );
    setTimeout(() => {
      ui.showInfo(false, "txtNotTerm");
    }, 2000);
  }
});

pagination.addEventListener("click", (e) => {
  e.preventDefault();
  const elPage = e.target;
  if (elPage.classList[0] === "pag") {
    const { page } = elPage.dataset;
    apiPixabay.requestImages(TERM, "photo", page);
  }
});

const imagesId = new Set();

content.addEventListener("click", (e) => {
  if (e.target.classList.contains("star")) {
    const { idimg } = e.target.dataset;
    e.target.classList.add("starActive");
    if (imagesId.has(idimg)) {
      ui.showNotificationFavorite(2, "Imagen ya está añadida en favoritos");
    }

    if (!imagesId.has(idimg)) {
      imagesId.add(idimg);
      ui.showNotificationFavorite(1, "Añadido a favoritos");
    }
  }
});

btnBuscador.addEventListener("click", (e) => {
  e.preventDefault();
  ui.activeMainModule("Buscador");
});

btnFavoritos.addEventListener("click", (e) => {
  e.preventDefault();
  ui.activeMainModule("Favoritos");
});
