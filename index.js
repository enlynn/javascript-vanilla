// You're gonna need this
const NINE_HOURS_MILLISECONDS = 32400000;

const xmasDay = new Date("2019-12-24:00:00:00+0900");
const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector("h2");

function getTime() {
  // Don't delete this.
  const date = new Date();
  let calcTime = parseInt((xmasDay - date) / 1000);
  const day = parseInt(calcTime / 86400);
  calcTime = calcTime - day * 86400;
  const hour = parseInt(calcTime / 3600);
  calcTime = calcTime - hour * 3600;
  const min = parseInt(calcTime / 60);
  calcTime = calcTime - min * 60;
  const sec = parseInt(calcTime);

  clockTitle.innerText = `${day}d ${hour < 10 ? `0${hour}` : hour}h ${
    min < 10 ? `0${min}` : min
  }m ${sec < 10 ? `0${sec}` : sec}s`;
}

function init() {
  getTime();
  setInterval(getTime, 1000);
}
init();
