import * as ui from "./ui.js";
const IMAGE_PER_PAGE = 40;
const requestImages = async (url) => {
  try {
    const request = await fetch(
      `https://pixabay.com/api/?key=22260502-17179de03c9aa2aa75d52acbd&${url}`
    );
    const data = await request.json();
    return data;
  } catch (error) {
    ui.showInfo(
      true,
      null,
      "#infoNotification",
      `<div id='txtError'>Ha ocurrido un error - ${error}!</div>`
    );
  }
};

const findImagePerTerm = async (requestTerm, typeImage, page = 1) => {
  const data = await requestImages(
    `q=${requestTerm}&image_type=${typeImage}&per_page=${IMAGE_PER_PAGE}&page=${page}`
  );
  ui.showInfo(false, "txtLoader", "#infoNotification");
  if (data.hits.length >= 1) {
    let images = data.hits;
    let imagesHTML = images
      .map((image) => {
        return ui.cardImage(image);
      })
      .join("");

    content.innerHTML = imagesHTML;
    ui.showPagination(true, IMAGE_PER_PAGE, data.totalHits);
  } else {
    content.innerHTML = `<div
        id="alert"
        class="
          text-center
          bg-red-100
          border-red-400
          text-red-700
          px-4
          py-3
          rounded
          max-w-lg
          mx-auto
          mt-6
        "
      ><p>No se encontraron coincidencias!</p></div>`;
    ui.showPagination(false);
  }
};

const loadImages = async (array) => {
  const favoritosContent = document.getElementById("favoritosContent");
  try {
    const data = await Promise.all(
      array.map((id) => {
        return requestImages(`id=${id}`);
      })
    );
    ui.showInfo(false, "txtLoadFav", "#favoritosContent");
    if (data.length >= 1) {
      const imagesHtml = data
        .map((image) => {
          return ui.cardImage(image.hits[0], 2);
        })
        .join("");

      favoritosContent.innerHTML += imagesHtml;
    }
  } catch (error) {
    ui.showInfo(
      true,
      null,
      "#favoritosContent",
      `<p id='txtError'>Ocurrió un error : ${error} </p>`
    );
    setTimeout(() => {
      ui.showInfo(false, "txtError", "#favoritosContent");
    }, 2000);
  }
};

export { findImagePerTerm, loadImages };
