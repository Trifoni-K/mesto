let popup = document.querySelector('.popup');
let openPopupButton = document.querySelector('.profile__edit');
let closePopupButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_profile_name');
let jobInput = document.querySelector('.popup__input_profile_job');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let savePopupButton = document.querySelector('.popup__button');

openPopupButton.addEventListener('click', () => {
  popup.classList.add('popup__opened'),
  nameInput.value = profileName.textContent,
  jobInput.value = profileAbout.textContent});

closePopupButton.addEventListener('click', () => 
  popup.classList.remove('popup__opened'));

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value,
  profileAbout.textContent = jobInput.value;
}

savePopupButton.addEventListener('click', () =>
  popup.classList.remove('popup__opened'));

formElement.addEventListener('submit', handleFormSubmit);
