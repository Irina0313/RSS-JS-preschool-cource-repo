
window.onload = function () {


   //get background image
   setBg();

   // show time

   showTime();


}

const time = document.querySelector('.time');
const today = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const userName = document.querySelector('.name');


//show time

const showTime = () => {
   const date = new Date();
   const currentTime = date.toLocaleTimeString();
   time.textContent = currentTime;
   //show date
   showDate();
   //show greeting
   showGreeting();
   setTimeout(showTime, 1000);
};

//show date

const showDate = () => {
   const date = new Date();
   const options = { weekday: 'long', month: 'long', day: 'numeric' };
   const currentDate = date.toLocaleDateString('en-Us', options);
   today.textContent = currentDate;
};

//show greeting

const showGreeting = () => {
   const timeOfDay = getTimeOfDay();
   const greetingText = `Good ${timeOfDay},`;
   greeting.textContent = greetingText;
   if (timeOfDay === 'night') {
      greeting.style.color = '#F5F5DC';
   } else if (timeOfDay === 'morning') {
      greeting.style.color = '#FFDC33';
   } else if (timeOfDay === 'afternoon') {
      greeting.style.color = '#8CCB5E';
   } else if (timeOfDay === 'evening') {
      greeting.style.color = '#A2ADD0';
   }

}
const getTimeOfDay = () => {
   const date = new Date();
   const time = date.getHours();
   if (time < 6) {
      return 'night';
   } else if (time < 12) {
      return 'morning';
   } else if (time < 18) {
      return 'afternoon';
   } else if (time < 24) {
      return 'evening';
   }
};

function setLocalStorage() {
   localStorage.setItem('name', userName.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
   if (localStorage.getItem('name')) {
      userName.value = localStorage.getItem('name');
      userName.style.color = greeting.style.color;
   }
}
window.addEventListener('load', getLocalStorage)

//get background image
const setBg = () => {
   const timeOfDay = getTimeOfDay();
   const bgNum = getRandomNum();
   console.log(bgNum)
   document.querySelector('body').style.backgroundImage = `url('https://github.com/Irina0313/stage1-tasks/blob/main/images/${timeOfDay}/${bgNum}.jpg?raw=true')`;
}

getRandomNum = () => {
   const num = Math.floor(Math.random() * 20);
   if (num > 0) {
      return String(num).padStart(2, '0');
   } else {
      getRandomNum();
   }
}