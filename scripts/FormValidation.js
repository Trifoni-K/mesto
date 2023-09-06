export class FormValidator {
  constructor(formElement, validationConfig) {
    this._formSelector = validationConfig.formSelector
    this._inputSelector = validationConfig.inputSelector
    this._submitButtonSelector = validationConfig.submitButtonSelector
    this._inactiveButtonClass = validationConfig.inactiveButtonClass
    this._inputErrorClass = validationConfig.inputErrorClass
    this._errorClass = validationConfig.errorClass
    this._formElement = formElement
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector))
    this._submitButtonElement = this._formElement.querySelector(this._submitButtonSelector)
  };

  enableSubmitButton() {

    this._submitButtonElement.disabled = false;
    this._submitButtonElement.classList.remove(this._inactiveButtonClass);
  };
  
  disableSubmitButton() {

    this._submitButtonElement.disabled = true;
    this._submitButtonElement.classList.add(this._inactiveButtonClass);
  };

  _toggleButtonState() {
    if(this._formElement.checkValidity()) {
      this.enableSubmitButton();
    } else {
      this.disableSubmitButton();
    };
  };

  _hideError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = ' ';
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
  };
  
  _showError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };

  _checkValidateInput(inputElement) {
    if (!inputElement.validity.valid) {
      this._showError(inputElement);
    } else {
      this._hideError(inputElement);
    };
  };

  hideInputError() {
    // const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  
    this._inputList.forEach((inputElement) => {
      this._hideError(inputElement);
    });
  };

  _setEventListeners() {
    // const inputList = Array.from(document.querySelectorAll(validationConfig.inputSelector));
    // const submitButtonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  
    this._toggleButtonState();
  
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._toggleButtonState();
        this._checkValidateInput(inputElement);
      });
    });
  };
  
  enableValidation() {
    // const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    
    this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault()
    });
    this._setEventListeners();
  };
};