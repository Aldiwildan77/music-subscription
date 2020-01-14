const moment = require("moment");
const utils = {
  restReturn: (res, code, error, message) => {
    return res.status(code).json({
      error,
      message
    });
  },
  getCurrentDate: () => {
    return moment().format("DD-MM-YYYY");
  },
  calculateExpireDate: (duration, date = null) => {
    let currentDate = date == null ? moment() : moment(date, "DD-MM-YYYY");
    let expireDate = currentDate.add(parseInt(duration), "days");
    return expireDate.format("DD-MM-YYYY");
  }
};

module.exports = utils;
