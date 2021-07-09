const notifyFav = document.getElementById("notifyFav");
const pagination = document.getElementById("paginacion");

const showInfo = (show, id = null, parent = "", element = "") => {
  const parentElement = document.querySelector(`${parent}`);
  if (show) {
    parentElement.innerHTML = element;
  }

  if (!show) {
    const elementInfo = parentElement.querySelector(`#${id}`);
    if (elementInfo) {
      elementInfo.remove();
    }
  }
};

const showNotificationFavorite = (type, content) => {
  //Type =  1: succes, 2:other

  if (type === 1) {
    notifyFav.innerHTML = `<p>${content}! <i class="fas fa-star"></i></p>`;
  } else {
    notifyFav.innerHTML = `<p>${content}! <i class="fas fa-exclamation-circle"></i></p>`;
  }
  notifyFav.classList.add("notifyFavHover");
  setTimeout(() => {
    notifyFav.classList.remove("notifyFavHover");
  }, 1800);
};

const showPagination = (show = true, cantElements = 1, totalElements = 1) => {
  if (show) {
    const limitPag = parseInt(Math.ceil(totalElements / cantElements));
    pagination.innerHTML = "";
    for (let index = 1; index <= limitPag; index++) {
      pagination.innerHTML += `<a href="./#home" data-page='${index}' class="pag" >${index}</a>`;
    }
  }

  if (!show) {
    pagination.innerHTML = "";
  }
};

const activeMainModule = (active = "Buscador") => {
  let hidden = "";
  if (active === "Favoritos") {
    hidden = "Buscador";
  } else {
    hidden = "Favoritos";
  }
  const btnModule = document.getElementById(`btn${active}`);
  const module = document.getElementById(`${active.toLowerCase()}`);
  const btnModuleHidden = document.getElementById(`btn${hidden}`);
  const moduleHidden = document.getElementById(`${hidden.toLowerCase()}`);

  btnModule.classList.add("activeTab");
  module.classList.replace("inactiveMain", "activeMain");
  btnModuleHidden.classList.remove("activeTab");
  moduleHidden.classList.replace("activeMain", "inactiveMain");
};

const cardImage = (image, type = 1) => {
  /* 1: Imagen resultado de busqueda
    2: Imagen añadida a favoritos
  */
  let iconOp = `<i class="fas fa-star star" data-idimg='${image.id}' title='Añadir a favoritos'></i>`;
  if (type === 2) {
    iconOp = `<i class="fas fa-minus-circle circle" data-idimg='${image.id}' title='Quitar de favoritos'></i>`;
  }

  return `
    <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
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
                      ${iconOp}
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
              </div>
  `;
};

const printIconOp = (id, section) => {
  const elementIconOp = document
    .querySelector(`${section}`)
    .querySelector(`[data-idimg='${id}']`);
  elementIconOp.classList.add("starActive");
};

const deleteCardImg = (idimg, section) => {
  const elementCard = document
    .querySelector(`${section}`)
    .querySelector(`[data-idimg='${idimg}']`);
  elementCard.parentElement.parentElement.parentElement.parentElement.remove();
  showNotificationFavorite(2, "Imagen elimanada de favoritos");
};

export {
  showInfo,
  showNotificationFavorite,
  showPagination,
  activeMainModule,
  cardImage,
  printIconOp,
  deleteCardImg,
};
