export default class Section {
  constructor({ renderer }, selector) {
    //this._items = items;
    this._element = document.querySelector(selector);
    this._renderer = renderer;
  }

  renderItems(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._element.prepend(item);
  }

  appendItem(item) {
    this._element.append(item);
  }

  clear() {
    this._element.innerHTML = "";
  }
}
