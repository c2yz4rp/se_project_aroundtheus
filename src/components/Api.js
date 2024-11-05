export default class Api {
  constructor(baseURL, headers) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error ${res.status}`);
    }
  }

  getInitialCards() {
    return fetch(`${this._baseURL}/cards`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  // other methods for working with the API
  getUserInfo() {
    return fetch(`${this._baseURL}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  setUserInfo(name, about) {
    return fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      "Content-Type": "application/json",

      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._handleResponse);
  }

  setUserAvatar(link) {
    console.log("Avatar link:", link);

    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      "Content-Type": "application/json",
      body: JSON.stringify({ avatar: link }),
    }).then(this._handleResponse);
  }

  uploadCard({ name, link }) {
    return fetch(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,
      "Content-Type": "application/json",

      body: JSON.stringify({ name: name, link: link }),
    }).then(this._handleResponse);
  }

  deleteCard(cardId) {
    console.log("Deleting card with ID:", cardId);

    return fetch(`${this._baseURL}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  likeCard(cardId) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}/likes`,
      {
        method: "PUT",
        headers: {
          authorization: "1b9e6c44-417d-4f99-be38-392f1aa07612",
          "Content-Type": "application/json",
        },
      }
    ).then(this._handleResponse);
  }

  unlikeCard(cardId) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}/likes`,
      {
        method: "DELETE",
        headers: {
          authorization: "1b9e6c44-417d-4f99-be38-392f1aa07612",
          "Content-Type": "application/json",
        },
      }
    ).then(this._handleResponse);
  }

  renderAppData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
}
