"use strict";

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var visiterRouter = require("../src/routes/visiter_details.route");
var passRoutes = require("../src/routes/pass_details.route");
var haversine = require('haversine-distance');
var MongoDB = require("../src/services/mongodb.service");
var multer = require('multer');
var _require = require("./config"),
  mongoConfig = _require.mongoConfig;
MongoDB.connectToMongoDB();
// Import necessary modules or dependencies
var _require2 = require("mongodb"),
  ObjectId = _require2.ObjectId;
var app = express();

// Use CORS middleware to allow requests from all origins
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express["static"]("static"));
app.use("/api/visiter", visiterRouter);
app.use('/api/passes', passRoutes);
app.use(express["static"]('./'));

// use multer package
var storage = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, './Images');
  },
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  }
});
var maxSize = 10 * 1000 * 1000;
var upload = multer({
  storage: storage,
  limits: {
    fileSize: maxSize
  }
});
var storage_Product = multer.diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, './Products');
  },
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
  }
});
var upload_Product = multer({
  storage: storage_Product,
  limits: {
    fileSize: maxSize
  }
});

// app.post('/api/product/add_product', upload_Product.array('Product_Images', 3), async (req, res) => {
//     try {
//         if (!req.files || req.files.length === 0) {
//             return res.status(400).json({ error: 'No files uploaded' });
//         }

//         const {
//             name,
//             price,
//             description,
//             model,
//             shopId,
//             categoryId,
//             subCategoryId
//         } = req.body;

//         const imagePaths = req.files.map(file => file.path);
//         const productStatus = '';
//         const formattedDate = new Date(); // Get current date and time
//         const createdAt = formattedDate.toLocaleDateString('en-GB');
//         const productprice = parseFloat(price);
//         const formData = {
//             name,
//             price: productprice,
//             description,
//             model,
//             images: imagePaths.map(path => ({ url: path })),
//             shopId,
//             categoryId,
//             subCategoryId,
//             createdAt,
//             productStatus
//         };

//         const savedUser = await MongoDB.db
//             .collection(mongoConfig.collections.PRODUCTS)
//             .insertOne(formData);

//         if (savedUser.insertedId) {
//             res.status(200).json({
//                 status: true,
//                 message: "PRODUCTS Added successfully",
//             });
//         } else {
//             res.status(500).json({
//                 status: false,
//                 message: "PRODUCTS Creating failed",
//             });
//         }
//     } catch (error) {
//         console.error("Error creating PRODUCTS:", error);
//         res.status(500).json({
//             status: false,
//             message: "An error occurred while creating the PRODUCTS",
//         });
//     }
// });

module.exports = app;