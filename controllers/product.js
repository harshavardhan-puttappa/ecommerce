const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/Product");
const { errorHandler } = require("../helpers/dbErrorHandler");

// productById middleware
module.exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        error: "Product not found",
      });
    }
    req.product = product;
    next();
  });
};

// read product handler
module.exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

// function handler for creating product
module.exports.create = (req, res) => {
  // to get all the incoming form data from req body
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    // check for all fileds in the form data
    const { name, description, price, category, quantity, shipping } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    // create the product with the fields
    let product = new Product(fields);

    //handle the image coming in the form data
    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1MB in size",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    // save the product created
    product.save((err, result) => {
      if (err) {
        res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json({ result });
    });
  });
};

// Remove product handler
module.exports.removeProduct = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Product deleted successfully",
    });
  });
};

// update product handler
module.exports.updateProduct = (req, res) => {
  // to get all the incoming form data from req body
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).json({
        error: "Image could not be uploaded",
      });
    }

    // check for all fileds in the form data
    const { name, description, price, category, quantity, shipping } = fields;

    if (
      !name ||
      !description ||
      !price ||
      !category ||
      !quantity ||
      !shipping
    ) {
      return res.status(400).json({
        error: "All fields are required",
      });
    }

    // update the product with the fields
    let product = req.product;
    product = _.extend(product, fields);

    //handle the image coming in the form data
    if (files.photo) {
      if (files.photo.size > 1000000) {
        return res.status(400).json({
          error: "Image should be less than 1MB in size",
        });
      }
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    // save the product created
    product.save((err, result) => {
      if (err) {
        res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json({ result });
    });
  });
};
