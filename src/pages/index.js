import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import {
  initialCards,
  profileEditButton,
  cardListEl,
  config,
  addNewCardButton,
  addCardForm,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

//Card Template
const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

//Validation
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);

    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

const addCardFormValidator = formValidators["add-card-form"];
const editProfileFormValidator = formValidators["edit-card-form"];

//User Info
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

//const currentUserInfo = userInfo.getUserInfo();

//Profile Edit Form
const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit,
  editProfileFormValidator
);

profileEditPopup.setEventListeners();

//Add Card/Image Form
const addCardFormPopup = new PopupWithForm(
  "#profile-add-modal",
  handleAddCardSubmit,
  addCardFormValidator
);

addCardFormPopup.setEventListeners();

// Preview Image Popup
const imagePopup = new PopupWithImage(".modal_type_preview");
imagePopup.setEventListeners();

function handleImageClick(cardData) {
  imagePopup.open(cardData);
}

//Section
const CardSection = new Section(
  {
    items: initialCards,
    renderer: renderCard,
  },
  cardListEl
);

CardSection.renderItems();

// Render Cards
function renderCard(item, method = "addItem") {
  const cardElement = createCard(item);
  CardSection[method](cardElement);
}

//Functions
function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

function handleProfileEditSubmit(inputData) {
  userInfo.setUserInfo({
    name: inputData.name,
    description: inputData.job,
  });

  profileEditPopup.close();
}

function handleAddCardSubmit(inputData) {
  const cardData = {
    name: inputData.title,
    link: inputData.url,
  };
  renderCard(cardData);
  addCardFormValidator.toggleButtonState();
  addCardFormPopup.close();
  addCardForm.reset();
}

addNewCardButton.addEventListener("click", () => {
  addCardFormPopup.open();
});

profileEditButton.addEventListener("click", () => {
  editProfileFormValidator.resetValidation();
  const userData = userInfo.getUserInfo();
  console.log(userData);
  profileEditPopup.setInputValues({
    name: userData.name,
    description: userData.job,
  });

  profileEditPopup.open();
});
