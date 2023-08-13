// Обьявление переменных
const popupList = document.querySelectorAll('.popup');
const profileForm = document.querySelector('.popup_type_edit');
const cardForm = document.querySelector('.popup_type_insert');
const imageForm = document.querySelector('.popup_type_pic');
const closeButtonPopupList = document.querySelectorAll('.popup__close');
const openButtonEditProfile = document.querySelector('.profile__edit');
const nameInput = document.querySelector('.popup__input_profile_name');
const jobInput = document.querySelector('.popup__input_profile_job');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const openCardsPopupButton = document.querySelector('.profile__button');
const nameCardInput = document.querySelector('.popup__input_card_name');
const linkCardInput = document.querySelector('.popup__input_card_link');
const picLink = document.querySelector('.popup__image');
const picName = document.querySelector('.popup__about');
const templateItem = document.querySelector('.element-template').content;
const cardsContainer = document.querySelector('.elements');

// Функции открытия и закрытия попап
//Открытие
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupEsc);
};

openButtonEditProfile.addEventListener('click', () => {
  openPopup(profileForm);
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  enableSubmitButton(profileForm, validationConfig);
  hideInputError(profileForm, validationConfig);
});

//Закрытие
const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupEsc);
};

closeButtonPopupList.forEach((item) => {
  item.addEventListener('click', () => {
    const popup = item.closest('.popup_opened');
    closePopup(popup);
  });
});

const closePopupEsc = (evt) => {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  };
};

// Профиль(отправка формы)
const handleFormSubmitEdit = (evt) =>{
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(profileForm);
};

// Карточки(открытие попап)
openCardsPopupButton.addEventListener('click', () => {
  linkCardInput.value = '';
  nameCardInput.value = '';
  openPopup(cardForm);
  disableSubmitButton(cardForm, validationConfig)
  hideInputError(cardForm, validationConfig);
});

//Удаление
const deleteCard = (evt) => {
  const item = evt.target.closest('.element');
  item.remove();
};

// Лайк
const handleLikeClick = (evt) => {
  evt.target.classList.toggle('element__button_active');
};

// Показ картинки
const handleOpenImagePopup = (evt) => {
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
  itemElement.querySelector('.element__delete').addEventListener('click', deleteCard);
  itemElement.querySelector('.element__button').addEventListener('click', handleLikeClick);
  cardLink.addEventListener('click', handleOpenImagePopup);
  return itemElement;
};

const addCard = (item) => {
  cardsContainer.prepend(item);
};

initialCards.map((item) => renderCard(item.link, item.name)).forEach(addCard);

const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();

  const newCard = renderCard(linkCardInput.value, nameCardInput.value);
  addCard(newCard);
  closePopup(cardForm);
};

// Закрытие по оверлей
popupList.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    };
  });
});

//Валидация форм(редактирования профиля создания карточки)
enableValidation(validationConfig);
//Отправка формы(редактировать профиль)
profileForm.addEventListener('submit', handleFormSubmitEdit);
//Отправка формы(создание карточки)
cardForm.addEventListener('submit', handleAddCardFormSubmit);
