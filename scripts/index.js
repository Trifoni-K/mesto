// Обьявление переменных
let popup = document.querySelector('.popup');
let openPopupButton = document.querySelector('.profile__edit');
let closePopupButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_profile_name');
let jobInput = document.querySelector('.popup__input_profile_job');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

// Открытие и закрытие попап(редактирование ФИО)
function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileAbout.textContent;
}
openPopupButton.addEventListener('click', openPopup);

function closePopup() {
  popup.classList.remove('popup_opened');
}
closePopupButton.addEventListener('click', closePopup);

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = jobInput.value;
  closePopup();
}
formElement.addEventListener('submit', handleFormSubmit);