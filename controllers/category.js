const Category = require("../models/Category");
const { errorHandler } = require("../helpers/dbErrorHandler");

// route for creating category by admin only
module.exports.create = (req, res) => {
  const category = new Category(req.body);
  category.save((err, data) => {
    if (err) {
      res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      data,
    });
  });
};
