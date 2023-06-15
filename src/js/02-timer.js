
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import Notiflix from 'notiflix';


const datetimePicker = document.getElementById("datetime-picker");
const startButton = document.querySelector("[data-start]");
const daysElement = document.querySelector("[data-days]");
const hoursElement = document.querySelector("[data-hours]");
const minutesElement = document.querySelector("[data-minutes]");
const secondsElement = document.querySelector("[data-seconds]");
let intervalId = null;
let fechaFinal = null;

startButton.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if (selectedDate <= currentDate) {
      Notiflix.Notify.failure("Please choose a date in the future");
      // startButton.disabled = true;
    } else {
      startButton.disabled = false;
      fechaFinal = selectedDate


    }
  },
};

flatpickr(datetimePicker, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours= Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}


startButton.addEventListener("click", () => {
  startButton.disabled = true;
  intervalId = setInterval(function() {
    let fechaActual = new Date ()
    let diferencia = fechaFinal - fechaActual
    let objDiference = convertMs(diferencia);
    if (objDiference.days < 0 && objDiference.hours < 0 &&
        objDiference.minutes < 0 && objDiference.seconds < 0) {
          daysElement.textContent = "00";
          hoursElement.textContent = "00";
          minutesElement.textContent = "00";
          secondsElement.textContent = "00";
      clearInterval(intervalId);
  } else {
      const addLeadingZero = (value) => {
          return value.toString().padStart(2, '0');
      };
      daysElement.textContent = addLeadingZero(objDiference.days);
      hoursElement.textContent = addLeadingZero(objDiference.hours);
      minutesElement.textContent = addLeadingZero(objDiference.minutes);
      secondsElement.textContent = addLeadingZero(objDiference.seconds);
  }
  }, 1000);
});





