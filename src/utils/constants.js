export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

export const profileEditButton = document.querySelector("#profile-edit-button");
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileaddModal = document.querySelector("#profile-add-modal");
export const previewImageModalWindow = document.querySelector(
  ".modal_type_preview"
);
export const previewImageDescription =
  previewImageModalWindow.querySelector("#modal-caption");

export const profileName = document.querySelector(".profile__title");
export const profileDescription = document.querySelector(
  ".profile__description"
);
export const profileNameInput = document.querySelector("#profile-name-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
export const cardTitleInput = document.querySelector("#card-title-input");
export const cardUrlInput = document.querySelector("#card-url-input");
export const addNewCardButton = document.querySelector(".profile__add-button");

export const profileEditForm = profileEditModal.querySelector(".modal__form");
export const addCardForm = profileaddModal.querySelector(".modal__form");
export const cardListEl = document.querySelector(".cards__list");
export const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
export const closeButtons = document.querySelectorAll(".modal__close");

export const onImagePreview = (cardData) => {
  const previewImageElement = previewImageModalWindow.querySelector(
    ".modal__preview-image"
  );
  previewImageElement.src = cardData._link;
  previewImageElement.alt = cardData._name;
  previewImageDescription.textContent = cardData._name;
  openPopup(previewImageModalWindow);
};
