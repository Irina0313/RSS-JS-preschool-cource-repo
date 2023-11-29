console.log(`
Привет, надеюсь проверка моей работы не отнимет много времени.))\n
Рассчитываю на максимальный балл, все требования выполнены.\n
Всегда благодарна за дельные замечания и советы. Готова ответить на любые вопросы по работе.\n
В проекте используется SCSS и normalize (разрешены в требованиях).\n
Самопроверка:\n
1. При нажатии на кнопки:Gardens,Lawn,Planting происходит смена фокуса на услугах в разделе service +50\n
-- При выборе одной услуги (нажатии одной кнопки), остальные карточки услуг принимают эффект blur, выбранная услуга остается неизменной + 20\n
--Пользователь может нажать одновременно две кнопки услуги, тогда эта кнопка тоже принимает стиль активной и карточки с именем услуги выходят из эффекта blur. При этом пользователь не может нажать одновременно все три кнопки услуг. При повторном нажатии на активную кнопку она деактивируется (становится неактивной) а привязанные к ней позиции возвращаются в исходное состояние (входит в состяние blur если есть еще активная кнопка или же перестають быть в блюре если это была единственная нажатая кнопка). +20\n
-- Анимации плавного перемещения кнопок в активное состояние и карточек услуг в эффект blur +10\n
2. Accordion в секции prices реализация 3-х выпадающих списков об услугах и ценах + 50\n
-- При нажатии на dropdown кнопку появляется описание тарифов цен в соответствии с макетом. Внутри реализована кнопка order, которая ведет на секцию contacts, при нажатии на нее Accordion все еще остается открытым. +25\n
-- Пользователь может самостоятельно закрыть содержимое нажав на кнопку dropup, но не может одновременно открыть все тарифы услуг, при открытии нового тарифа предыдущее автоматически закрывается. +25\n
3. В разделе contacts реализован select с выбором городов +25\n
-- В зависимости от выбора пользователя появляется блок с адресом и телефоном офиса в определенном городе +15\n
-- При нажатии на кнопку Call us реализован вызов по номеру, который соответствует выбранному городу +10\n

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
//Plants Part2


window.onload = function () {

   //Services
   addButtonsClickHandler();

   //Prices
   addPricesAccordionClickHandler();

   //Contact us
   addContactClickHandler();
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
//button Contact us
const buttonContactUs = document.querySelector('.prices__contact-us .button');

buttonContactUs.addEventListener('click', (e) => {
   const gotoSection = document.querySelector(buttonContactUs.dataset.goto);
   const gotoSectionValue = gotoSection.getBoundingClientRect().top + scrollY;

   window.scrollTo({
      top: gotoSectionValue,
      behavior: "smooth"
   })

});

//Prices accordion

const addPricesAccordionClickHandler = () => {
   const pricesAccodionButton = document.querySelectorAll('.praces__item .accordion_button');
   pricesAccodionButton.forEach(pricesButton => {
      pricesButton.addEventListener('click', (e) => {

         closeOpenedModalWindows(pricesButton);

         pricesButton.classList.toggle('_accordion_button_opened')
         pricesButton.childNodes[1].classList.toggle('arrow_active');

         showModalWindow(pricesButton);

         if (!pricesButton.classList.contains('_accordion_button_opened')) {
            hiddenModalWindow(pricesButton);
         }
      })
   })
   buttonOrderClicked();
}

const showModalWindow = (pricesButton) => {
   pricesButton.parentNode.classList.add('praces__item_opened');
   pricesButton.nextElementSibling.classList.add('praces-opened');
}

const hiddenModalWindow = (pricesButton) => {
   pricesButton.parentNode.classList.remove('praces__item_opened');
   pricesButton.nextElementSibling.classList.remove('praces-opened');
}

const closeOpenedModalWindows = (pricesButton) => {

   const openedModalsAmount = document.querySelectorAll('._accordion_button_opened');

   if (openedModalsAmount.length > 0) {
      openedModalsAmount.forEach(modal => {
         if (modal != pricesButton) {
            modal.classList.remove('_accordion_button_opened')
            modal.childNodes[1].classList.remove('arrow_active');
            if (!modal.classList.contains('_accordion_button_opened')) {
               hiddenModalWindow(modal);
            }
         }
      })
   }
}

// Button Order

const buttonsOrder = document.querySelectorAll('.price__order');
const buttonOrderClicked = (e) => {
   buttonsOrder.forEach(button => {
      // mouse behaviour (hover and click)
      button.addEventListener('mouseover', () => {
         button.classList.add('focused');
      })
      button.addEventListener('mouseout', () => {
         button.classList.remove('focused');
      })
      button.addEventListener('click', () => {
         button.classList.remove('focused');
      })

      button.addEventListener('click', () => {
         //scroll to Contact section
         const gotoSection = document.querySelector(button.dataset.goto);
         const gotoSectionValue = gotoSection.getBoundingClientRect().top + scrollY;
         window.scrollTo({
            top: gotoSectionValue,
            behavior: "smooth"
         });
      })
   })
}

//Contact us

const addContactClickHandler = () => {

   document.querySelector('.contacts__button-heading').addEventListener('click', (e) => {

      if (e.target) {

         transformContactButton();
         changeContactButtonHeading();
         showCityList();
         getClickedCity();
         hideContactModalWindow();

         resetContactButtonHeading();
         const contactHeding = document.querySelector('.contacts__button-heading');
         contactHeding.parentElement.classList.add('contacts__button_unactive_active');

         const contactImg = document.querySelector('.contacts__image');
         contactImg.classList.add('contacts__image_active');
      }
   })

}
const transformContactButton = () => {
   const contactArrow = document.querySelector('.arrow_contacts');
   contactArrow.classList.toggle('arrow_contacts_unactive');
   contactArrow.classList.toggle('arrow_contacts_active');

   const contactButton = document.querySelector('.contacts__accordion_button');
   contactButton.classList.toggle('contacts__accordion_button_unactive');
   contactButton.classList.toggle('contacts__accordion_button_active');
}

const changeContactButtonHeading = () => {
   const contactHeding = document.querySelector('.contacts__button-heading');
   contactHeding.classList.toggle('contacts__button-heading_unactive');
   contactHeding.classList.toggle('contacts__button-heading_active');



   const cityList = document.querySelector('.city-list');
   if (!cityList.classList.contains('city-list_active')) {
      contactHeding.classList.remove('contacts__button-heading_unactive');
      contactHeding.classList.add('contacts__button-heading_active');
   }
}

const showCityList = () => {
   const cityList = document.querySelector('.city-list');
   cityList.classList.toggle('city-list_active');
};

const getClickedCity = () => {
   const clickedCity = document.querySelectorAll('.city');
   clickedCity.forEach(city => {
      city.addEventListener('click', (e) => {
         const choosedCity = e.target.innerText;
         closeCityList(choosedCity);
         showContactModalWindow(choosedCity);
         buttonCallUsClicked();
         transformContactButtonToUnactive();
      })
   })
};
const transformContactButtonToUnactive = () => {
   const contactArrow = document.querySelector('.arrow_contacts');
   contactArrow.classList.add('arrow_contacts_unactive');
   contactArrow.classList.remove('arrow_contacts_active');

   const contactButton = document.querySelector('.contacts__accordion_button');
   contactButton.classList.add('contacts__accordion_button_unactive');
   contactButton.classList.remove('contacts__accordion_button_active');
}

const closeCityList = (choosedCity) => {
   const contactText = document.querySelector('.contacts__text');
   contactText.classList.add('contact__text_changed');
   contactText.innerText = choosedCity;
   hideCityList();
};

const hideCityList = () => {
   const cityList = document.querySelector('.city-list');
   cityList.classList.remove('city-list_active');
};

const modalsCityes = document.querySelectorAll('.contact-modal');
const showContactModalWindow = (choosedCity) => {
   const targetCity = choosedCity;
   modalsCityes.forEach(cityes => {
      if (cityes.innerText.includes(targetCity)) {
         cityes.classList.remove('contact-modal_unactive');
         cityes.classList.add('contact-modal_active');
      }
   })
}

const hideContactModalWindow = (choosedCity) => {
   const contactsHeadingState = document.querySelector('.city-list');
   if (contactsHeadingState.classList.contains('city-list_active')) {
      modalsCityes.forEach(cityes => {
         cityes.classList.remove('contact-modal_active');
         cityes.classList.add('contact-modal_unactive');
      })
   }
}

// Button Call us

const buttonCallUsClicked = () => {
   const buttonCall = document.querySelectorAll('.contact-call-us');
   buttonCall.forEach(buttonCallUs => {
      buttonCallUs.addEventListener('mouseover', () => {
         buttonCallUs.classList.add('focused');
      })
      buttonCallUs.addEventListener('mouseout', () => {
         buttonCallUs.classList.remove('focused');
      })
      buttonCallUs.addEventListener('click', () => {
         buttonCallUs.classList.remove('focused');
      })
   })
}

const resetContactButtonHeading = () => {
   const arrowContacts = document.querySelector('.arrow_contacts');
   const cityList = document.querySelector('.city-list');

   if (arrowContacts.classList.contains('arrow_contacts_unactive') && !cityList.classList.contains('city-list_active')) {
      const contactText = document.querySelector('.contacts__text');
      contactText.classList.remove('contact__text_changed');
      contactText.innerText = 'City';
   }
};