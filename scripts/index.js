// Обьявление переменных
const popuplists = document.querySelectorAll('.popup');
const popuplist = Array.from(popuplists);
const profileForm = document.querySelector('.popup_type_edit');
const closeButtonlists = document.querySelectorAll('.popup__close');
const closeButtonlist = Array.from(closeButtonlists);
const closePopupEdit = document.querySelector('.popup__close_edit');
const closePopupInsert = document.querySelector('.popup__close_insert');
const openPopupButton = document.querySelector('.profile__edit');
const nameInput = document.querySelector('.popup__input_profile_name');
const jobInput = document.querySelector('.popup__input_profile_job');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const openPopupCards = document.querySelector('.profile__button');
const cardName = document.querySelector('.element__title');
const nameCardInput = document.querySelector('.popup__input_card_name');
const linkCardInput = document.querySelector('.popup__input_card_link');
const popupInput = document.querySelector('.popup__input');
const picCard = document.querySelector('.popup__pic');
const picLink = document.querySelector('.popup__image');
const picName = document.querySelector('.popup__about');
const templateItem = document.querySelector('.element-template').content;
const cadrsElements = document.querySelector('.elements');
const elementCard = document.querySelector('.element');
const cardForm = document.querySelector('.popup_type_insert');
const imageForm = document.querySelector('.popup_type_pic');

// Функции открытия и закрытия попап
//Открытие
const openPopup = (popuplist) => {
  popuplist.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
  document.addEventListener('click', closePopupOverlay);
};

openPopupButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  openPopup(profileForm);
});

//Закрытие
const closePopup = (popuplist) => {
  popuplist.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
  document.removeEventListener('click', closePopupOverlay);
};

closeButtonlists.forEach((item) => {
  item.addEventListener('click', () => {
    popuplists.forEach(closePopup);
  });
});

const closePopupEsc = (evt) => {
  if (evt.key === 'Escape') {
    popuplists.forEach((el) => {
      el.addEventListener('click', closePopup(el));
    });
  };
};

const closePopupOverlay = () => {
  popuplists.forEach((el) => {
    el.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        closePopup(el);
      };
    }) 
  });
};

// Профиль(отправка формы)
const handleFormSubmitEdit = (evt) =>{
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(profileForm);
};
profileForm.addEventListener('submit', handleFormSubmitEdit);

// Карточки(открытие попап)
openPopupCards.addEventListener('click', () => {
  openPopup(cardForm);
});

//Удаление
const deleteItem = (evt) => {
  const item = evt.target.closest('.element');
  item.remove();
};

// Лайк
const toggleLike = (evt) => {
  evt.target.classList.toggle('element__button_active');
};

// Показ картинки
const showItem = (evt) => {
  openPopup(imageForm);
  const cardLink = evt.target.closest('.element__image');
  picLink.src = cardLink.src;
  picLink.alt = cardLink.alt;
  picName.textContent = evt.target.closest('.element').textContent;
};

// Создание карточек и отправка их формы
const renderCard = (link, name) => {
  const itemElement = templateItem.cloneNode(true);
  const cardLink = itemElement.querySelector('.element__image');
  cardLink.src = link;
  cardLink.alt = name;
  itemElement.querySelector('.element__title').textContent = name;
  itemElement.querySelector('.element__delete').addEventListener('click', deleteItem);
  itemElement.querySelector('.element__button').addEventListener('click', toggleLike);
  cardLink.addEventListener('click', showItem);
  return itemElement;
};
  
const addCard = (item) => {
  cadrsElements.prepend(item);
};
 
initialCards.map((item) => renderCard(item.link, item.name)).forEach(addCard);

const handleFormSubmitInsert = (evt) => {
  evt.preventDefault();
  const newCard = renderCard(linkCardInput.value, nameCardInput.value);
  addCard(newCard);
  evt.target.reset();
  closePopup(cardForm);
};

cardForm.addEventListener('submit', handleFormSubmitInsert);