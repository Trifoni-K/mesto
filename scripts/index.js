import { initialCards } from "./initialCards.js";
import { Card } from "./Card.js";
import { validationConfig } from "./validate.js";
import { FormValidator } from "./FormValidation.js";
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
const cardsContainer = document.querySelector('.elements');
const popupEditForm = document.querySelector('.popup__form_type_edit');
const popupInsertForm = document.querySelector('.popup__form_type_insert');
const editFormValidator = new FormValidator(popupEditForm, validationConfig);
const insertFormValidator = new FormValidator(popupInsertForm, validationConfig);

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
  editFormValidator.hideInputError();
  editFormValidator.enableSubmitButton();
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
const handleFormSubmitEdit = (evt) => {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(profileForm);
};

// Карточки
// открытие попап создания
openCardsPopupButton.addEventListener('click', () => {
  openPopup(cardForm);
  nameCardInput.value = '';
  linkCardInput.value = '';
  
  insertFormValidator.hideInputError();
  insertFormValidator.disableSubmitButton();
});
// показ и создание кароточек
const handleOpenPicPopup = (name, link) => {
  openPopup(imageForm);
  picLink.src = link;
  picLink.alt = name;
  picName.textContent = name;
};

initialCards.forEach((item) => {
  const card = new Card(item, '.element-template', handleOpenPicPopup)
  const cardElement = card.generateCard();
  cardsContainer.append(cardElement);
})

const handleAddCardFormSubmit = (evt) => {
  evt.preventDefault();
  const newCard = new Card({ name: nameCardInput.value, link: linkCardInput.value }, '.element-template');
  const cardElement = newCard.generateCard();
  cardsContainer.prepend(cardElement);
  closePopup(cardForm);
}

// Закрытие по оверлей
popupList.forEach(popup => {
  popup.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    };
  });
});

//Валидация форм(редактирования профиля создания карточки)
editFormValidator.enableValidation()
insertFormValidator.enableValidation()
//Отправка формы(редактировать профиль)
profileForm.addEventListener('submit', handleFormSubmitEdit);
//Отправка формы(создание карточки)
cardForm.addEventListener('submit', handleAddCardFormSubmit);