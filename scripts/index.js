// Обьявление переменных popup edit
const popups = document.querySelectorAll('.popup');
const popup = Array.from(popups);
const openPopupButton = document.querySelector('.profile__edit');
const closePopupButtons = document.querySelectorAll('.popup__close');
const closePopupButton = Array.from(closePopupButtons);
const closePopupEdit = document.querySelector('.popup__close_edit');
const formElement = document.querySelector('.popup__form');
const nameInput = document.querySelector('.popup__input_profile_name');
const jobInput = document.querySelector('.popup__input_profile_job');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const popupEdit = document.querySelector('.popup_type_edit');
// Обьявление переменных popup insert
const popupInsert = document.querySelector('.popup_type_insert');
const openPopupCards = document.querySelector('.profile__button');
const closePopupInsert = document.querySelector('.popup__close_insert');

// Функции открытия и закрытия попап edit
function openPopup(popup) {
  popup.classList.add('popup_opened');
};

openPopupButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  openPopup(popupEdit);
});

function closePopup(popup) {
  popup.classList.remove('popup_opened');
};
closePopupButtons.forEach((item) => {
  item.addEventListener('click', () => {
    popups.forEach((item) => {
      closePopup(item);
    })
  })  
});

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(popupEdit);
};
formElement.addEventListener('submit', handleFormSubmit);

// Функция открытия и закрытия попап isert
openPopupCards.addEventListener('click', () => {
  openPopup(popupInsert);
});

// Карточки
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const cadrsElements = document.querySelector('.elements');
const templateItem = document.querySelector('.element-template').content;
const nameCardInput = document.querySelector('.popup__input_card_name');
const linkCardInput = document.querySelector('.popup__input_card_link');
const cardName = document.querySelector('.element__title');
const cardLink = document.querySelector('.element__image');

function handleFormSubmitCards (evt) {
  evt.preventDefault();
  cardName.textContent = nameCardInput.value;
  cardLink.src = linkCardInput.value;
  renderCard(item);
};
formElement.addEventListener('submit', handleFormSubmitCards);

const deleteItem = (evt) => {
  const item = evt.target.closest('.element');
  item.remove();
};
const likeItem = (evt) => {
  const item = evt.target.classList.toggle('element__button_active');
};
const showItem = () => {};

const renderCard = (item) => {
  const itemElement = templateItem.cloneNode(true);
  itemElement.querySelector('.element__image').src = item.link;
  itemElement.querySelector('.element__image').alt = item.name;
  itemElement.querySelector('.element__title').textContent = item.name;
  itemElement.querySelector('.element__delete').addEventListener('click', deleteItem);
  itemElement.querySelector('.element__button').addEventListener('click', likeItem);
  cadrsElements.append(itemElement);
};

initialCards.forEach((item) => {
  renderCard(item);
});