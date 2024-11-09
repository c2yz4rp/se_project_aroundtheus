export default class UserInfo {
  constructor({ nameSelector, jobSelector, profileImage }) {
    this._nameElement = document.querySelector(nameSelector);
    this._jobElement = document.querySelector(jobSelector);
    this._profileImage = document.querySelector(profileImage);
  }

  getUserInfo() {
    return {
      name: this._nameElement.textContent,
      about: this._jobElement.textContent,
      image: this._profileImage.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = about;
  }

  updateProfileImage(image) {
    if (image.avatar) {
      this._profileImage.src = image.avatar;
    }
  }
}
