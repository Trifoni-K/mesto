// Обьявление переменных popup edit
const popuplists = document.querySelectorAll('.popup');
const popuplist = Array.from(popuplists);
const profileForm = document.querySelector('.popup_type_edit');
const cardForm = document.querySelector('.popup_type_insert');
const imageForm = document.querySelector('.popup_type_pic');
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
const templateItem = document.querySelector('.element-template').content;
const cadrsElements = document.querySelector('.elements');
const elementCard = document.querySelector('.element');
const cardName = document.querySelector('.element__title');
const nameCardInput = document.querySelector('.popup__input_card_name');
const linkCardInput = document.querySelector('.popup__input_card_link');
const picCard = document.querySelector('.popup__pic');
const picLink = document.querySelector('.popup__image');
const picName = document.querySelector('.popup__about');
const popupInput = document.querySelector('.popup__input');

// Функции открытия и закрытия попап
const openPopup = (popuplist) => {
  popuplist.classList.add('popup_opened');
};
openPopupButton.addEventListener('click', () => {
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
  openPopup(profileForm);
});

const closePopup = (popuplist) => {
  popuplist.classList.remove('popup_opened');
};
closeButtonlists.forEach((item) => {
  item.addEventListener('click', () => {
    popuplists.forEach(closePopup);
  });
});

// Профиль
const handleFormSubmitEdit = (evt) =>{
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup(profileForm);
};
profileForm.addEventListener('submit', handleFormSubmitEdit);

// Карточки
openPopupCards.addEventListener('click', () => {
  openPopup(cardForm);
});

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
const toggleLike = (evt) => {
  evt.target.classList.toggle('element__button_active');
};
const showItem = (evt) => {
  openPopup(imageForm);
  const cardLink = evt.target.closest('.element__image');
  picLink.src = cardLink.src;
  picLink.alt = cardLink.alt;
  picName.textContent = evt.target.closest('.element').textContent;
};

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