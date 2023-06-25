const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const formSubmitButtonChangeState = (inputList, buttonElement) => {
  // const buttonElement = document.querySelector(validationConfig.submitButtonSelector);
  if (!hasInvalidInput(inputList)) {
    buttonElement.setAttribute('disabled', true);
    buttonElement.classList.add('popup__button_disabled');
  } else {
    buttonElement.removeAttribute('disabled', false);
    buttonElement.classList.remove('popup__button_disabled');
  };
};

const hideError = (input, validationConfig) => {
  const errorElement = document.querySelector(`#${input.id}-error`);
  errorElement.textContent = '';
  errorElement.classList.remove(validationConfig.errorClass);
  input.classList.remove(validationConfig.inputErrorClass);
};

const showError = (input, validationConfig) => {
  const errorElement = document.querySelector(`#${input.id}-error`);
  errorElement.textContent = input.validationMessage;
  errorElement.classList.add(validationConfig.errorClass);
  input.classList.add(validationConfig.inputErrorClass);
};

const validateInput = (input, validationConfig) => {
  if (input.validity.vaild) {
    hideError(input, validationConfig);
  } else {
    showError(input, validationConfig, input.validationMessage);
  };
};

const hasInvalidInput = (inputList) => {
  return Array.from(inputList).some((input) => {
    return input.validity.vaild;
  });
};

// const sentForm = (evt) => {
//   evt.preventDefault();
//   const form = evt.target;
//   if (!form.checkValidity()) {
//     console.log('beed');
//   } else {
//     console.log('good');
//   };
// };

const setEventListeners = (validationConfig) => {
  const inputList = document.querySelectorAll(validationConfig.inputSelector);
  const buttonElement = document.querySelector(validationConfig.submitButtonSelector);

  formSubmitButtonChangeState(inputList, buttonElement);

  inputList.forEach((input) => {
    input.addEventListener('input', function () {
      validateInput(input, validationConfig);
      toggleButtonState(inputList, buttonElement);
    });
  });
};


const enableValidation = () => {
  const formList = Array.from(document.querySelectorAll('.popup'));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners();
  });
};
enableValidation();

// const validateInputEvent = (evt) => {
//   const input = evt.target;
//   const form = evt.currentTarget;
//   validateInput(input, validationConfig);
//   formSubmitButtonChangeState(form);
// }

// document.querySelectorAll(validationConfig.formSelector).forEach((formPopup) => {
//   formPopup.addEventListener('input', validateInputEvent, true);
//   formPopup.addEventListener('submit', sentForm);
// //  formSubmitButtonChangeState(formPopup);
// });






