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
  isValidEmail: function(e) {
    let regex = /(\w|\d)+@(\w|\d)+\.\w+/gi;
    if (!regex.test(e)) {
      return false;
    }
    return true;
  },
  doChaiPost: async (requester, url, data) => {
    return requester.post(url).send(data);
  },
  doChaiGet: async (requester, url, data) => {
    return requester.get(url).send(data);
  }
};

module.exports = utils;
