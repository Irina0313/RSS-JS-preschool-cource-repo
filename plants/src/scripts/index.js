/*console.log(`
Привет, надеюсь проверка моей работы не отнимет много времени.))\n
Рассчитываю на максимальный балл, все требования выполнены.\n
Всегда благодарна за дельные замечания и советы. Готова ответить на любые вопросы по работе.\n
В проекте используется SCSS и normalize (разрешены в требованиях).\n
Самопроверка:\n
Ваша оценка - 85 баллов \n
Отзыв по пунктам ТЗ:\n
Выполненные пункты:\n
Вёрстка соответствует макету. Ширина экрана 768px - 24 балла\n
1) Блок header \n
2) Секция welcome \n
3) Секция about \n
4) Секция service \n
5) Секция prices \n
6) Секция contacts \n
7) Блок footer \n
Вёрстка соответствует макету. Ширина экрана 380px - 24 балла \n
8) Блок header \n
9) Секция welcome \n
10) Секция about \n
11) Секция service \n
12) Секция prices \n
13) Секция contacts \n
14) Блок footer \n
\n
15) нет полосы прокрутки при ширине страницы от 1440рх до 380px \n
16) нет полосы прокрутки при ширине страницы от 380px до 320рх \n
17) при ширине страницы 380рх панель навигации скрывается, появляется бургер-иконка \n
18) при нажатии на бургер-иконку плавно появляется адаптивное меню \n
19) адаптивное меню соответствует цветовой схеме макета \n
20) при нажатии на крестик адаптивное меню плавно скрывается уезжая за экран \n
21) ссылки в адаптивном меню работают, обеспечивая плавную прокрутку по якорям (все, кроме Account, она пока просто закрывает меню) \n
22) при клике по ссылке в адаптивном меню адаптивное меню плавно скрывается, также скрытие меню происходит если сделать клик вне данного окна \n

Спасибо за потраченное на мою работу время!!!!`);*/




//Меню бургер

const burger = document.querySelector('.burger');
const headerNavigation = document.querySelector('.header__navigation');
const sections = document.querySelectorAll('.section');

if (burger) {
   burger.addEventListener("click", function (e) {
      document.body.classList.toggle('_lock');
      burger.classList.toggle('_active');
      headerNavigation.classList.toggle('_active');

      if (burger.classList.contains('_active')) {
         if (sections.length > 0) {
            sections.forEach(space => {
               space.addEventListener("click", function (e) {
                  document.body.classList.remove('_lock');
                  burger.classList.remove('_active');
                  headerNavigation.classList.remove('_active');

               });
            }
            )
         }
      }
   })
}
//Прокрутка при клике
const navigationLinks = document.querySelectorAll('.navigation__link>*[data-goto]');
if (navigationLinks.length > 0) {
   navigationLinks.forEach(navigationLink => {
      navigationLink.addEventListener("click", onNavigationLinkClick);
   });

   function onNavigationLinkClick(e) {
      const navigationLink = e.target;
      if (navigationLink.dataset.goto && document.querySelector(navigationLink.dataset.goto)) {
         const gotoSection = document.querySelector(navigationLink.dataset.goto);
         const gotoSectionValue = gotoSection.getBoundingClientRect().top + scrollY;

         if (burger.classList.contains('_active')) {
            document.body.classList.remove('_lock');
            burger.classList.remove('_active');
            headerNavigation.classList.remove('_active');
         }

         window.scrollTo({
            top: gotoSectionValue,
            behavior: "smooth"
         });
         e.preventDefault();
      }
   }
}

window.onload = function () {

   //Блюр
   addButtonsClickHandler();
}

//hover секция Service

const button = document.querySelectorAll('.service-button');
button.forEach(btn => {
   btn.addEventListener('mouseover', () => {
      btn.classList.add('focused');
   })
   btn.addEventListener('mouseout', () => {
      btn.classList.remove('focused');
   })
   btn.addEventListener('click', () => {
      btn.classList.remove('focused');

   })
})

const addButtonsClickHandler = () => {

   document.querySelector('.service__buttons').addEventListener('click', (e) => {

      if (e.target.classList.contains('service-button')) {
         let clickedButton = e.target;

         selectClickedButton(clickedButton);
         filterServiceItems(clickedButton);
      }
   })
}

const selectClickedButton = (clickedButton) => {
   clickedButton.classList.toggle('_clicked');
   clickedButton.classList.toggle('button_unactive');
   checkClickedButtons();
}

const checkClickedButtons = () => {
   let buttons = document.querySelectorAll('._clicked');
   if (buttons.length > 1) {
      blockUnclickedButton();
   } else {
      unblockButton();
   }
}

const blockUnclickedButton = () => {
   let btn = document.querySelectorAll('.service-button');
   btn.forEach(btn => {
      if (btn.classList.contains('button_unactive'
      )) {
         btn.setAttribute('disabled', '');
         btn.classList.add('_blocked');
      }
   })
}
const unblockButton = () => {
   let btn = document.querySelectorAll('.service-button');
   btn.forEach(btn => {
      if (btn.classList.contains('button_unactive'
      )) {
         btn.removeAttribute('disabled', '');
         btn.classList.remove('_blocked')
      }
   })
}

const filterServiceItems = (clickedButton) => {
   let serveceItems = document.querySelectorAll('.service-item');

   serveceItems.forEach(item => {
      if (clickedButton.classList.contains('_clicked')) {
         if (item.classList.contains(clickedButton.innerText)) {
            item.classList.remove('_blur')
            item.classList.add('_active')
         } else if ((!item.classList.contains(clickedButton.innerText)) && (!item.classList.contains('_active'))) {
            item.classList.add('_blur')
         }
      } else if (clickedButton.classList.contains('button_unactive')) {
         if (item.classList.contains(clickedButton.innerText)) {
            item.classList.remove('_active')
            item.classList.add('_blur')
         }
      }
      checkUnclickedButtons();
   })

}
const checkUnclickedButtons = () => {
   let btn = document.querySelectorAll('.service-button');
   let result = 0;
   btn.forEach(btn => {

      if (btn.classList.contains('_clicked')) {
         result = result + 1;
      } else {
         result = result + 0;
      }
   })
   console.log(result)
   if (result === 0) {
      removeBlure();
   }
}
const removeBlure = () => {
   let serveceItems = document.querySelectorAll('.service-item');
   serveceItems.forEach(item => {
      item.classList.remove('_blur')
   })
}







