const utils = {
  restReturn: (res, code, error, message) => {
    return res.status(code).json({
      error,
      message
    });
  },
  isRegisterDataFull: (name, email, phone) => {
    if (!name || email == null || !phone) {
      return false;
    }
    return true;
  },
  isValidEmail: (email) => {
    let regex = /(\w|\d)+@(\w|\d)+\.\w+/gi;
    if (!regex.test(email)) {
      return false;
    }
    return true;
  }
};

module.exports = utils;
