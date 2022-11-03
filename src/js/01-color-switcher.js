
let timerId = null;
const COLOR_DELAY = 1000;
const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};


refs.startBtn.addEventListener('click', onChangeBg);
refs.stopBtn.addEventListener('click', onStopChangedBg);

function setBodyBgColor(color) {
  document.body.style.backgroundColor = color;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onChangeBg() {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;

  timerId =  setInterval(() => {
   setBodyBgColor(getRandomHexColor());
  console.log('запускаем цвет')
}, COLOR_DELAY); 
  
}

function onStopChangedBg() {
  clearInterval(timerId);
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
}




