const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const changeColor = document.querySelector('body');

stopBtn.disabled = true;
let intervalId = null;

const randomColorGenerator = {
  DELAY: 1000,

 getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  },

  interval() {
    intervalId = setInterval(() => {
      changeBgColorRandom();
    }, this.DELAY);
    stopBtn.disabled = false;
  },

  start() {
    startBtn.addEventListener('click', () => {
      this.interval();
      startBtn.disabled = true;
      stopBtn.disabled = false;
    });
    stopBtn.addEventListener('click', this.stop);
  },

  stop() {
    clearInterval(intervalId);
    stopBtn.disabled = true;
    startBtn.disabled = false;
  },
};

function changeBgColorRandom() {
  changeColor.style.backgroundColor = `${randomColorGenerator.getRandomHexColor()}`;
};

randomColorGenerator.start();