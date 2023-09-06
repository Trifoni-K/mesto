export class Card {
  constructor(data, templateSelector, handleOpenPicPopup) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector
    this._handleOpenPicPopup = handleOpenPicPopup
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
    this._element.querySelector('.element__image').src = this._link;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__title').textContent = this._name;
    this._element.querySelector('.element__image').addEventListener('click', () => {this._handleOpenPicPopup(this._name, this._link)})
    this._element.querySelector('.element__like').addEventListener('click', () => {this._like()});
    this._element.querySelector('.element__delete').addEventListener('click', () => {this._delete()});
    return this._element
  }
 
  _handleOpenPicPopup() {
    openPopup(imageForm)
    picLink.src = this._link;
    picLink.alt = this._name;
    picName.textContent = this._name;
  }
  
  _like() {
    this._element.querySelector('.element__like').classList.toggle('element__like_active');
  }
  
  _delete() {
    this._element.remove();
    this._element = null;
  }
}