console.log(`
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

Спасибо за потраченное на мою работу время!!!!`);




//Меню бургер

const burger = document.querySelector('.burger');
const headerNavigation = document.querySelector('.header__navigation');
const sections = document.querySelectorAll('.section');

if (burger) {
   burger.addEventListener("click", function (e) {
      document.body.classList.toggle('_lock');
      burger.classList.toggle('_active');
      headerNavigation.classList.toggle('_active');
      console.log('33');

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
   }
   )
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

