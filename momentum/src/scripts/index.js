
window.onload = function () {


   //get background image
   setBg();

   // show time

   showTime();

   getWeather();


}

const time = document.querySelector('.time');
const today = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const userName = document.querySelector('.name');
let randomNum = '';
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const city = document.querySelector('.city');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');




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
   localStorage.setItem('city', city.value);

}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {

   if (localStorage.getItem('name')) {
      userName.value = localStorage.getItem('name');
      userName.style.color = greeting.style.color;
   }
   if (localStorage.getItem('city')) {
      city.value = localStorage.getItem('city');
   }
}
window.addEventListener('load', getLocalStorage)

//get background image
const setBg = () => {

   const timeOfDay = getTimeOfDay();
   const bgNum = randomNum;
   const img = new Image();
   img.src = `https://github.com/Irina0313/stage1-tasks/blob/main/images/${timeOfDay}/${bgNum}.jpg?raw=true`;
   img.onload = () => {
      document.querySelector('body').style.backgroundImage = `url(${img.src})`;
   };
};

const getRandomNum = () => {
   let num = Math.floor(Math.random() * 20);
   if (num > 0) {
      num = String(num).padStart(2, '0');
   } else {
      num = String(num + 1).padStart(2, '0');
   }
   randomNum = String(num);
   return randomNum;
};
randomNum = getRandomNum();

slideNext.addEventListener('click', () => {
   getSlideNext();
});

slidePrev.addEventListener('click', () => {
   getSlidePrev();

})

const getSlideNext = () => {
   getLocalStorage();
   if (randomNum === '20') {
      randomNum = '01';
   } else {
      randomNum = String(Number(randomNum) + 1).padStart(2, '0');
   }
   setBg();
}

const getSlidePrev = () => {
   if (randomNum === '01') {
      randomNum = '20';
   } else {
      randomNum = String(Number(randomNum) + -1).padStart(2, '0');
   }
   setBg();
};

//weather informer

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather-description');
const weatherError = document.querySelector('.weather-error');



async function getWeather() {

   getLocalStorage();
   if (city.value === '') {
      city.value = "Minsk"
   }
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=de976795907a030f102e85cd73d64b2f&units=metric`;
   try {
      const res = await fetch(url);
      if (!res.ok) {
         weatherError.textContent = 'Check the city name, please. Let try again :)';
         weatherIcon.className = 'weather-icon owf';
         weatherIcon.textContent = '';
         temperature.textContent = '';
         weatherDescription.textContent = '';
         wind.textContent = '';
         humidity.textContent = '';
         throw new Error('Ответ сети был не ok.');
      }

      const data = await res.json();
      weatherError.textContent = '';
      weatherIcon.className = 'weather-icon owf';
      weatherIcon.classList.add(`owf-${data.weather[0].id}`);
      temperature.textContent = `${Math.round(data.main.temp)}°C`;
      weatherDescription.textContent = data.weather[0].description;
      wind.textContent = `Wind speed: ${Math.round(data.wind.speed)}m/s`;
      humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;

   } catch (error) {
      console.log('Возникла проблема с вашим fetch запросом: ', error.message);
   }
}



city.addEventListener('change', () => {
   if (city.value === '') {
      weatherError.textContent = 'Type the city name';
      weatherIcon.className = 'weather-icon owf';
      weatherIcon.textContent = '';
      temperature.textContent = '';
      weatherDescription.textContent = '';
      wind.textContent = '';
      humidity.textContent = '';
      return
   }
   setLocalStorage();
   getWeather();
});


//day qoute
let result = 0;
async function getQuotes() {
   const quotes = 'source/quotesEn.json';
   const res = await fetch(quotes);
   const data = await res.json();
   let num = Math.floor(Math.random() * data.length);
   if (result != num) {
      result = num;
   } else {
      result = num + 1;
   }
   quote.textContent = `" ${data[result].text} "`;
   author.textContent = `${data[result].author}`;
}
getQuotes();
changeQuote.addEventListener('click', getQuotes);

//audio player

const btnPlay = document.querySelector('.play');
const btnPlayNext = document.querySelector('.play-next');
const btnPlayPrev = document.querySelector('.play-prev')
const audio = new Audio();
const playListContainer = document.querySelector('.play-list');
const playingSong = document.querySelector('.playing-song');
const volumeContainer = document.querySelector('.volume-container');
const volumeButton = document.querySelector('.volume');
const volumeLevel = document.querySelector('.volume-percentage');



let isPlay = false;
let playNum = 0;
let li = '';
let div = '';
import playList from './playList.js';
const audioLength = document.querySelector('.player-time .length');
audio.volume = 0.75;

audio.src = `${playList[playNum].src}`;

const playSong = () => {
   isPlay = true;
   audio.play();
}

const pauseSong = () => {
   isPlay = false;
   audio.pause();
}

playList.forEach(el => {
   li = document.createElement('li');
   li.classList.add('play-item');
   li.textContent = el.title;
   playListContainer.append(li);
})
const playItem = document.querySelectorAll('.play-item');

playItem.forEach(el => {
   div = document.createElement('div');
   div.classList.add('button-item');
   div.classList.add('button-item_play');
   el.prepend(div);
})

btnPlay.addEventListener('click', () => {
   toggleBtn();
   toggleBtnItem();
   getSongDuration();
   if (isPlay === false) {
      playSong();
   } else {
      pauseSong();
   }
   getNameOfPlaingSong();
   playListContainer.children[playNum].classList.add('played');
});

const btnPlayItem = document.querySelectorAll('.button-item');
const toggleBtnItem = () => {
   playListContainer.children[playNum].children[0].classList.toggle('button-item_play');
   playListContainer.children[playNum].children[0].classList.toggle('button-item_pause');
}



audio.addEventListener('ended', (event) => {
   playListContainer.children[playNum].classList.remove('played');
   playNext();
});
const toggleBtn = () => {
   btnPlay.classList.toggle('pause');
}

btnPlayNext.addEventListener('click', () => {
   playListContainer.children[playNum].classList.remove('played');
   playNext();
});

const getNameOfPlaingSong = () => {
   if (playingSong.classList.contains('playing-song-animated')) {
      playingSong.classList.remove('playing-song-animated');
   }
   playingSong.innerHTML = `${playListContainer.children[playNum].innerHTML}`;
   const songContainer = document.querySelector('.song-container')
   if (songContainer.offsetWidth < playingSong.offsetWidth) {
      playingSong.classList.add('playing-song-animated');
   }
}

const playNext = () => {
   if (isPlay === true) {
      audio.pause();
      toggleBtnItem();
   }
   if (playNum === playList.length - 1) {
      playNum = 0;
   } else {
      playNum = playNum + 1;
   }
   if (!btnPlay.classList.contains('pause')) {
      btnPlay.classList.add('pause');
   }
   audio.src = `${playList[playNum].src}`
   getSongDuration();
   getNameOfPlaingSong();
   toggleBtnItem();
   playSong();
   playListContainer.children[playNum].classList.add('played');
};

btnPlayPrev.addEventListener('click', () => {
   playListContainer.children[playNum].classList.remove('played');
   playPrev();
});

const playPrev = () => {
   if (isPlay === true) {
      audio.pause();
      toggleBtnItem();
   }
   if (playNum === 0) {
      playNum = playList.length - 1;
   } else {
      playNum = playNum - 1;
   }
   if (!btnPlay.classList.contains('pause')) {
      btnPlay.classList.add('pause');
   }
   audio.src = `${playList[playNum].src}`
   getSongDuration();
   getNameOfPlaingSong();
   toggleBtnItem();
   playSong();
   playListContainer.children[playNum].classList.add('played');
}

const songLength = document.querySelector('.player-time .length');
const getSongDuration = () => {
   songLength.innerHTML = `${playList[playNum].duration}`
}
const timeLine = document.querySelector(".timeline");
const progressSongLine = document.querySelector(".timeline .progress");


const getCurrentSongTime = (curTime) => {
   let sec = Math.floor(curTime);
   let min = Math.floor(sec / 60);
   let hours = 0;
   if (min > 59) {
      hours = Math.floor(min / 60);
      min -= hours * 60;
   }
   sec -= min * 60;
   if (hours > 0) {
      return `${String(hours).padStart(2, 0)}:${String(min).padStart(2, 0)}:${String(sec).padStart(2, 0)}`;
   }
   return `${String(min).padStart(2, 0)}:${String(sec).padStart(2, 0)}`;
}
//control from playlist

playListContainer.addEventListener('click', (e) => {
   toggleBtn();

   if (isPlay === true && (e.target.classList.contains('played')) || e.target.parentElement.classList.contains('played')) {
      console.log('1')
      toggleBtnItem();
      pauseSong();
   } else if (isPlay === false && ((e.target.classList.contains('played')) || e.target.parentElement.classList.contains('played'))) {
      console.log('2')
      toggleBtnItem();
      playSong();
   }
   else if (!e.target.classList.contains('played') && !e.target.parentElement.classList.contains('played')) {
      console.log('3')
      btnPlayItem.forEach(item => {
         item.classList.remove('button-item_pause');
         item.classList.add('button-item_play');
         item.parentElement.classList.remove('played')
      })
      let targetSongName = '';
      if (e.target.classList.contains('play-item')) {
         targetSongName = e.target.innerText;
         e.target.classList.add('played');
      } else if (e.target.classList.contains('button-item')) {
         targetSongName = e.target.parentElement.innerText;
         e.target.parentElement.classList.add('played');
      }
      function predicate(element, index, array) {
         if (targetSongName === element.title) {
            return element;
         }
      }
      playNum = playList.findIndex(predicate);

      if (isPlay === true) {
         pauseSong();
      }

      audio.src = `${playList[playNum].src}`
      toggleBtnItem();
      getSongDuration();
      playSong();
      getNameOfPlaingSong();
      playListContainer.children[playNum].classList.add('played');
   }
})

timeLine.addEventListener('click', (e) => {

   progressSongLine.style.width = (e.pageX - e.target.offsetLeft) * 100 / timeLine.offsetWidth + "%";

   audio.currentTime = (e.pageX - e.target.offsetLeft) / timeLine.offsetWidth * audio.duration;
});

const getSongPoint = () => {
   progressSongLine.style.width = audio.currentTime / audio.duration * 100 + "%";
   document.querySelector(".player-time .current").textContent = getCurrentSongTime(
      audio.currentTime);
}
setInterval(() => {
   getSongPoint();
}, 200);

//volume control

const toggleVolume = () => {
   volumeButton.addEventListener('click', () => {
      volumeButton.classList.toggle('volume-active');
      volumeButton.classList.toggle('volume-muted');
      if (volumeButton.classList.contains('volume-muted')) {
         audio.volume = 0;
      } else {
         getLevelOfVolume();

      }
   });
}
toggleVolume();
volumeContainer.addEventListener('mouseover', () => {
   volumeLevel.classList.remove('volume-percentage_hidden');
   volumeLevel.classList.add('volume-percentage_visible');
});

volumeContainer.addEventListener('mouseleave', () => {
   volumeLevel.classList.remove('volume-percentage_visible');
   volumeLevel.classList.add('volume-percentage_hidden');
});

const getLevelOfVolume = () => {
   let audioLevel = volumeLevel.value;
   volumeLevel.addEventListener('change', (e) => {
      audioLevel = e.target.value;
      if (audioLevel === '0') {
         volumeButton.classList.remove('volume-active');
         volumeButton.classList.add('volume-muted');
      } else if (audioLevel != '0') {
         volumeButton.classList.remove('volume-muted');
         volumeButton.classList.add('volume-active');
      }

      return audio.volume = audioLevel / 100;
   })
   return audio.volume = audioLevel / 100;
}
getLevelOfVolume()

