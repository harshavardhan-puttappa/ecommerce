const Category = require("../models/Category");
const { errorHandler } = require("../helpers/dbErrorHandler");

// middleware to find and place category in req object whenever there is a category id in the url
module.exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        error: "Category does not exist",
      });
    }
    req.category = category;
    next();
  });
};

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

// return the category from the request object to the get route
module.exports.read = (req, res) => {
  return res.json(req.category);
};

// update category
module.exports.update = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
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
// remove category
module.exports.remove = (req, res) => {
  const category = req.category;
  category.remove((err, data) => {
    if (err) {
      res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Category deleted",
    });
  });
};
// list all categories
module.exports.list = (req, res) => {
  Category.find().exec((err, data) => {
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
