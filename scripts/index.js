let popup = document.querySelector('.popup');
let openPopupButton = document.querySelector('.profile__edit');
let closePopupButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('.popup__input_profile_name');
let jobInput = document.querySelector('.popup__input_profile_job');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let closePopup = (popupToClose) => popupToClose.classList.toggle('popup_opened');

openPopupButton.addEventListener('click', () => {
  closePopup(popup)
  nameInput.value = profileName.textContent,
  jobInput.value = profileAbout.textContent
});

closePopupButton.addEventListener('click', () => closePopup(popup));

function handleFormSubmit (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value,
  profileAbout.textContent = jobInput.value;
  closePopup(popup);
}

formElement.addEventListener('submit', handleFormSubmit);