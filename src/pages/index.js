import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import { initialCards } from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

//Card Template
const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

//User Info
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const currentUserInfo = userInfo.getUserInfo();

// Render Cards
const renderer = (cardData) => {
  const card = new Card(cardData, "#card-form", handleImageClick);
  const cardElement = card.createCard();
  section.addItem(cardElement);
};

const section = new Section({ items: initialCards, renderer }, ".card__list");
section.renderItems();

//function getCardElement(cardData) {
//const card = new Card(cardData, "#card-template", onImagePreview).getView();
// return card;
//}
//function renderCard(cardData, wrapper) {
//const cardElement = getCardElement(cardData);
//wrapper.prepend(cardElement);
//}

//Profile Edit Form
const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  (formValues) => {
    const profileTitle = document.querySelector(".profile__title");
    const profileDescription = document.querySelector(".profile__description");

    profileTitle.textContent = formValues.title;
    profileDescription.textContent = formValues.description;

    profileEditPopup.close();
  }
);
document.querySelector("#profile-edit-button").addEventListener("click", () => {
  profileEditPopup.open();
});

//closeButtons.forEach((button) => {
//const popup = button.closest(".modal");
//button.addEventListener("click", () => closePopup(popup));
//});

//function openPopup(popup) {
//popup.classList.add("modal_opened");

//document.addEventListener("keydown", handleEscKey);
//popup.addEventListener("mousedown", handleOverlayClick);
//}

//Add Card/Image Form
const addCardFormPopup = new PopupWithForm(
  "#profile-add-modal",
  (formValues) => {
    const cardTitle = formValues.title;
    const cardLink = formValues.link;

    const newCard = new Card(
      { name: cardTitle, link: cardLink },
      "#card-modal-form",
      handleImageClick
    );
    const cardElement = newCard.createCard();

    document.querySelector(".card__list").prepend(cardElement);
    addCardFormPopup.close();
  }
);

document.querySelector(".profile__add-button").addEventListener("click", () => {
  addCardFormPopup.open();
});

//function closePopup(popup) {
// popup.classList.remove("modal_opened");

// document.removeEventListener("keydown", handleEscKey);
// popup.removeEventListener("mousedown", handleOverlayClick);
//}

//function handleEscKey(evt) {
// if (evt.key === "Escape") {
//  const modalOpened = document.querySelector(".modal_opened");
//  closePopup(modalOpened);
//}
//}

//function handleOverlayClick(evt) {
// if (evt.target.classList.contains("modal_opened")) {
//  closePopup(evt.target);
//}
//}

// Preview Image Popup
const imagePopup = new PopupWithImage(".modal__preview-image");
imagePopup.setEventListeners();

function handleImageClick(link, name) {
  imagePopup.open({ name, link });
}

//function handleProfileEditSubmit(e) {
//e.preventDefault();
//profileName.textContent = profileNameInput.value;
//profileDescription.textContent = profileDescriptionInput.value;
//closePopup(profileEditModal);
//}

//function handleAddCardSubmit(evt) {
//evt.preventDefault();
//const name = cardTitleInput.value;
//const link = cardUrlInput.value;
//renderCard({ name, link }, cardListEl);
//addCardForm.reset();
//closePopup(profileaddModal);
//addFormValidator.disableButton();
//}

//profileEditButton.addEventListener("click", () => {
//profileNameInput.value = profileName.textContent;
//profileDescriptionInput.value = profileDescription.textContent;
//openPopup(profileEditModal);
//});

//profileEditForm.addEventListener("submit", handleProfileEditSubmit);

//addNewCardButton.addEventListener("click", () => {
//openPopup(profileaddModal);
//});

//addCardForm.addEventListener("submit", handleAddCardSubmit);

//initialCards.forEach((cardData) => renderCard(cardData, cardListEl));

//const editFormValidator = new FormValidator(config, profileEditModal);
//const addFormValidator = new FormValidator(config, profileaddModal);
//editFormValidator.enableValidation();
//addFormValidator.enableValidation();

//Config
const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__form-input",
  submitButtonSelector: ".modal__save",
  inactiveButtonClass: "modal__save_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
