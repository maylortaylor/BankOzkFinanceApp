

export default {
  getItem(key) {
    return Promise.resolve().then(function () {
      return localStorage.getItem(key == null ? null : key);
    })
  },
  setItem(key, value) {
    var o = JSON.stringify(value);
    return Promise.resolve().then(function () {
      return localStorage.setItem([key], o);
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
