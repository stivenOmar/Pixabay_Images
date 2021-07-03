import * as ui from "./ui.js";
const IMAGE_PER_PAGE = 40;
const requestImages = async (requestTerm, typeImage, page = 1) => {
  try {
    const request = await fetch(
      `https://pixabay.com/api/?key=22260502-17179de03c9aa2aa75d52acbd&q=${requestTerm}&image_type=${typeImage}&per_page=${IMAGE_PER_PAGE}&page=${page}`
    );
    const data = await request.json();
    ui.showInfo(false, "txtLoader");
    console.log(data);
    if (data.hits.length >= 1) {
      let images = data.hits;
      let imagesHTML = images
        .map((image) => {
          return `<div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
                <div class="cardImg">
                  <img
                  class='w-full'
                    src="${image.previewURL}"
                    alt=""
                  />
                  <div class="cardInfo">
                   <p>${image.imageHeight} x ${image.imageWidth}</p>
                    <div class="social mb-2">
                      <div class="iconSocial">
                        <img
                          src="./img/comments.png"
                          alt=""
                          title="Comentarios de la imagen"
                        />
                        <p>${image.comments}</p>
                      </div>
                      <div>
                      <i class="fas fa-star star" data-idimg='${image.id}' title='Añadir a favoritos'></i>
                      </div>
                      <div class="iconSocial">
                        <img
                          src="./img/heart.png"
                          alt=""
                          title="Personas que les gustó la imagen"
                        />
                        <p>${image.likes}</p>
                      </div>
                    </div>
                    <div class="btnLinks">
                      <button class="btnViewImg">
                        <a
                          href="${image.largeImageURL}"
                          target="_blank"
                        >
                          Ver imagen
                        </a>
                      </button>
                      <a
                        href="${image.pageURL}"
                        target="_blank"
                      >
                        <img
                          src="./img/photo.png"
                          alt=""
                          title="Descargar desde pixabay"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>`;
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
  } catch (error) {
    ui.showInfo(
      true,
      null,
      `<div id='txtError'>Ha ocurrido un error - ${error}!</div>`
    );
  }
};

export { requestImages };
