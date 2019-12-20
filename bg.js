const body = document.querySelector("body");
const IMG_NUM = 6;

function handleImgLoad() {}
function paintImage(imgNumber) {
  const image = new Image();
  image.src = `images/${imgNumber}.jpg`;
  image.classList.add("bgImage");
  image.addEventListener("loadend", handleImgLoad);
  body.appendChild(image);
}

function ranNumGenerator() {
  return Math.floor(Math.random() * IMG_NUM) + 1;
}

function init() {
  const ranNum = ranNumGenerator();
  paintImage(ranNum);
}
init();
