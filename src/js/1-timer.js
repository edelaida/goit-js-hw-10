import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector('button[data-start]');
const datDays = document.querySelector('[data-days]');
const datHours = document.querySelector('[data-hours]');
const datMinutes = document.querySelector('[data-minutes]');
const datSeconds = document.querySelector('[data-seconds]');

let userSelectedDate = [];

class SelectDate {
  constructor(convertMs) {
    this.intervalId = null;
    this.selectTime = convertMs;
  }
  start() {
    this.intervalId = setInterval(() => {
     const diff = userSelectedDate - Date.now();      
      datDays.textContent = format(this.selectTime(diff).days); 
      datHours.textContent = format(this.selectTime(diff).hours);
      datMinutes.textContent = format(this.selectTime(diff).minutes);
      datSeconds.textContent = format(this.selectTime(diff).seconds);
    }, 1000);      
  }
  clearInter() {
    clearInterval(this.intervalId);
  } 
}
function format(num) {
  return num.toString().padStart(2, '0');
}

startBtn.addEventListener('click', () => {
  selectDate.start();
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
     userSelectedDate = selectedDates[0];
    console.log(selectedDates[0]); 
    
    if (userSelectedDate < Date.now()) {
      startBtn.disabled = true;
      iziToast.show({       
          message: `Please choose a date in the future`,
          position: 'topRight',
          backgroundColor: 'red',
          messageColor: 'white', 
       });     
    } else {
      startBtn.disabled = false;
     }       
  },
};

const flatTime = new flatpickr('#datetime-picker', options);


function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
const selectDate = new SelectDate(convertMs);

 

