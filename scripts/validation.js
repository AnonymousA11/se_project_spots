// Declaring a configuration object that contains the
// necessary classes and selectors.
const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-btn",
  inactiveButtonClass: "modal__save-btn_disabled",
  inputErrorClass: "modal__input_state_error",
  errorClass: "modal__error",
};

console.log(settings);
// Passing the configuration object to enableValidation when we call it.

const showInputError = (formEl, inputEl, errorMessage) => {
  const errorMessageID = inputEl.id + "-error";
  const errorMessageElement = document.querySelector(`#${errorMessageID}`);
  errorMessageElement.classList.add(settings.errorClass);
  errorMessageElement.textContent = errorMessage;
  inputEl.classList.add("modal__input_state_error");
};

const hideInputError = (formEl, inputEl) => {
  const errorMessageID = inputEl.id + "-error";
  const errorMessageElement = document.querySelector(`#${errorMessageID}`);
  inputEl.classList.add(settings.inputErrorClass);
  errorMessageElement.classList.remove(settings.errorClass);
  errorMessageElement.textContent = "";
  inputEl.classList.remove("modal__input_state_error");
};

const checkInputValidity = (formEl, inputEl) => {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, inputEl.validationMessage);
  } else {
    hideInputError(formEl, inputEl);
  }
};

const toggleButtonState = (inputList, buttonElement) => {
  if (inputList.some((inputEl) => !inputEl.validity.valid)) {
    buttonElement.classList.add("modal__save-btn_disabled");
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.add(settings.inactiveButtonClass)
    buttonElement.disabled = false;
  }
};

const disableBtnState = (buttonEl) => {
  buttonEl.disabled = true;
};

const resetValidation = (formEl, config) => {
  const inputList = Array.from(formEl.querySelectorAll(config.inputSelector));
  inputList.forEach((inputEl) => hideInputError(formEl, inputEl));
};

const setEventListeners = (formElement, config) => {
  const submitButtonSelector = formElement.querySelector(config.submitButtonSelector);
  const inputList = Array.from(
    formElement.querySelectorAll(config.inputSelector)
  );
  const buttonElement = formElement.querySelector(config.submitButtonSelector);
  console.log(inputList);
  console.log(buttonElement);

  toggleButtonState(inputList, buttonElement);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const enableValidation = (config) => {
  console.log(config.formSelector);
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  // Debugging statement removed for production
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
    // Form submission logic
  });
};

enableValidation(settings);
