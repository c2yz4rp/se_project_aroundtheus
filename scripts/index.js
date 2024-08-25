const initialCards = [
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

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileaddModal = document.querySelector("#profile-add-modal");
const previewImageModalWindow = document.querySelector(".modal__preview");
const previewImageElement = document.querySelector(".card__image");

const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileaddModalCloseButton =
  profileaddModal.querySelector(".modal__close");
const previewImageCloseButton =
  previewImageModalWindow.querySelector(".modal__close");

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileNameInput = document.querySelector("#profile-name-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const cardTitleInput = document.querySelector("#card-title-input");
const cardUrlInput = document.querySelector("#card-url-input");
const addNewCardButton = document.querySelector(".profile__add-button");

const cardDeleteBtn = document.querySelector(".card__delete-button");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardForm = profileaddModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;

function toggleModalWindow(popup) {
  popup.classList.toggle("modal_opened");
}

function closePopop() {
  profileEditModal.classList.remove("modal_opened");
  profileaddModal.classList.remove("modal_opened");
  previewImageModalWindow.classList.remove("modal_opened");
}

function getCardElement(cardData) {
  const cardTemplate = document.querySelector("#card-template").content;
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");

  const cardTitleEl = cardElement.querySelector(".card__description-text");
  const likeButton = cardElement.querySelector(".card__like-button");

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardData.name;
  cardTitleEl.textContent = cardData.name;

  function openImageModal(imageSrc, imageAlt, captionText) {
    const modalImage = document.querySelector(".modal__preview");
    const modalCaption = document.querySelector("#modal-caption");
    modalImage.src = imageSrc;
    modalImage.alt = imageAlt;
    modalCaption.textContent = captionText;
    //openImageModal(previewImageModalWindow);

    const cardDeleteBtn = cardElement.querySelector(".cards__delete-icon");
  }

  //cardDeleteBtn.addEventListener("click", () => {
  // cardElement.remove();
  // });

  document.querySelectorAll(".card__image").forEach((cardImageEl) => {
    cardImageEl.addEventListener("click", (event) => {
      const imageSrc = event.target.src;
      const imageAlt = event.target.alt;
      const captionText = event.target
        .closest(".card")
        .querySelector(".card__description").textContent;
      openImageModal(imageSrc, imageAlt, captionText);

      toggleModalWindow(previewImageModalWindow);
    });
  });

  console.log(cardElement);

  return cardElement;
}

function renderCard(cardData, wrapper) {
  const cardElement = getCardElement(cardData);
  wrapper.prepend(cardElement);
}

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopop();
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  closePopop();
}

profileEditButton.addEventListener("click", () => {
  profileNameInput.value = profileName.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  profileEditModal.classList.add("modal_opened");
});

profileEditCloseButton.addEventListener("click", closePopop);

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addNewCardButton.addEventListener("click", () => {
  profileaddModal.classList.add("modal_opened");
});

profileaddModalCloseButton.addEventListener("click", closePopop);

previewImageCloseButton.addEventListener("click", closePopop);

addCardForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
