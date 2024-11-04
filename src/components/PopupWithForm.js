import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    //this._inputList = this._popupForm.querySelectorAll(".modal__form-input");
  }

  renderLoading(isLoading) {
    this._submitBtn = this._popupElement.querySelector(".modal__button");
    if (isLoading) {
      this._submitBtn.textContent = "Saving...";
    } else {
      this._submitBtn.textContent = "Submit";
    }
  }

  //getForm() {
  //  return this._popupForm;
  //}

  _getInputValues() {
    this._inputList = this._popupElement.querySelectorAll(".modal__input");
    this._inputData = {};
    this._inputList.forEach((input) => {
      this._inputData[input.name] = input.value;
    });
    return this._inputData;
  }

  //setInputValues(data) {
  //  this._inputList.forEach((input) => {
  //    input.value = data[input.name];
  //  });
  //}

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      // this.close();
    });
  }
}
