import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  dateTimeInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysValue: document.querySelector('[data-days]'),
  hoursValue: document.querySelector('[data-hours]'),
  minutesValue: document.querySelector('[data-minutes]'),
  secondsValue: document.querySelector('[data-seconds]'),
};

const CURRENT_DATE = new Date();
let SELECTED_DATE = new Date();
let delta;

refs.startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < CURRENT_DATE) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;
      SELECTED_DATE = selectedDates[0];
      console.log(refs.dateTimeInput.value);
    }
  },
};

flatpickr(refs.dateTimeInput, options);
require('flatpickr/dist/themes/material_blue.css');

refs.startBtn.addEventListener('click', startTimer);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days =
    Math.floor(ms / day) < 10
      ? addLeadingZero(Math.floor(ms / day))
      : Math.floor(ms / day);
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }

function startTimer() {
  refs.startBtn.disabled = true;
  refs.dateTimeInput.disabled = true;
  getDeltaTime();
}

function getDeltaTime() {
  timerId = setInterval(() => {
    delta = SELECTED_DATE - Date.now();
    const dateOffset = convertMs(delta);

    if (delta <= 0) {
      clearInterval(timerId);
    } else {
      clockView(dateOffset);
    }
  }, 1000);
}

function clockView(dateOffset) {
  refs.daysValue.textContent = dateOffset.days;
  refs.hoursValue.textContent = dateOffset.hours;
  refs.minutesValue.textContent = dateOffset.minutes;
  refs.secondsValue.textContent = dateOffset.seconds;
}