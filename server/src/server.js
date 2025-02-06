var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var visiterRouter = require("./routes/visiter_details.route");
var passRoutes = require("./routes/pass_details.route");

const haversine = require('haversine-distance');

const MongoDB = require("./services/mongodb.service");
const multer = require('multer');
const { mongoConfig } = require("./config");
MongoDB.connectToMongoDB();
// Import necessary modules or dependencies
const { ObjectId } = require("mongodb");

var app = express();

// Use CORS middleware to allow requests from all origins
app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("static"));

app.use("/api/visiter", visiterRouter);
app.use('/api/passes', passRoutes);

app.use(express.static('./'));



// use multer package
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Images');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});



let maxSize = 10 * 1000 * 1000;
let upload = multer({
    storage: storage,
    limits: {
        fileSize: maxSize
    }
});



let storage_Product = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './Products');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
    }
});

let upload_Product = multer({
    storage: storage_Product,
    limits: {
        fileSize: maxSize
    }
});



app.post('/api/visiter_new', async (req, res) => {
    try {
      
 // Destructure fields from req.body
 const { firstname, middlename, lastname, dateofbirth, contactnumber, address, visitorType, 
    gatePassNumber, addressProofType, aadharCardNumber, vehicleLicenceNumber, vehicleNumber, 
    vehicleType, escort, rank, zone,image} = req.body;

// console.log(image)
      
        const formattedDate = new Date(); // Get current date and time
        const createdAt = formattedDate.toLocaleDateString('en-GB');

        const formData = {
            firstname,
            middlename,
            lastname,
            dateofbirth,
            contactnumber,
            address,
            visitorType,
            gatePassNumber,
            addressProofType,
            aadharCardNumber,
            vehicleLicenceNumber,
            vehicleNumber,
            vehicleType,
            escort,
            rank ,
            zone,
            image: image,
         
            createdAt:new Date(),
          
        };

        const savedUser = await MongoDB.db
            .collection(mongoConfig.collections.VISITER)
            .insertOne(formData);

        if (savedUser.insertedId) {
            res.status(200).json({
                status: true,
                message: "PRODUCTS Added successfully",
            });
        } else {
            res.status(500).json({
                status: false,
                message: "PRODUCTS Creating failed",
            });
        }
    } catch (error) {
        console.error("Error creating PRODUCTS:", error);
        res.status(500).json({
            status: false,
            message: "An error occurred while creating the PRODUCTS",
        });
    }
});

app.put('/api/visiter_new/:id', async (req, res) => {
    try {
        // Get the visitor ID from the URL parameters
        const visitorId = req.params.id;
        const visitorObjectId = new ObjectId(visitorId); 
        // Destructure fields from req.body (same as the original)
        const { firstname, middlename, lastname, dateofbirth, contactnumber, address, visitorType, 
            gatePassNumber, addressProofType, aadharCardNumber, vehicleLicenceNumber, vehicleNumber, 
            vehicleType, escort, rank, zone, image } = req.body;

        const formattedDate = new Date(); // Get current date and time
        const updatedAt = formattedDate.toLocaleDateString('en-GB'); // Update timestamp

        // Create the updated form data
        const formData = {
            firstname,
            middlename,
            lastname,
            dateofbirth,
            contactnumber,
            address,
            visitorType,
            gatePassNumber,
            addressProofType,
            aadharCardNumber,
            vehicleLicenceNumber,
            vehicleNumber,
            vehicleType,
            escort,
            rank,
            zone,
            image, // The image could be updated, ensure that it's either a new one or the same
            updatedAt:new Date(), // Timestamp for update
        };

        // Update the visitor in the database using the provided ID
        const updatedVisitor = await MongoDB.db
            .collection(mongoConfig.collections.VISITER)
            .updateOne(
                { _id: visitorObjectId }, // Find visitor by their ID
                { $set: formData } // Update fields in the existing document
            );

        // Check if the update was successful
        if (updatedVisitor.modifiedCount > 0) {
            res.status(200).json({
                status: true,
                message: "Visitor Updated successfully",
            });
        } else {
            res.status(404).json({
                status: false,
                message: "Visitor not found or no changes made",
            });
        }
    } catch (error) {
        console.error("Error updating visitor:", error);
        res.status(500).json({
            status: false,
            message: "An error occurred while updating the visitor",
        });
    }
});

// app.get('/api/visiter/filter', async (req, res) => {
//     try {
//         const { contactnumber } = req.query; // Get the contact number from the query parameters

//         if (!contactnumber) {
//             return res.status(400).json({
//                 status: false,
//                 message: "Contact number is required for filtering",
//             });
//         }

//         // Log the contact number to ensure it's a string and not an ObjectId
//         console.log('Searching for contactnumber:', contactnumber);

//         // Ensure contactnumber is a valid string before querying
//         if (typeof contactnumber !== 'string') {
//             return res.status(400).json({
//                 status: false,
//                 message: "The contact number must be a string.",
//             });
//         }

//         // Query the database to find visitors by contact number
//         const visitors = await MongoDB.db
//             .collection(mongoConfig.collections.VISITER)
//             .find({ contactnumber: contactnumber }) // Query by the contactnumber field
//             .toArray(); // Convert the result to an array

//         // Log the visitors to check if they match the query
//         console.log('Visitors found:', visitors);

//         // If no visitors are found, return a not found response
//         if (visitors.length === 0) {
//             return res.status(404).json({
//                 status: false,
//                 message: "No visitors found with the provided contact number",
//             });
//         }

//         // Return the filtered visitors
//         res.status(200).json({
//             status: true,
//             message: "Visitors retrieved successfully",
//             data: visitors,
//         });
//     } catch (error) {
//         console.error("Error fetching visitors:", error);
//         res.status(500).json({
//             status: false,
//             message: "An error occurred while retrieving visitors",
//             error: error.message, // Include the error message for debugging
//         });
//     }
// });



module.exports = app;