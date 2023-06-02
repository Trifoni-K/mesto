// Обьявление переменных popup edit
const popups = document.querySelectorAll('.popup');
const popup = Array.from(popups);
const openPopupButton = document.querySelector('.profile__edit');
const closePopupButtons = document.querySelectorAll('.popup__close');
const closePopupButton = Array.from(closePopupButtons);
const closePopupEdit = document.querySelector('.popup__close_edit');
const formPopup = document.querySelectorAll('.popup__form');
const nameInput = document.querySelector('.popup__input_profile_name');
const jobInput = document.querySelector('.popup__input_profile_job');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const popupEdit = document.querySelector('.popup_type_edit');
const submitPopup = document.querySelector('.popup__button');
const submitEdit = document.querySelector('.popup__button_type_edit');
const popupInsert = document.querySelector('.popup_type_insert');
const openPopupCards = document.querySelector('.profile__button');
const closePopupInsert = document.querySelector('.popup__close_insert');
const submitInsert = document.querySelector('.popup__button_type_insert');
const popupPic = document.querySelector('.popup_type_pic');
const cadrsElements = document.querySelector('.elements');
const templateItem = document.querySelector('.element-template').content;
const nameCardInput = document.querySelector('.popup__input_card_name');
const linkCardInput = document.querySelector('.popup__input_card_link');
const cardName = document.querySelector('.element__title');
const cardLink = document.querySelector('.element__image');
const picCard = document.querySelector('.popup-pic__container');
const picLink = document.querySelector('.popup-pic__image');
const picName = document.querySelector('.popup-pic__title');
const elementCard = document.querySelector('.element');
const popupInput = document.querySelector('.popup__input');

// Функции открытия и закрытия попап
const openPopup = (popup) => {
  popup.classList.add('popup_opened');
};

openPopupButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  openPopup(popupEdit);
});

const closePopup = (popup) => {
  popup.classList.remove('popup_opened');
};

closePopupButtons.forEach((item) => {
  item.addEventListener('click', () => {
    popups.forEach((item) => {
      closePopup(item);
    })
  })  
});

const handleFormSubmitEdit = (evt) =>{
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(popupEdit);
};
popupEdit.addEventListener('submit', handleFormSubmitEdit);

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

const deleteItem = (evt) => {
  const item = evt.target.closest('.element');
  item.remove();
};
const likeItem = (evt) => {
  const item = evt.target.classList.toggle('element__button_active');
};
const showItem = (evt) => {
  openPopup(popupPic);
  picLink.src = evt.target.closest('.element__image').src;
  picName.textContent = evt.target.closest('.element').textContent;
  picLink.alt = evt.target.closest('.element__image').alt;
};

const renderCard = (link, name) => {
  const itemElement = templateItem.cloneNode(true);
  itemElement.querySelector('.element__image').src = link;
  itemElement.querySelector('.element__image').alt = name;
  itemElement.querySelector('.element__title').textContent = name;
  itemElement.querySelector('.element__delete').addEventListener('click', deleteItem);
  itemElement.querySelector('.element__button').addEventListener('click', likeItem);
  itemElement.querySelector('.element__image').addEventListener('click', showItem);
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
  linkCardInput.value = '';
  nameCardInput.value = '';
  closePopup(popupInsert);
};
popupInsert.addEventListener('submit', handleFormSubmitInsert);