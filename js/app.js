import * as ui from "./ui.js";
import * as apiPixabay from "./apiPixabay.js";
import * as favorite from "./favorite.js";
const term = document.getElementById("termino");
const form = document.getElementById("formulario");
const content = document.getElementById("content");
const favoritosContent = document.getElementById("favoritosContent");
const pagination = document.getElementById("paginacion");
const btnBuscador = document.getElementById("btnBuscador");
const btnFavoritos = document.getElementById("btnFavoritos");
let TERM = "";

document.addEventListener("DOMContentLoaded", (e) => {
  favorite.inicializationImagesFavorites();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (term.value.trim()) {
    ui.showInfo(
      true,
      null,
      "#infoNotification",
      "<p id='txtLoader'>Loading...</p>"
    );
    TERM = term.value.toLowerCase();
    apiPixabay.findImagePerTerm(TERM, "photo");
  }

  if (!term.value.trim()) {
    ui.showInfo(
      true,
      null,
      "#infoNotification",
      `<p id='txtNotTerm' class='bg-red-100 border-red-400
          text-red-700 '> Ingresa un término </p>`
    );
    setTimeout(() => {
      ui.showInfo(false, "txtNotTerm", "#infoNotification");
    }, 2000);
  }
});

pagination.addEventListener("click", (e) => {
  e.preventDefault();
  const elPage = e.target;
  if (elPage.classList[0] === "pag") {
    const { page } = elPage.dataset;
    apiPixabay.findImagePerTerm(TERM, "photo", page);
  }
});

content.addEventListener("click", (e) => {
  const elFavorite = e.target;
  if (elFavorite.classList.contains("star")) {
    const { idimg } = elFavorite.dataset;
    favorite.addFavorite(idimg);
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

favoritosContent.addEventListener("click", (e) => {
  const elFavorite = e.target;
  if (elFavorite.classList.contains("circle")) {
    const { idimg } = elFavorite.dataset;
    favorite.deleteFavorite(idimg);
  }
});
