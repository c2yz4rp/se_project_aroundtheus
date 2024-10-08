import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    //console.log(this._popupElement);
    this._imageElement = this._popupElement.querySelector(
      ".modal__preview-image"
    );

    this._captionElement = this._popupElement.querySelector("#modal-caption");
  }
  open(cardData) {
    this._imageElement.src = cardData.link;
    this._imageElement.alt = cardData.name;
    this._captionElement.textContent = cardData.name;
    super.open();
  }

  setEventListeners() {
    super.setEventListeners();
  }
}
