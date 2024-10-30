export default class Api {
  constructor(baseURL, headers) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "GET",
      headers: {
        authorization: "1b9e6c44-417d-4f99-be38-392f1aa07612",
      },
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
  }

  // other methods for working with the API
  getUserInfo() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "GET",
      headers: { authorization: "1b9e6c44-417d-4f99-be38-392f1aa07612" },
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
  }

  setUserInfo(name, about) {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        authorization: "1b9e6c44-417d-4f99-be38-392f1aa07612",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        about,
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
  }

  setUserAvatar(link) {
    console.log("Avatar link:", link);

    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        authorization: "1b9e6c44-417d-4f99-be38-392f1aa07612",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ avatar: link }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
  }

  uploadCard({ name, link }) {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "POST",
      headers: {
        authorization: "1b9e6c44-417d-4f99-be38-392f1aa07612",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: name, link: link }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
  }

  deleteCard(cardId) {
    console.log("Deleting card with ID:", cardId);

    return fetch(
      "https://around-api.en.tripleten-services.com/v1/cards/a4a9085f276105613fe66b2a",
      {
        method: "DELETE",
        headers: {
          authorization: "1b9e6c44-417d-4f99-be38-392f1aa07612",
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    });
  }

  likeCard(cardId, isLiked) {
    return fetch(
      "https://around-api.en.tripleten-services.com/v1/cards/a4a9085f276105613fe66b2a/likes",
      {
        method: isLiked ? "DELETE" : "PUT",
        headers: {
          authorization: "1b9e6c44-417d-4f99-be38-392f1aa07612",
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        return Promise.reject(`Error: ${res.status}`);
      }
    });
  }
}
//function Promise.all() {}

fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
  method: "GET",
  headers: {
    authorization: "1b9e6c44-417d-4f99-be38-392f1aa07612",
  },
})
  .then((res) => res.json())
  .then((result) => {
    console.log(result);
  });
