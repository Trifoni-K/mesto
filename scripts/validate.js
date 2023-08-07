const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

function hideError (inputElement, errorElement, validationConfig) {
  errorElement.classList.remove(validationConfig.errorClass);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
};

function showError (inputElement, errorElement, validationConfig) {
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(validationConfig.errorClass);
  inputElement.classList.add(validationConfig.inputErrorClass);
};

function chekValidateInput(inputElement, formElement, validationConfig) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);

  if (!inputElement.validity.valid) {
    showError(inputElement, errorElement, inputElement.validationMessage, validationConfig);
  } else {
    hideError(inputElement, errorElement, validationConfig);
  };
};

function disabledButton(buttonElement, validationConfig) {
  buttonElement.disabled = "disabled";
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
};
function enableButtonn(buttonElement, validationConfig) {
  buttonElement.disabled = false;
  buttonElement.classList.remove(validationConfig.inactiveButtonClass);
};

function toggleButtonState(buttonElement, isActive, validationConfig) {
  if(!isActive) {
    disabledButton(buttonElement, validationConfig);
  } else {
    enableButtonn(buttonElement, validationConfig);
  };
};

function setEventListeners(formElement, validationConfig) {
  const inputLists = formElement.querySelectorAll(validationConfig.inputSelector);
  const inputList = Array.from(inputLists);
  const submitButtonElement = formElement.querySelector(validationConfig.submitButtonSelector);

  toggleButtonState(submitButtonElement, formElement.checkValidity(), validationConfig);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      toggleButtonState(submitButtonElement, formElement.checkValidity(), validationConfig);
      chekValidateInput(inputElement, formElement, validationConfig);
    });
  });

  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (!formElement.checkValidity())return;
  });
};

function enableValidation(validationConfig) {
  const formLists = document.querySelectorAll(validationConfig.formSelector);
  const formList = Array.from(formLists);

  formList.forEach(function (formElement) {
    setEventListeners(formElement, validationConfig);
  });
};

enableValidation(validationConfig)