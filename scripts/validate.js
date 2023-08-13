const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function hideError (inputElement, validationConfig) {
  const errorElement = document.querySelector(`#${inputElement.id}-error`);

  errorElement.textContent = '';
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
};

function showError (inputElement, validationConfig) {
  const errorElement = document.querySelector(`#${inputElement.id}-error`);

  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(validationConfig.errorClass);
};

function checkValidateInput(inputElement, validationConfig) {
  if (!inputElement.validity.valid) {
    showError(inputElement, validationConfig, inputElement.validationMessage);
  } else {
    hideError(inputElement, validationConfig);
  };
};

function enableSubmitButton(formElement, validationConfig) {
  const submitButtonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  submitButtonElement.disabled = false;
  submitButtonElement.classList.remove(validationConfig.inactiveButtonClass);
}

function disableSubmitButton(formElement, validationConfig) {
  const submitButtonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  submitButtonElement.disabled = true;
  submitButtonElement.classList.add(validationConfig.inactiveButtonClass);
}

function toggleButtonState(formElement, validationConfig) {

  if(!formElement.checkValidity()) {
    disableSubmitButton(formElement, validationConfig);
  } else {
    enableSubmitButton(formElement, validationConfig);
  };
};

function hideInputError(formElement, validationConfig) {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));

  inputList.forEach((inputElement) => {
    hideError(inputElement, validationConfig);
  });
};

function setEventListeners(formElement, validationConfig) {
  const inputList = Array.from(document.querySelectorAll(validationConfig.inputSelector));

  toggleButtonState(formElement, validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      toggleButtonState(formElement, validationConfig);
      checkValidateInput(inputElement, formElement, validationConfig);
    });
  });
};

function enableValidation(validationConfig) {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};