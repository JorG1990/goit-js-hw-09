
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
      window.alert("Please choose a date in the future");
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
      fechaFinal = selectedDate
    }
  },
};

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  daysElement.innerText = Math.floor(ms / day);
  // Remaining hours
  hoursElement.innerText = Math.floor((ms % day) / hour);
  // Remaining minutes
  minutesElement.innerText = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  secondsElement.innerText = Math.floor((((ms % day) % hour) % minute) / second);


}


// Function to add leading zero if the value has less than two characters
function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}


flatpickr(datetimePicker, options);

// Event listener for the start button
startButton.addEventListener("click", () => {
  // const selectedDate = flatpickrInstance.selectedDate[0]

  intervalId = setInterval(function() {
    let fechaActual = new Date ()
    let diferencia = fechaFinal - fechaActual
    convertMs(diferencia);
  }, 1000);


});

