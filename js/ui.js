const infoNotification = document.getElementById("infoNotification");
const notifyFav = document.getElementById("notifyFav");
const pagination = document.getElementById("paginacion");

const showInfo = (show, id = null, element = "") => {
  if (show) {
    infoNotification.innerHTML = element;
  }

  if (!show) {
    const elementInfo = infoNotification.querySelector(`#${id}`);
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

export { showInfo, showNotificationFavorite, showPagination, activeMainModule };
