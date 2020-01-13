const utils = {
  restReturn: (res, code, error, message) => {
    return res.status(code).json({
      error,
      message
    });
  }
};

module.exports = utils;
