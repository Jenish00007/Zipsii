"use strict";

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var visiterRouter = require("./routes/visiter_details.route");
var passRoutes = require("./routes/pass_details.route");
var haversine = require('haversine-distance');
var MongoDB = require("./services/mongodb.service");
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

// app.get('/api/visiter/getallvisiter', async (req, res) => {
//     try {
//       const { contactnumber, firstname, aadharCardNumber, page = 1, perPage = 10 } = req.query;

//       // Log the incoming query parameters
//       console.log("Search Parameters:", req.query);

//       const query = {};

//       // Apply filters based on query parameters
//       if (contactnumber) {
//         // Use exact match regex for contact number
//         query.contactnumber = { $regex: `^${contactnumber}$`, $options: "i" };  // Exact match (case-insensitive)
//       }

//       if (firstname) {
//         query.firstname = { $regex: firstname, $options: "i" };  // Case-insensitive search for firstname
//       }

//       if (aadharCardNumber) {
//         query.aadharCardNumber = { $regex: aadharCardNumber, $options: "i" };  // Case-insensitive search for aadharCardNumber
//       }

//       // Validate pagination parameters
//       const validPage = Math.max(1, page);  // Ensure page number is at least 1
//       const validPerPage = Math.min(Math.max(1, perPage), 100);  // Ensure perPage is between 1 and 100

//       // Get the total count of users that match the query
//       const totalCount = await MongoDB.db.collection(mongoConfig.collections.VISITER).countDocuments(query);

//       // Fetch users with pagination
//       const users = await MongoDB.db.collection(mongoConfig.collections.VISITER)
//         .find(query)  // Apply the filter (if any)
//         .skip((validPage - 1) * validPerPage)  // Skip based on page number
//         .limit(validPerPage)  // Limit the number of results
//         .toArray();

//       return res.json({
//         status: true,
//         message: "Users found",
//         data: users,
//         totalCount,  // Total count for pagination
//         page: validPage,
//         perPage: validPerPage
//       });
//     } catch (error) {
//       return res.status(500).json({
//         status: false,
//         message: "Failed to find users",
//         error: `Error: ${error.message}`
//       });
//     }
//   });

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