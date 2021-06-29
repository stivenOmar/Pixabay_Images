const term = document.getElementById("termino");
const form = document.getElementById("formulario");
const content = document.getElementById("content");
const pagination = document.getElementById("paginacion");
const infoNotification = document.getElementById("infoNotification");

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

const requestImages = async (requestTerm, typeImage) => {
  try {
    const request = await fetch(
      `https://pixabay.com/api/?key=22260502-17179de03c9aa2aa75d52acbd&q=${requestTerm}&image_type=${typeImage}`
    );
    const data = await request.json();
    showInfo(false, "txtLoader");
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
                    <div class="social">
                      <div class="iconSocial">
                        <img
                          src="./img/comments.png"
                          alt=""
                          title="Comentarios de la imagen"
                        />
                        <p>55</p>
                      </div>
                      <div class="iconSocial">
                        <img
                          src="./img/heart.png"
                          alt=""
                          title="Personas que les gustó la imagen"
                        />
                        <p>45</p>
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
    }
  } catch (error) {
    showInfo(
      true,
      null,
      `<div id='txtError'>Ha ocurrido un error - ${error}!</div>`
    );
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (term.value.trim()) {
    showInfo(true, null, "<p id='txtLoader'>Loading...</p>");
    requestImages(term.value.toLowerCase(), "photo");
  }

  if (!term.value.trim()) {
    showInfo(
      true,
      null,
      `<p id='txtNotTerm' class='bg-red-100 border-red-400
          text-red-700 '> Ingresa un término </p>`
    );
    setTimeout(() => {
      showInfo(false, "txtNotTerm");
    }, 2000);
  }
});
