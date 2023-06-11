module.exports = new Proxy(
  {},
  {
    get: function get(_, key) {
      if (key === "__esModule") {
        return false;
      }
      return key;
    },
  }
);
