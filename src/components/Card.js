export default class Card {
  constructor(data, cardSelector, handleImageClick, deleteCard, likeCard) {
    this.name = data.name;
    this.link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._deleteCard = deleteCard;
    this._likeCard = likeCard;
    this._id = data._id;
    this.isLiked = data.isLiked;
  }

  setEventListeners() {
    //this._cardElement.querySelector(".card__description-text").textContent =
    // this._name;

    this._likeButton = this._cardElement.querySelector(".card__like-button");

    this._likeButton.addEventListener("click", () => {
      this._likeCard(this);
      // this._handleLikeIcon();
    });

    this._deleteButton.addEventListener("click", () => {
      this._deleteCard(this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleImageClick(this);
    });
  }

  setIsLiked(isLiked) {
    this.isLiked = isLiked;
    this.setButtonState();
  }

  setButtonState() {
    if (this.isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  remove() {
    this._cardElement.remove();
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return this._cardElement;
  }

  //get the card view
  generateCard() {
    this._cardElement = this.getView();
    this._cardElement.querySelector(".card__description-text").textContent =
      this.name;

    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardImage.src = this.link;
    this._cardImage.alt = this.name;
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );

    //set event listeners
    this.setEventListeners();
    this.setButtonState();

    //return the card
    return this._cardElement;
  }
}
