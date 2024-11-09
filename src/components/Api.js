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

      body: JSON.stringify({ avatar: link }),
    }).then(this._handleResponse);
  }

  uploadCard({ name, link }) {
    return fetch(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,

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

  likeCard(cardId, isLiked) {
    return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
      method: isLiked ? "DELETE" : "PUT",
      headers: this._headers,
    }).then(this._handleResponse);
  }

  renderAppData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
}
