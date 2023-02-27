
window.onload = function () {
   //get language
   getLanguage();

   //get background image
   setBg();

   // show time

   showTime();

   getWeather();

   checkIfTodoIsHidden();
}
let button = '';
const time = document.querySelector('.time');
const today = document.querySelector('.date');
const greetingContainer = document.querySelector('.greeting-container');
const greeting = document.querySelector('.greeting');
const userName = document.querySelector('.name');
let randomNum = '';
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const city = document.querySelector('.city');
const quoteContainer = document.querySelector('.quote-container');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');


//langOptions.innerText = Object.keys[0](greetingTranslation);

userName.addEventListener('change', () => {
   localStorage.setItem('name', userName.value)

});

const greetingTranslation = {
   en: 'Good',
   ru: 'Добр'
}

let lang = '';
const getLanguage = () => {

   if (localStorage.getItem('language') === '' || !localStorage.getItem('language')) {
      lang = 'en';
      localStorage.setItem('language', 'en');
   } else {
      lang = localStorage.getItem('language');
   }
}

//show time
if (localStorage.getItem('time') === 'hidden') {
   time.classList.add('time_hidden');
}


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

if (localStorage.getItem('date') === 'hidden') {
   today.classList.add('date_hidden');
}

const showDate = () => {
   const date = new Date();
   const options = { weekday: 'long', month: 'long', day: 'numeric' };
   let local = '';
   getLanguage();
   lang === 'en' ? local = 'en-US' : local = 'ru-RU';
   // console.log(local)
   const currentDate = date.toLocaleDateString(local, options);
   today.textContent = currentDate;
};

//show greeting

if (localStorage.getItem('greeting') === 'hidden') {
   greetingContainer.classList.add('greeting_hidden');
}
localStorage.getItem('name');
const showGreeting = () => {
   getLanguage();
   lang === 'en' ? userName.placeholder = "my dear!" : userName.placeholder = "дружище!";
   const restOFGreeting = getGreeting();
   const greetingText = `${greetingTranslation[lang]}${restOFGreeting}, `;
   greeting.textContent = greetingText;

}
let timeOfDay = '';
const getTimeOfDay = () => {

   const date = new Date();
   const time = date.getHours();
   if (time < 6) {
      timeOfDay = 'night';
   } else if (time < 12) {
      timeOfDay = 'morning';
   } else if (time < 18) {
      timeOfDay = 'afternoon';
   } else if (time < 24) {
      timeOfDay = 'evening';
   }
   return timeOfDay;

};

const getGreeting = () => {
   if (timeOfDay === 'night') {
      greeting.style.color = '#F5F5DC';
      return lang === 'en' ? ' night' : 'ой ночи';
   } else if (timeOfDay === 'morning') {
      greeting.style.color = '#FFDC33';
      return lang === 'en' ? ' morning' : 'ое утро';
   } else if (timeOfDay === 'afternoon') {
      greeting.style.color = '#8CCB5E';
      return lang === 'en' ? ' afternoon' : 'ый день';
   } else if (timeOfDay === 'evening') {
      greeting.style.color = '#A2ADD0';
      return lang === 'en' ? ' evening' : 'ый вечер';
   }
};





function getLocalStorage() {

   if (localStorage.getItem('name')) {
      userName.value = localStorage.getItem('name');
      userName.style.color = greeting.style.color;
   }
   if (localStorage.getItem('city')) {
      city.value = localStorage.getItem('city');
   }
   if (localStorage.getItem('language')) {
      lang = localStorage.getItem('language');
   }
}

window.addEventListener('load', getLocalStorage)



//get background image

/*let unsplashLink = '';
let resultLinc;
let imgTag = 'nature';*/

let source = localStorage.getItem('source');
const getRandomNum = (number) => {
   let num = Math.floor(Math.random() * number);
   if (num > 0) {
      num = String(num).padStart(2, '0');
   } else {
      num = String(num + 1).padStart(2, '0');
   }
   randomNum = String(num);
   return randomNum;
};
getRandomNum(20);


const setBg = () => {
   source = localStorage.getItem('source');
   if (source === '' || !source) {
      source = 'GIT';
      localStorage.setItem('source', source)
   }

   timeOfDay = getTimeOfDay();
   let bgNum = randomNum;
   const img = new Image();


   async function getLinkToImage() {
      let url = '';
      console.log(`Источник: ${source}, время суток: ${timeOfDay}, тэги: ${localStorage.getItem(`tagsFor${source}`)}`)
      if (localStorage.getItem(`tagsFor${source}`) === '' || !localStorage.getItem(`tagsFor${source}`)) {
         localStorage.setItem(`tagsFor${source}`, timeOfDay);
      }
      if (source === 'Unsplash API') {
         url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${localStorage.getItem(`tagsFor${source}`)}&client_id=yW9HyBnOrimrmoBFYqyRmKDdlN6DCA9CKXX5NbcuilA`;
         const res = await fetch(url);
         const data = await res.json();
         img.src = data.urls.regular;
         console.log(url);
      }
      if (source === 'Flickr API') {
         url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=a15a06a8b39bd2bb4b71633f0b6f285f&tags=${localStorage.getItem(`tagsFor${source}`)}&extras=url_l&format=json&nojsoncallback=1`;
         const res = await fetch(url);
         const data = await res.json();
         getRandomNum(data.photos.photo.length);
         randomNum = String(Number(randomNum));
         if (data.photos.photo[randomNum].url_l) {
            img.src = data.photos.photo[randomNum].url_l;
         } else {
            while (!data.photos.photo[randomNum].url_l) {
               return getRandomNum(data.photos.photo.length);

            }
            img.src = data.photos.photo[randomNum].url_l;
         }
         console.log(url);
      }

      if (source === 'GIT') {
         if (Number(randomNum) > 20) {
            getRandomNum(20);
         }
         console.log(randomNum, typeof randomNum)
         bgNum = randomNum;
         img.src = `https://github.com/Irina0313/stage1-tasks/blob/main/images/${timeOfDay}/${bgNum}.jpg?raw=true`;
         console.log(img.src);
      }

      img.onload = () => {
         document.querySelector('body').style.backgroundImage = `url(${img.src})`;
      }
   }
   getLinkToImage();
}


slideNext.addEventListener('click', () => {
   getSlideNext();
});

slidePrev.addEventListener('click', () => {
   getSlidePrev();
})

const getSlideNext = () => {
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


const weatherContainer = document.querySelector('.weather')
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const weatherDescription = document.querySelector('.weather-description');
const weatherError = document.querySelector('.weather-error');

if (localStorage.getItem('weather') === 'hidden') {
   weatherContainer.classList.add('weather_hidden');
}


async function getWeather() {

   getLanguage();
   if (city.value === '' || !localStorage.getItem('city')) {
      lang === 'en' ? city.value = "Minsk" : city.value = "Минск";
   }
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${lang}&appid=de976795907a030f102e85cd73d64b2f&units=metric`;
   console.log('url истоника погоды: ', url)
   try {
      const res = await fetch(url);
      if (!res.ok) {
         if (lang === 'en') {
            weatherError.textContent = 'Check the city name, please. Let try again :)';
         } else if (lang === 'ru') {
            weatherError.textContent = 'Проверь название города :)';
         }
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
      lang === 'en' ? wind.textContent = `Wind speed: ${Math.round(data.wind.speed)}m/s` : wind.textContent = `Скорость ветра: ${Math.round(data.wind.speed)}m/s`;
      lang === 'en' ? humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%` : humidity.textContent = `Влажность: ${Math.round(data.main.humidity)}%`;

   } catch (error) {
      console.log('Возникла проблема с вашим fetch запросом: ', error.message);
   }
}


city.addEventListener('change', () => {
   if (city.value === '') {
      if (lang === 'en') {
         weatherError.textContent = 'Type the city name';
      } else if (lang === 'ru') {
         weatherError.textContent = 'Введи название города';
      }
      weatherIcon.className = 'weather-icon owf';
      weatherIcon.textContent = '';
      temperature.textContent = '';
      weatherDescription.textContent = '';
      wind.textContent = '';
      humidity.textContent = '';
      return
   }
   localStorage.setItem('city', city.value);
   getWeather();
});


//day qoute
if (localStorage.getItem('quote') === 'hidden') {
   quoteContainer.classList.add('quote_hidden');
   changeQuote.classList.add('quote_hidden');
}

let result = 0;
async function getQuotes() {
   let quotes = '';
   lang = localStorage.getItem('language');
   lang === 'en' ? quotes = 'source/quotesEn.json' : quotes = 'source/quotesRu.json'
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
const playerContainer = document.querySelector('.player');
const btnPlay = document.querySelector('.play');
const btnPlayNext = document.querySelector('.play-next');
const btnPlayPrev = document.querySelector('.play-prev')
const audio = new Audio();
const playListContainer = document.querySelector('.play-list');
const playingSong = document.querySelector('.playing-song');
const volumeContainer = document.querySelector('.volume-container');
const volumeButton = document.querySelector('.volume');
const volumeLevel = document.querySelector('.volume-percentage');

if (localStorage.getItem('player') === 'hidden') {
   playerContainer.classList.add('player_hidden');
}
let isPlay = false;
let playNum = 0;
let li = '';
let div = '';
let input = '';
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

   if (isPlay === true && (e.target.classList.contains('played') || e.target.parentElement.classList.contains('played'))) {
      toggleBtnItem();
      pauseSong();
   } else if (isPlay === false && (e.target.classList.contains('played') || e.target.parentElement.classList.contains('played'))) {
      toggleBtnItem();
      playSong();
   }
   else if (!e.target.classList.contains('played') && !e.target.parentElement.classList.contains('played')) {
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





//To Do


let listNames = [];
const listNamesEn = ['Done', 'Inbox', 'Today'];
const listNamesRu = ['Сделано', 'Предстоящее', 'Сегодня'];
let listName = document.querySelector('.list-name');
const todo = document.querySelector('.todo');
const modalTodo = document.querySelector('.todo-container');
const listArrowContainer = document.querySelector('.list-button-container');
const modalTodoNames = document.querySelector('.modal-todo-names');
const todoNamesList = document.querySelector('.todo-names-list');
const listSettingsButton = document.querySelector('.list-settings-button');
const todoBody = document.querySelector('.todo-body');
const toDoContentContainer = document.querySelector('.todo-content-container');
const todoFooter = document.querySelector('.todo-footer');

function checkIfTodoIsHidden() {
   if (localStorage.getItem('todo') === 'hidden') {
      todo.classList.remove('todo_active');
      todo.classList.add('todo_hidden');
      modalTodo.classList.add('todo_hidden');
   }
}

localStorage.getItem('language');
function showTodoSection() {
   lang === 'en' ? todo.innerText = 'Todo' : todo.innerText = 'Список дел';
}
showTodoSection();

todo.addEventListener('click', () => {
   modalTodo.classList.toggle('todo_hidden');
   todo.classList.toggle('todo_active');
   showModalTodo();
});



const showTodoBody = () => {
   let tasksAmount;

   listNames.forEach((el, i) => {
      listName = document.querySelector('.list-name');


      if (listName.innerText === el) {
         tasksAmount = Number(localStorage.getItem(`${listNamesEn[i].toLowerCase()}-tasks-amount`));

         if (tasksAmount === 0) {
            cleanDefaultFrame();
            cleanToDoFooter();
            showDefaultFrame();
            getToDoInput();
            getTasksList();
         } else {
            cleanDefaultFrame();
            getToDoInput();
            const todoInput = document.querySelector('.todo-input');
            todoInput.classList.remove('todo-input_hidden');
            todoInput.classList.add('todo-input_active');
            getTasksList();
            showTasks();
         }
      }
   })
}

function showModalTodo() {
   getListName();
   showTodoBody();
   listArrowContainer.addEventListener('click', showModalToDoList);
}

let defoltFrameContent = [];
const defoltFrameContentEn = ['Add a todo to get started', 'Swich to', 'New Todo'];
const defoltFrameContentRu = ['Для начала добавь задачу', 'Переключиться на', 'Новая задача'];

const showDefaultFrame = () => {
   cleanDefaultFrame();
   getLanguage();
   lang === 'en' ? defoltFrameContent = defoltFrameContentEn : defoltFrameContent = defoltFrameContentRu;
   div = document.createElement('div');
   div.classList.add('defolt-frame-title');
   div.innerText = defoltFrameContent[0];
   toDoContentContainer.append(div);

   div = document.createElement('div');
   div.classList.add('defolt-frame-link');
   listNames.forEach((el, i) => {
      if (el === listName.innerText && i === 2) {
         div.innerText = `${defoltFrameContent[1]} ${listNames[1]} >`;
      } else if (el === listName.innerText && i === 1) {
         div.innerText = `${defoltFrameContent[1]} ${listNames[2]} >`;
      } else if (el === listName.innerText && i === 0) {
         div.innerText = `${defoltFrameContent[1]} ${listNames[2]} >`;
      }
   })
   toDoContentContainer.append(div);

   button = document.createElement('button');
   button.classList.add('defolt-frame-button');
   button.innerText = defoltFrameContent[2];
   toDoContentContainer.append(button);
}
function getToDoInput() {
   cleanToDoFooter();
   getLanguage();
   lang === 'en' ? defoltFrameContent = defoltFrameContentEn : defoltFrameContent = defoltFrameContentRu;
   input = document.createElement('input');
   input.type = "text";
   input.classList.add('todo-input');
   input.classList.add('todo-input_hidden');
   input.placeholder = defoltFrameContent[2];
   todoFooter.append(input);
}


todoBody.addEventListener('click', (e) => {
   const todoInput = document.querySelector('.todo-input');
   const defoltFrameButton = document.querySelector('.defolt-frame-button');
   if (e.target.classList.contains('defolt-frame-link')) {
      moveToToDoList();
   }
   if (e.target.classList.contains('defolt-frame-button')) {
      todoInput.classList.remove('todo-input_hidden');
      todoInput.classList.add('todo-input_active');
      defoltFrameButton.classList.add('defolt-frame-button_hidden');
      getTasksList();
   }


   if (e.target.classList.contains('task-checkbox') && e.target.checked === false) {
      e.target.checked = false;
      e.target.nextElementSibling.classList.remove('task-value_checked');
   } else if (e.target.classList.contains('task-checkbox') && e.target.checked === true) {
      e.target.checked = true;
      e.target.nextElementSibling.classList.add('task-value_checked');
   }

   // open task settings

   let settingsModalContent = document.querySelector('.task-settings-modal');
   let taskItem = document.querySelectorAll('.task-item');
   if (e.target.classList.contains('task-settings')) {

      let settingsModalContent = document.querySelector('.task-settings-modal');

      if (settingsModalContent.classList.contains('task-settings-modal_hidden') || !settingsModalContent) {
         showSettingsTaskModal();
         settingsModalContent = document.querySelector('.task-settings-modal');
         settingsModalContent.classList.add('task-settings-modal_active');
         settingsModalContent.classList.remove('task-settings-modal_hidden');
      } else if (settingsModalContent.classList.contains('task-settings-modal_active')) {
         settingsModalContent.classList.remove('task-settings-modal_active');
         settingsModalContent.classList.add('task-settings-modal_hidden');
      }


      taskItem.forEach(el => {
         el.classList.remove('task-item_active')
      })
      e.target.parentElement.classList.toggle('task-item_active');
   }

   //edit task

   if (e.target.classList.contains('edit')) {
      taskItem.forEach(el => {
         if (el.classList.contains('task-item_active')) {
            el.children[1].readOnly = false;
            el.children[1].classList.add('task-value_edited');
            settingsModalContent.classList.toggle('task-settings-modal_active');
            settingsModalContent.classList.toggle('task-settings-modal_hidden');

            el.children[1].addEventListener('change', () => {
               el.children[1].readOnly = true;
               el.children[1].classList.remove('task-value_edited');
               el.classList.remove('task-item_active');
               rerecordTasksList();
            })
         }
      })
   }

   // delete task

   if (e.target.classList.contains('delete')) {
      settingsModalContent.classList.toggle('task-settings-modal_active');
      settingsModalContent.classList.toggle('task-settings-modal_hidden');
      taskItem.forEach(el => {
         if (el.classList.contains('task-item_active')) {
            el.remove();
         }
      })
      rerecordTasksList();
      showTodoBody();
   }

   // move to somewere

   if (e.target.classList.contains('move-to-today') || e.target.classList.contains('task-settings-today')) {
      settingsModalContent.classList.toggle('task-settings-modal_active');
      settingsModalContent.classList.toggle('task-settings-modal_hidden');
      taskItem.forEach(el => {
         if (el.classList.contains('task-item_active')) {
            addTaskToTodayTaskList(el.children[1].value);
            el.remove();
            rerecordTasksList();
         }
      })
      showTodoBody();
   }

   if (e.target.classList.contains('move-to-inbox') || e.target.classList.contains('task-settings-inbox')) {
      settingsModalContent.classList.toggle('task-settings-modal_active');
      settingsModalContent.classList.toggle('task-settings-modal_hidden');
      taskItem.forEach(el => {
         if (el.classList.contains('task-item_active')) {
            addTaskToInboxTaskList(el.children[1].value);
            el.remove();
            rerecordTasksList();
         }
      })
      showTodoBody();
   }

   if (e.target.classList.contains('move-to-done') || e.target.classList.contains('task-settings-done')) {
      settingsModalContent.classList.toggle('task-settings-modal_active');
      settingsModalContent.classList.toggle('task-settings-modal_hidden');
      taskItem.forEach(el => {
         if (el.classList.contains('task-item_active')) {
            addTaskToDoneTaskList(el.children[1].value);
            el.remove();
            rerecordTasksList();
         }
      })
      showTodoBody();
   }


   // move to...

   if (e.target.classList.contains('move-to')) {
      changeSettingsModalContent();
   }

   if (e.target.classList.contains('task-settings-arrow')) {
      showSettingsTaskModal();
      let settingsModalContent = document.querySelector('.task-settings-modal');
      settingsModalContent.classList.add('task-settings-modal_active');
      settingsModalContent.classList.remove('task-settings-modal_hidden');
   }
})

function changeSettingsModalContent() {

   cleanSettingsModalContent();
   div = document.createElement('div');
   div.classList.add('task-settings-modal');
   div.classList.add('task-settings-modal_active');
   toDoContentContainer.append(div);


   let taskSettingsModal = document.querySelector('.task-settings-modal');

   div = document.createElement('div');
   div.classList.add('task-settings-item');
   div.classList.add('task-settings-arrow');
   taskSettingsModal.append(div)


   let moveToList = [];
   let moveToListEn = ['Done', 'Inbox', 'Today'];
   let moveToListRu = ['Сделано', 'Предстоящее', 'Сегодня'];

   getLanguage();
   lang === 'en' ? moveToList = moveToListEn : moveToList = moveToListRu;
   console.log(moveToList)

   moveToList.forEach((el, i) => {
      if (listName.innerText === el && i != 0) {
         moveToListRu.splice(i, 1);
         moveToListEn.splice(i, 1);
      }
      if (listName.innerText === el && i === 0) {
         moveToListRu.splice(i, 2);
         moveToListEn.splice(i, 2);
      }
   })

   console.log(moveToList)
   moveToList.forEach((el, i) => {
      div = document.createElement('div');
      div.classList.add('task-settings-item');
      div.classList.add(`task-settings-${moveToListEn[i].toLowerCase()}`);
      div.innerText = el;
      taskSettingsModal.append(div);
   })

}


function rerecordTasksList() {
   let taskValue = document.querySelectorAll('.task-value');
   let listTask = [];
   taskValue.forEach(el => {
      listTask.push(el.value)
   })

   listNames.forEach((el, i) => {
      if (el === listName.innerText) {
         localStorage.setItem(`tasksList${listNamesEn[i]}`, JSON.stringify(listTask));
         localStorage.setItem(`${listNamesEn[i].toLowerCase()}-tasks-amount`, listTask.length);
      }
   })
}

function addTaskToTodayTaskList(value) {

   let listTask = [];
   if (!localStorage.getItem('tasksListToday') || localStorage.getItem('tasksListToday') === '') {
      listTask.push(String(value));
      localStorage.setItem('tasksListToday', JSON.stringify(listTask));
      localStorage.setItem('today-tasks-amount', listTask.length);
   } else {
      listTask = JSON.parse(localStorage.getItem('tasksListToday'));
      listTask.push(String(value))
      localStorage.setItem('tasksListToday', JSON.stringify(listTask));
      localStorage.setItem('today-tasks-amount', listTask.length);
   }
}

function addTaskToInboxTaskList(value) {

   let listTask = [];
   if (!localStorage.getItem('tasksListInbox') || localStorage.getItem('tasksListTInbox') === '') {
      listTask.push(String(value));
      localStorage.setItem('tasksListInbox', JSON.stringify(listTask));
      localStorage.setItem('inbox-tasks-amount', listTask.length);
   } else {
      listTask = JSON.parse(localStorage.getItem('tasksListInbox'));
      listTask.push(String(value))
      localStorage.setItem('tasksListInbox', JSON.stringify(listTask));
      localStorage.setItem('inbox-tasks-amount', listTask.length);
   }
}

function addTaskToDoneTaskList(value) {

   let listTask = [];
   if (!localStorage.getItem('tasksListDone') || localStorage.getItem('tasksListTDone') === '') {
      listTask.push(String(value));
      localStorage.setItem('tasksListDone', JSON.stringify(listTask));
      localStorage.setItem('done-tasks-amount', listTask.length);
   } else {
      listTask = JSON.parse(localStorage.getItem('tasksListDone'));
      listTask.push(String(value))
      localStorage.setItem('tasksListDone', JSON.stringify(listTask));
      localStorage.setItem('done-tasks-amount', listTask.length);
   }
}


function getTasksList() {

   const todoInput = document.querySelector('.todo-input');

   if (todoInput && todoInput.classList.contains('todo-input_active')) {
      todoInput.addEventListener('change', () => {
         cleanDefaultFrame();
         listNames.forEach((el, i) => {
            if (el === listName.innerText) {
               let listTask = [];
               if (!localStorage.getItem(`tasksList${listNamesEn[i]}`) || localStorage.getItem(`tasksList${listNamesEn[i].innerText}`) === '') {
                  listTask.push(String(todoInput.value));
                  localStorage.setItem(`tasksList${listNamesEn[i]}`, JSON.stringify(listTask));
                  localStorage.setItem(`${listNamesEn[i].toLowerCase()}-tasks-amount`, listTask.length);
                  todoInput.value = '';
               } else {
                  listTask = JSON.parse(localStorage.getItem(`tasksList${listNamesEn[i]}`));
                  listTask.push(String(todoInput.value))
                  localStorage.setItem(`tasksList${listNamesEn[i]}`, JSON.stringify(listTask));
                  localStorage.setItem(`${listNamesEn[i].toLowerCase()}-tasks-amount`, listTask.length);
                  todoInput.value = '';
               }
            }
         })
         showTasks();
      });

   }
}


const moveToToDoList = () => {
   if (listName.innerText === listNames[0] || listName.innerText === listNames[1]) {
      localStorage.setItem('To Do list', listNames[2]);
   } else if (listName.innerText === listNames[2]) {
      localStorage.setItem('To Do list', listNames[1]);
   }
   getListName();
   showTodoBody();
}

function showTasks() {

   let tasksListDone = JSON.parse(localStorage.getItem('tasksListDone'));
   let tasksListInbox = JSON.parse(localStorage.getItem('tasksListInbox'));
   let tasksListToday = JSON.parse(localStorage.getItem('tasksListToday'));
   let tasksList = [];

   listNames.forEach((el, i) => {
      if (listName.innerText === el && i === 0) {
         tasksList = tasksListDone;
      }
      if (listName.innerText === el && i === 1) {
         tasksList = tasksListInbox;
      }
      if (listName.innerText === el && i === 2) {
         tasksList = tasksListToday;
      }
   })


   tasksList.forEach(el => {
      div = document.createElement('div');
      div.classList.add('task-item');
      toDoContentContainer.append(div);
   })
   tasksList.forEach((el, i) => {
      let taskItem = document.querySelectorAll('.task-item')
      input = document.createElement('input');
      input.classList.add('task-checkbox');
      input.type = 'checkbox';
      taskItem[i].append(input);

      input = document.createElement('input');
      input.classList.add('task-value');
      input.type = "text";
      input.readOnly = true;
      input.value = el;
      taskItem[i].append(input);

      let span = document.createElement('span');
      span.classList.add('task-settings');
      span.classList.add('task-settings_hidden');

      taskItem[i].append(span);
   })
   let taskItem = document.querySelectorAll('.task-item')
   taskItem.forEach(item => {
      item.addEventListener('mouseover', (e) => {
         if (e.target === item || e.target === item.children[1]) {
            item.children[2].classList.remove('task-settings_hidden')
         }
      })
      item.addEventListener('mouseleave', (e) => {
         if (e.target === item || e.target === item.children[1]) {
            item.children[2].classList.add('task-settings_hidden')
         }
      })
   })
   showSettingsTaskModal()
}

function showSettingsTaskModal() {
   getLanguage();
   lang === 'en' ? listNames = listNamesEn : listNames = listNamesRu;
   let todoName = '';
   let todoListEn = ''
   let todoListRu = '';
   cleanSettingsModalContent();

   listNames.forEach((el, i) => {

      if (listName.innerText === el) {
         todoName = listNamesEn[i];
      }
      if (todoName === 'Today' || todoName === 'Done') {
         todoListEn = listNamesEn[1];
         todoListRu = listNamesRu[1];
      } else if (todoName === 'Inbox') {
         todoListEn = listNamesEn[2];
         todoListRu = listNamesRu[2];
      }
   })

   let settingsModalContent = [];
   let settingsModalContentEn = ['Edit', `Move To ${todoListEn}`, 'Move To...', 'Delete'];
   let settingsModalContentRu = ['Редактировать', `Переместить в ${todoListRu}`, 'Переместить в...', 'Удалить'];


   lang === 'en' ? settingsModalContent = settingsModalContentEn : settingsModalContent = settingsModalContentRu;

   div = document.createElement('div');
   div.classList.add('task-settings-modal');
   div.classList.add('task-settings-modal_hidden');
   toDoContentContainer.append(div);

   let taskSettingsModal = document.querySelector('.task-settings-modal');

   settingsModalContent.forEach(el => {
      div = document.createElement('div');
      div.classList.add('task-settings-item');
      div.innerText = el;
      taskSettingsModal.append(div);
   })

   let taskSettingsItem = document.querySelectorAll('.task-settings-item');
   let className = '';

   if (taskSettingsItem) {
      taskSettingsItem.forEach((el, i) => {
         className = settingsModalContentEn[i].replaceAll(' ', '-').replaceAll('.', '').toLowerCase();
         el.classList.add(`${className}`);



      })
      let taskItem = document.querySelectorAll('.task-item');
      if (todoName === 'Done') {
         taskItem.forEach((el, i) => {
            console.log(el)
            el.firstChild.checked = true;
            el.children[1].classList.add('task-value_checked');
         })

      }
   }
}

function cleanSettingsModalContent() {
   let taskSettingsModal = document.querySelector('.task-settings-modal');
   if (taskSettingsModal) {
      taskSettingsModal.remove();
   }
}


function cleanDefaultFrame() {
   while (toDoContentContainer.firstChild) {
      toDoContentContainer.removeChild(toDoContentContainer.firstChild)
   }
}

function cleanToDoFooter() {
   while (todoFooter.firstChild) {
      todoFooter.removeChild(todoFooter.firstChild)
   }
}

function getListName() {
   getLanguage();
   lang === 'en' ? listNames = listNamesEn : listNames = listNamesRu;
   if (localStorage.getItem('To Do list') === '' || !localStorage.getItem('To Do list')) {
      localStorage.setItem('To Do list', listNames[2]);
   } else if (lang === 'en') {
      listName.innerText = `${localStorage.getItem('To Do list')}`;

   } else if (lang === 'ru') {
      listNamesEn.forEach((el, i) => {
         if (localStorage.getItem('To Do list') === el) {
            listName.innerText = listNamesRu[i];
         }
      })
   }
   console.log(listName.innerText)
}

const showModalToDoList = () => {
   modalTodoNames.classList.toggle('modal-todo-names_hidden');
   cleanDefaultFrame();
   if (!modalTodoNames.classList.contains('modal-todo-names_hidden')) {
      getTodoListNames();
      todoNamesList.addEventListener('mouseover', () => {
         listArrowContainer.classList.add('listArrowContainer_active');
      })
      todoNamesList.addEventListener('mouseleave', () => {
         listArrowContainer.classList.remove('listArrowContainer_active');
      })

   }
}

//showModalTodo();

const getTodoListNames = () => {
   cleanTodoListNames();
   lang === 'en' ? listNames = listNamesEn : listNames = listNamesRu;
   let span = '';

   listNames.forEach(el => {
      li = document.createElement('li');
      li.classList.add('todo-name-title');
      li.textContent = el;
      todoNamesList.append(li);
      span = document.createElement('span');
      span.classList.add(`tasks-amount`);

      listNames.forEach((item, i) => {
         if (item === el) {
            span.classList.add(`${listNamesEn[i].toLowerCase()}-tasks-amount`);
            if (localStorage.getItem(`${listNamesEn[i].toLowerCase()}-tasks-amount`) === '' || !localStorage.getItem(`${listNamesEn[i].toLowerCase()}-tasks-amount`)) {
               span.innerText = '0';
               localStorage.setItem(`${listNamesEn[i].toLowerCase()}-tasks-amount`, '0');
            } else {
               span.innerText = localStorage.getItem(`${listNamesEn[i].toLowerCase()}-tasks-amount`);
            }
         }
      })
      li.append(span);
   })
   todoNamesList.addEventListener('click', (e) => {
      setTodoName(e.target);
   })
}

const cleanTodoListNames = () => {
   while (todoNamesList.firstChild) {
      todoNamesList.removeChild(todoNamesList.firstChild);
   }
}

function cleanToDoList() {
   let taskItem = document.querySelectorAll('.task-item');
   if (taskItem.length === 1) {
      taskItem.remove();
   } else if (taskItem.length > 1) {
      taskItem.forEach(el => {
         el.remove();
      })
   }
}

const setTodoName = (target) => {
   let end = target.innerText.indexOf('\n');
   listNames.forEach((el, i) => {
      if (target.innerText.slice(0, end) === el || target.parentElement.innerText.slice(0, end) === el) {
         localStorage.setItem('To Do list', listNamesEn[i]);
      }
   })
   getListName();
   hideModalToDoList();
   showTodoBody();
   //showTasks();
}

const hideModalToDoList = () => {
   modalTodoNames.classList.add('modal-todo-names_hidden');
   //modalTodo.style.height = (modalTodo.offsetHeight - modalTodoNames.offsetHeight - 30) + 'px';

}



//settings
const settingsButton = document.querySelector('.settings');
const settingsModal = document.querySelector('.settings-modal');
const body = document.querySelector('body');
const settingsList = document.querySelector('.settings-list');
let settingItems = document.querySelectorAll('.settings-item');
const settingsProperty = document.querySelector('.settings-property');



let settingsNamesEn = {
   General: ['Player', 'Weather', 'Time', 'Date', 'Greeting', 'Quote of the day', 'To Do'],
   Language: ['English', 'Russian'],
   Background: ['GIT', 'Unsplash API', 'Flickr API']
};
let settingsNamesRu = {
   Общие: ['Плейер', 'Погода', 'Время', 'Дата', 'Приветствие', 'Цитата дня', 'Список дел'],
   Язык: ['Английский', 'Русский'],
   Фон: ['GIT', 'Unsplash API', 'Flickr API']
};
let settingsNames = '';

const getSettingNames = () => {
   localStorage.getItem('language');
   getLanguage();
   if (lang === '' || lang === 'en') {
      return settingsNames = settingsNamesEn;
   } else {
      return settingsNames = settingsNamesRu;
   }
}

const getListOfSettigsNames = () => {
   getSettingNames();
   for (let el in settingsNames) {
      li = document.createElement('li');
      li.classList.add('settings-item');
      li.textContent = el;
      settingsList.append(li);
   }
   settingItems = document.querySelectorAll('.settings-item');
}



settingsButton.addEventListener('click', () => {
   settingsButton.classList.toggle('mooving');
   showDefaultSetting();
   settingsModal.classList.toggle('settings-modal_hidden');
   settingsModal.classList.toggle('settings-modal_visible');
   hideModalWindow();
})
let choosedSetting = '';
const showDefaultSetting = () => {
   if (settingItems.length === 0) {
      getListOfSettigsNames();
   }
   let num = 0;

   settingItems.forEach(item => {
      if (item.classList.contains('settings-item_active')) {
         num += 1;
      }
   })
   if (num === 0) {
      settingItems[0].classList.add('settings-item_active');
      choosedSetting = settingItems[0].innerHTML;
      getGeneralSettings(choosedSetting);
   }
};

settingsList.addEventListener('click', (e) => {
   cleanSettingsProperty();
   settingItems.forEach(item => {
      item.classList.remove('settings-item_active');
   })
   settingItems.forEach(item => {
      if (e.target === item) {
         item.classList.add('settings-item_active');
         Object.keys(settingsNames).forEach(key => {
            if (key === item.innerText) {
               choosedSetting = key
            }
         })
         getSettings(choosedSetting);
      }
   })

})



const getSettings = (choosedSetting) => {

   if (choosedSetting === Object.keys(settingsNames)[0]) {
      getGeneralSettings(choosedSetting);
   } else if (choosedSetting === Object.keys(settingsNames)[1]) {
      getLanguageSettings(choosedSetting);
   } else if (choosedSetting === Object.keys(settingsNames)[2]) {
      getBackgroundSettings(choosedSetting);
   }
}

let generalElement = '';
const getGeneralElement = () => {
   return generalElement = document.querySelectorAll('.general-element');
}
let generalToggle = '';
const getGeneralToggle = () => {
   return generalToggle = document.querySelectorAll('.general-toggle');
}

const getGeneralSettings = (choosedSetting) => {
   cleanSettingsProperty();
   settingsNames[choosedSetting].forEach(el => {

      div = document.createElement('div');
      div.classList.add('general-element');
      div.textContent = el;
      settingsProperty.append(div);
   })
   getGeneralElement();
   generalElement.forEach(el => {

      div = document.createElement('div');
      div.classList.add('general-toggle');
      el.append(div);
   })

   if (localStorage.getItem('player') === 'hidden') {
      settingsProperty.children[0].children[0].classList.add('general-toggle_unactive');
   } else {
      settingsProperty.children[0].children[0].classList.add('general-toggle_active');
   }
   if (localStorage.getItem('weather') === 'hidden') {
      settingsProperty.children[1].children[0].classList.add('general-toggle_unactive');
   } else {
      settingsProperty.children[1].children[0].classList.add('general-toggle_active');
   }
   if (localStorage.getItem('time') === 'hidden') {
      settingsProperty.children[2].children[0].classList.add('general-toggle_unactive');
   } else {
      settingsProperty.children[2].children[0].classList.add('general-toggle_active');
   }
   if (localStorage.getItem('date') === 'hidden') {
      settingsProperty.children[3].children[0].classList.add('general-toggle_unactive');
   } else {
      settingsProperty.children[3].children[0].classList.add('general-toggle_active');
   }
   if (localStorage.getItem('greeting') === 'hidden') {
      settingsProperty.children[4].children[0].classList.add('general-toggle_unactive');
   } else {
      settingsProperty.children[4].children[0].classList.add('general-toggle_active');
   }
   if (localStorage.getItem('quote') === 'hidden') {
      settingsProperty.children[5].children[0].classList.add('general-toggle_unactive');
   } else {
      settingsProperty.children[5].children[0].classList.add('general-toggle_active');
   }
   if (localStorage.getItem('todo') === 'hidden') {
      settingsProperty.children[6].children[0].classList.add('general-toggle_unactive');
   } else {
      settingsProperty.children[6].children[0].classList.add('general-toggle_active');
   }



   getGeneralToggle();
   generalToggle.forEach(el => {
      div = document.createElement('div');
      div.classList.add('general-toggle-cirсle');
      el.append(div);
   })


   generalToggle.forEach(el => {
      el.addEventListener('click', (e) => {
         e.target.classList.toggle('general-toggle_active');
         e.target.classList.toggle('general-toggle_unactive');
         if (e.target.classList.contains('general-toggle-cirсle')) {
            e.target.parentElement.classList.toggle('general-toggle_active');
            e.target.parentElement.classList.toggle('general-toggle_unactive');
         }
         if (settingsProperty.children[0].children[0].classList.contains('general-toggle_unactive')) {
            playerContainer.classList.add('player_hidden');
            localStorage.setItem('player', 'hidden');

         } else if (settingsProperty.children[0].children[0].classList.contains('general-toggle_active')) {
            playerContainer.classList.remove('player_hidden');
            localStorage.removeItem('player');
         }

         if (settingsProperty.children[1].children[0].classList.contains('general-toggle_unactive')) {
            weatherContainer.classList.add('weather_hidden');
            localStorage.setItem('weather', 'hidden');
         } else if (settingsProperty.children[1].children[0].classList.contains('general-toggle_active')) {
            weatherContainer.classList.remove('weather_hidden');
            localStorage.removeItem('weather');
         }

         if (settingsProperty.children[2].children[0].classList.contains('general-toggle_unactive')) {
            time.classList.add('time_hidden');
            localStorage.setItem('time', 'hidden');
         } else if (settingsProperty.children[2].children[0].classList.contains('general-toggle_active')) {
            time.classList.remove('time_hidden');
            localStorage.removeItem('time');
         }

         if (settingsProperty.children[3].children[0].classList.contains('general-toggle_unactive')) {
            today.classList.add('date_hidden');
            localStorage.setItem('date', 'hidden');
         } else if (settingsProperty.children[3].children[0].classList.contains('general-toggle_active')) {
            today.classList.remove('date_hidden');
            localStorage.removeItem('date');
         }

         if (settingsProperty.children[4].children[0].classList.contains('general-toggle_unactive')) {
            greetingContainer.classList.add('greeting_hidden');
            localStorage.setItem('greeting', 'hidden');
         } else if (settingsProperty.children[4].children[0].classList.contains('general-toggle_active')) {
            greetingContainer.classList.remove('greeting_hidden');
            localStorage.removeItem('greeting');
         }

         if (settingsProperty.children[5].children[0].classList.contains('general-toggle_unactive')) {
            quoteContainer.classList.add('quote_hidden');
            changeQuote.classList.add('quote_hidden');
            localStorage.setItem('quote', 'hidden');
         } else if (settingsProperty.children[5].children[0].classList.contains('general-toggle_active')) {
            quoteContainer.classList.remove('quote_hidden');
            changeQuote.classList.remove('quote_hidden');
            localStorage.removeItem('quote');
         }

         if (settingsProperty.children[6].children[0].classList.contains('general-toggle_unactive')) {
            todo.classList.add('todo_hidden');
            localStorage.setItem('todo', 'hidden');
            checkIfTodoIsHidden();
         } else if (settingsProperty.children[6].children[0].classList.contains('general-toggle_active')) {
            todo.classList.remove('todo_hidden');
            localStorage.removeItem('todo');
            checkIfTodoIsHidden();
         }
      })
   })
}

let langInput = '';
const getLanguageSettings = (choosedSetting) => {
   cleanSettingsProperty();
   settingsNames[choosedSetting].forEach(el => {

      div = document.createElement('div');
      div.classList.add('lang-el');
      if (el.substring(0, 2).toLowerCase() === 'ан' || el.substring(0, 2).toLowerCase() === 'en') {
         div.classList.add('en');
      } else {
         div.classList.add('ru');
      }
      div.textContent = el;
      settingsProperty.append(div);
      input = document.createElement('input');
      input.type = 'checkbox';
      input.classList.add('lang-input')
      div.append(input);
   })

   langInput = document.querySelectorAll('.lang-input')
   localStorage.getItem('language');

   langInput.forEach(el => {
      if (lang === el.parentElement.classList[1]) {
         el.checked = true;
      } else if (lang === '') {
         langInput[0].checked = true;
      }

      el.addEventListener('click', (event) => {
         langInput.forEach(el => {
            el.checked = false
         })
         event.target.checked = true;
         localStorage.setItem('language', event.target.parentElement.classList[1]);

         getQuotes();
         cleanSettingsList();
         getListOfSettigsNames();
         settingsList.children[1].classList.add('settings-item_active');
         choosedSetting = settingsList.children[1].innerText;
         getLanguageSettings(choosedSetting);
         getWeather();
         showTodoSection();
         showModalTodo();
         getTodoListNames();

      })
   })
}

const cleanSettingsProperty = () => {
   while (settingsProperty.firstChild) {
      settingsProperty.removeChild(settingsProperty.firstChild);
   }
}
const cleanSettingsList = () => {
   while (settingsList.firstChild) {
      settingsList.removeChild(settingsList.firstChild);
   }
}


// background settings

let sourceInput = '';

let imgTagsRu = ['Природа', 'Семья', 'Город', 'IT', 'Животные', 'Растения', 'Еда'];
let imgTagsEn = ['Nature', 'Family', 'City', 'IT', 'Animals', 'Plants', 'Food'];


const getBackgroundSettings = (choosedSetting) => {
   cleanSettingsProperty();
   settingsNames[choosedSetting].forEach(el => {

      div = document.createElement('div');
      div.classList.add('source-element');
      div.textContent = el;
      settingsProperty.append(div);
      input = document.createElement('input');
      input.type = 'checkbox';
      input.classList.add('source-input')
      div.append(input);
   })

   sourceInput = document.querySelectorAll('.source-input')

   localStorage.getItem('source');
   let source = localStorage.getItem('source');
   sourceInput.forEach(el => {
      if (source === '' || !source) {
         sourceInput[0].checked = true;
         localStorage.setItem('source', el.parentElement.innerText);
      } else if (source === el.parentElement.innerText) {
         el.checked = true;
      }
      console.log(source)
      if (source === 'GIT') {
         cleanTags();
      } else if (source === 'Unsplash API' || source === 'Flickr API') {
         showTags();
      }

      el.addEventListener('click', (event) => {
         sourceInput.forEach(el => {
            el.checked = false;
         })
         cleanTags();

         event.target.checked = true;
         source = event.target.parentElement.innerText;
         localStorage.setItem('source', event.target.parentElement.innerText);
         settingsList.children[2].classList.add('settings-item_active');
         choosedSetting = settingsList.children[1].innerText;

         if (event.target.checked === true && event.target.parentElement.innerText != 'GIT') {
            showTags();
         }
         setBg();
      })

   })





   function showTags() {
      cleanTags();
      let imgTags = [];
      lang === 'en' ? imgTags = imgTagsEn : imgTags = imgTagsRu;
      imgTags.forEach(el => {

         div = document.createElement('div');
         div.classList.add('tag-element');
         div.textContent = el;
         settingsProperty.append(div);
         input = document.createElement('input');
         input.type = 'checkbox';
         input.classList.add('tag-input')
         div.append(input);
      })
      let tagInput = document.querySelectorAll('.tag-input');
      let savedTag = '';
      if (source != 'GIT') {
         savedTag = localStorage.getItem(`tagsFor${source}`).split(',');

         let result = savedTag.map(item => item[0].toUpperCase() + item.slice(1));
         result.forEach(item => {
            imgTagsEn.forEach((el, i) => {
               if (el === item) {
                  tagInput[i].checked = true;
               }
            })
         })
      }

      settingsProperty.addEventListener('click', (e) => {
         source = localStorage.getItem('source');
         if (e.target.classList.contains('tag-input')) {
            let tagValue = '';
            console.log(source)
            tagInput.forEach(function (item, i, tagInput) {

               if (item.checked === true && tagValue === '') {
                  tagValue = tagValue + `${imgTagsEn[i]}`;
               } else if (item.checked === true && tagValue != '') {
                  tagValue = tagValue + `,${imgTagsEn[i]}`;
               }
            })


            localStorage.setItem(`tagsFor${source}`, tagValue.toLowerCase());
         }
      })
   }

   function cleanTags() {
      let tagItem = document.querySelectorAll('.tag-element');
      tagItem.forEach(item => {
         item.remove()
      })
   }
   function setLocalStorage() {
      localStorage.setItem('name', userName.value);
      localStorage.setItem('city', city.value);
   }
   window.addEventListener('beforeunload', setLocalStorage)
}

// To Do 



listSettingsButton.addEventListener('click', () => {
   settingsButton.classList.toggle('mooving');
   showDefaultSetting();
   settingsModal.classList.toggle('settings-modal_hidden');
   settingsModal.classList.toggle('settings-modal_visible');
})






const hideModalWindow = () => {
   if (settingsModal.classList.contains('settings-modal_visible')) {
      body.addEventListener('click', (e) => {
         if (!e.target.classList.contains('lang-input') && !e.target.classList.contains('settings-modal') && !e.target.classList.contains('settings') && !e.target.offsetParent.classList.contains('settings-modal') && !e.target.classList.contains('list-settings-button')) {
            settingsModal.classList.add('settings-modal_hidden');
            settingsModal.classList.remove('settings-modal_visible');
         }
      })
   }
}
hideModalWindow();