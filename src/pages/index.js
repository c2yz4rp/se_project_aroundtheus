import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import {
  initialCards,
  profileEditButton,
  profileNameInput,
  profileDescriptionInput,
  cardListEl,
  config,
  addNewCardButton,
  addCardForm,
  profileEditForm,
} from "../utils/constants.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

//Validation
const addCardFormValidator = new FormValidator(config, addCardForm);
const editProfileFormValidator = new FormValidator(config, profileEditForm);

//API
const api = new Api("https://around-api.en.tripleten-services.com/v1", {
  authorization: "1b9e6c44-417d-4f99-be38-392f1aa07612",
  "Content-Type": "application/json",
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
});

profileEditPopup.setEventListeners();

//Add Card/Image Form
const addCardFormPopup = new PopupWithForm({
  popupSelector: "#profile-add-modal",
  handleFormSubmit: handleAddCardSubmit,
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
  ".cards__list"
);

//Event Listeners

addNewCardButton.addEventListener("click", () => {
  addCardFormPopup.open();
});

profileEditButton.addEventListener("click", () => {
  editProfileFormValidator.resetValidation();
  const inputData = userInfo.getUserInfo();
  // console.log(inputData);
  profileNameInput.value = inputData.name;
  profileDescriptionInput.value = inputData.about;
  profileEditPopup.open();
});

addCardFormValidator.enableValidation();
editProfileFormValidator.enableValidation();

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
  return card.generateCard();
}

function handleProfileEditSubmit(inputData) {
  profileEditPopup.renderLoading(true);

  api
    .setUserInfo(inputData.name, inputData.description)
    .then(() => {
      userInfo.setUserInfo({
        name: inputData.name,
        about: inputData.description,
      });
      profileEditPopup.close();
    })
    .catch((err) => {
      console.error("Error updating user info", err);
      alert(err);
    })
    .finally(() => {
      console.log("Edit form complete");
      profileEditPopup.renderLoading(false);
    });

  // profileEditPopup.close();
}

function handleAddCardSubmit(inputData) {
  const name = inputData.title;
  const link = inputData.url;

  addCardFormPopup.renderLoading(true);
  api
    .uploadCard({ name, link })
    .then((cardData) => {
      const card = createCard(cardData);
      // cardAddForm.setLoading(false);
      cardSection.addItem(card);
      addCardFormPopup.close();
      addCardForm.reset();
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      console.log("Add card complete");
      addCardFormPopup.renderLoading(false);
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
  newProfileImageModal.renderLoading(true);

  api
    .setUserAvatar(data.link)
    .then((res) => {
      userInfo.updateProfileImage(res);
      newProfileImageModal.close();
      //profileImageForm.reset();
      // newProfileImageModal.setLoading(false);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      console.log("Avatar edit submit");

      newProfileImageModal.renderLoading(false);
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
      })
      .finally(() => {
        console.log("Delete card complete");
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
    .likeCard(card._id, card.isLiked)
    .then((res) => {
      console.log(res);
      card.setIsLiked(res.isLiked);
    })
    .catch((err) => {
      console.error(err);
    })
    .finally(() => {
      console.log("Like card complete");
    });
}

function unlikeCard(card) {
  api
    .unlikeCard(card._id)
    .then((res) => {
      console.log(res);
      // card.setIsLiked(false);
    })
    .catch((err) => {
      console.error(err);
    });
}
