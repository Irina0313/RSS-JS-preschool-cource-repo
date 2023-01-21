/*console.log(`
Привет, надеюсь проверка моей работы не отнимет много времени.))\n
Рассчитываю на максимальный балл, все требования выполнены.\n
Всегда благодарна за дельные замечания и советы. Готова ответить на любые вопросы по работе.\n
В проекте используется SCSS и normalize (разрешены в требованиях).\n
Самопроверка:\n
1. 10 - проверено на валидаторе, ошибок и предупреждений нет.\n
2. 20 - выполнены все условия по наличию и количеству элементов. \n
3. 48 - верстка соответствует макету, проверена через PixelPerfect. Отклонений больше 10px нет. \n
4. 12 - требования по css выполнены: \n
- при верствке использовались флексы.\n
- фавикон есть, картинки и иконки добавлены в требуемых форматах.\n
- центрирование контента и фон выполнены. \n
5. 20 - интерактивность, реализуемая через css выполнена:\n
- плавная прокрутка по якорям реализована (от разделов меню к заголовкам на странице).
- ссылки в футере в соответствии с заданием.
- интерактивность реализована либо по макету, либо добавлено самостоятельно, плавность реализована через transition, интерактивность не влияет на соседние элементы. \n
- интерактивность окон секций Price и Contact us не реализовывалась, т.к. это задание следующих частей. Повороты стрелок и смена цвета сделаны для примера.\n

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

