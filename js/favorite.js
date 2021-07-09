import * as ui from "./ui.js";
import * as apiPixabay from "./apiPixabay.js";
let imagesId;
const KEY = "pixabayImages";

const getDataStorage = () => {
  return JSON.parse(localStorage.getItem(KEY));
};

const setDataStorage = (content) => {
  localStorage.setItem(KEY, JSON.stringify(content));
};

const inicializationStorage = () => {
  if (!localStorage.getItem(KEY)) {
    localStorage.setItem(KEY, JSON.stringify([]));
  }
  imagesId = new Set([...getDataStorage()]);
};

const inicializationImagesFavorites = () => {
  inicializationStorage();
  if (!imagesId.size) {
    document.getElementById(
      "favoritosContent"
    ).innerHTML = `<p> No tienes imagenes favoritas </p>`;
  }

  if (imagesId.size) {
    ui.showInfo(
      true,
      null,
      "#favoritosContent",
      "<p id='txtLoadFav'> Cargando... </p>"
    );
    apiPixabay.loadImages([...imagesId]);
  }
};

const addFavorite = (idimg) => {
  if (imagesId.has(idimg)) {
    ui.showNotificationFavorite(2, "Imagen ya está añadida en favoritos");
  }

  if (!imagesId.has(idimg)) {
    saveLocalStorage(idimg);
    ui.printIconOp(idimg, "#content");
    ui.showNotificationFavorite(1, "Añadido a favoritos");
  }
};

const saveLocalStorage = (idimg) => {
  imagesId.add(idimg);
  setDataStorage([...imagesId]);
  apiPixabay.loadImages([idimg]);
};

const deleteFavorite = (idimg) => {
  if (imagesId.has(idimg)) {
    imagesId.delete(idimg);
    setDataStorage([...imagesId]);
    ui.deleteCardImg(idimg, "#favoritosContent");
  }
};

export { addFavorite, inicializationImagesFavorites, deleteFavorite };
