import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
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

//API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "1b9e6c44-417d-4f99-be38-392f1aa07612",
    "Content-Type": "application/json",
  },
});

//User Info
const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
  profileImage: ".profile__image",
});

//const currentUserInfo = userInfo.getUserInfo();

//Profile Edit Form
const profileEditPopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileEditSubmit,
  editProfileFormValidator,
});

profileEditPopup.setEventListeners();

//Add Card/Image Form
const addCardFormPopup = new PopupWithForm({
  popupSelector: "#profile-add-modal",
  handleFormSubmit: handleAddCardSubmit,
  addCardFormValidator,
});

addCardFormPopup.setEventListeners();

// Preview Image Popup
const imagePopup = new PopupWithImage({ popupSelector: ".modal_type_preview" });
imagePopup.setEventListeners();

function handleImageClick(cardData) {
  imagePopup.open(cardData);
}

//Section
const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const cardELement = createCard(item);
      cardSection.addItem(cardELement);
    },
  },
  ".card__list"
);

//cardSection.renderItems();

// Render Cards
//function renderCard(item, method = "addItem") {
// const cardElement = createCard(item);
// cardSection[method](cardElement);
//}

//Functions
function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleImageClick,
    handleDeleteCardSubmit,
    likeCard,
    unlikeCard
  );
  return card.getView();
}

function handleProfileEditSubmit(inputData) {
  userInfo.setUserInfo({
    name: inputData.name,
    job: inputData.description,
  });
  profileEditPopup.setLoading(true);
  api
    .setUserInfo(formValues.title, formValues.description)
    .then((res) => {
      userInfo.getUserInfo(res.name, res.about);
      editProfileModal.setLoading(false);
    })
    .catch((err) => {
      console.error("Error updating user info", err);
      alert(err);
    });

  profileEditPopup.close();
}

function handleAddCardSubmit(inputData) {
  const name = inputData.title;
  const link = inputData.url;

  cardAddForm.setLoading(true);
  api
    .uploadCard({ name, link })
    .then((cardData) => {
      const card = createCard(cardData);
      cardAddForm.setLoading(false);
      cardSection.addItem(card);
      addCardModal.close();
      cardAddForm.reset();
    })
    .catch((error) => {
      console.error(error);
    });
}

api
  .getInitialCards()
  .then((res) => {
    console.log(res);
    cardSection.renderItems(res);
  })

  .catch((err) => alert(err));

api
  .getUserInfo()
  .then((res) => {
    userInfo.setUserInfo(res);
    userInfo.updateProfileImage(res);
  })
  .catch((err) => alert(err));

//Avatar
const profileImageForm = document.querySelector("#edit-avatar-form");
const profileFormValidator = new FormValidator(config, profileImageForm);
profileFormValidator.enableValidation();

function handleImageProfileEditSubmit(data) {
  newProfileImageModal.setLoading(true);

  api
    .setUserAvatar(data.link)
    .then((res) => {
      userInfo.updateProfileImage(res);
      newProfileImageModal.close();
      profileImageForm.reset();
      newProfileImageModal.setLoading(false);
    })
    .catch((err) => {
      console.error(err);
    });
}

const profileImageCover = document.querySelector(".profile__edit-image");
profileImageCover.addEventListener("click", () => {
  newProfileImageModal.open();
});

const newProfileImageModal = new PopupWithForm({
  popupSelector: "#edit-avatar-modal",
  handleFormSubmit: handleImageProfileEditSubmit,
});
newProfileImageModal.setEventListeners();

// confirmation

function handleDeleteCardSubmit(card) {
  confirmModal.setSubmitAction(() => {
    api
      .deleteCard(card._id)
      .then((res) => {
        console.log(res);
        card.remove();
        confirmModal.close();
      })
      .catch((err) => {
        console.error(err);
      });
  });
  confirmModal.open(card);
}

const confirmModal = new PopupWithConfirmation({
  popupSelector: "#confirmation-modal",
});
confirmModal.setEventListeners();

function likeCard(card) {
  api
    .likeCard(card._id)
    .then((res) => {
      console.log(res);
      card.setIsLiked(true);
    })
    .catch((err) => {
      console.error(err);
    });
}

function unlikeCard(card) {
  api
    .unlikeCard(card._id)
    .then((res) => {
      console.log(res);
      card.setIsLiked(false);
    })
    .catch((err) => {
      console.error(err);
    });
}

//addNewCardButton.addEventListener("click", () => {
//  addCardFormPopup.open();
//});

//profileEditButton.addEventListener("click", () => {
//  editProfileFormValidator.resetValidation();
// const userData = userInfo.getUserInfo();
//  console.log(userData);
// profileEditPopup.setInputValues({
//   name: userData.name,
//   description: userData.job,
// });

//  profileEditPopup.open();
//});
