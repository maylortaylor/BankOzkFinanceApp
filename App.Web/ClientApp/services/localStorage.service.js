

export default {
  getItem(key) {
    return Promise.resolve().then(function () {
      return JSON.parse(localStorage.getItem(key == null ? null : key));
    })
  },
  setItem(key, value) {
    return Promise.resolve().then(function () {
      return localStorage.setItem([key], JSON.stringify(value));
    });
  },
  deleteItem(key) {
    return Promise.resolve().then(function () {
      return localStorage.removeItem(key);
    });
  },
  clearStorage() {
    return Promise.resolve().then(function () {
      return localStorage.clear();
    });
  }
};
