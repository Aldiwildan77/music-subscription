const utils = {
  isCreateDataFull: (name, price, duration) => {
    if (!name || !price || !duration) {
      return false;
    }
    return true;
  }
};

module.exports = utils;
