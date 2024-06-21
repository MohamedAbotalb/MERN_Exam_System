const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
  const result = validationResult(req);

  if (result.errors.length > 0) {
    const errorMsg = result.errors.reduce(
      (current, item) => current + item.msg + ' : ',
      ''
    );
    return res.status(400).json({ success: false, message: errorMsg });
  }
  next();
};
