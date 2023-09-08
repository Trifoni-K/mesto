export class Card {
  constructor(data, templateSelector, handleOpenPicPopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleOpenPicPopup = handleOpenPicPopup;
  }
 
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector('.element')
      .cloneNode(true); 
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._imageCard.src = this._link;
    this._imageCard.alt = this._name;
    this._titleCard.textContent = this._name;
    return this._element
  }
  
  _like() {
    this._LikeCard.classList.toggle('element__like_active');
  }
  
  _delete() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._imageCard = this._element.querySelector('.element__image');
    this._titleCard = this._element.querySelector('.element__title');
    this._LikeCard = this._element.querySelector('.element__like');

    this._imageCard.addEventListener('click', () => {this._handleOpenPicPopup(this._name, this._link)});
    this._LikeCard.addEventListener('click', () => {this._like()});
    this._element.querySelector('.element__delete').addEventListener('click', () => {this._delete()});
  }
}