const path = require('path');
const fs = require('fs');
const { Parser } = require('json2csv');
const { mongoConfig } = require("../config");
const MongoDB = require("./mongodb.service");
const { ObjectId } = require('mongodb');


const getAllPasses = async (searchParams = {}, ) => {
  try {
    const { pass_no, status } = searchParams;

    // Construct dynamic query object for PASS_COLLECTION
    const query = {};  // Initialize the query object

    // Add search conditions for pass_no and status in the PASS_COLLECTION
    if (pass_no) {
      query.pass_no = { 
        $regex: pass_no, 
        $options: "i" // Case insensitive regex search for pass_no
      };
    }

    if (status) {
      query.status = status;  // Add status filter to the query
    }

    // Get the total count of passes that match the query
    const totalCount = await MongoDB.db
      .collection(mongoConfig.collections.PASS_COLLECTION)
      .countDocuments(query);



    // Fetch passes with pagination and dynamic sorting
    const passes = await MongoDB.db
      .collection(mongoConfig.collections.PASS_COLLECTION)
      .find(query)
      .toArray();

    // Extract visitorIds from the passes
    const visitorIds = passes.map(pass => pass.visitorId);

    // Convert visitorIds to ObjectId to query the VISITER collection
    const objectIds = visitorIds.map(id => ObjectId(id));

    // Fetch corresponding visitor details from the VISITER collection
    const visitors = await MongoDB.db
      .collection(mongoConfig.collections.VISITER)
      .find({ _id: { $in: objectIds } })
      .toArray();

    // Map the visitor data to the corresponding pass
    const passesWithVisitorDetails = passes.map(pass => {
      const visitor = visitors.find(visitor => visitor._id.toString() === pass.visitorId);
      return {
        ...pass,
        visitorDetails: visitor || {}  // Add visitor details or an empty object if no match
      };
    });


    return {
      status: true,
      message: "Passes retrieved successfully with visitor details",
      data: passesWithVisitorDetails,
      
    };
  } catch (error) {
    console.error('Error in getAllPassesWithVisitorDetails:', error);
    return { 
      status: false, 
      message: "Failed to retrieve passes with visitor details", 
      error: error.message 
    };
  }
};








// const getAllPasses = async (searchParams = {}, page = 1, perPage = 10) => {
//     try {
//       // Ensure searchParams and its nested objects exist
//       const { 
//         visitorDetails = {}, 
//         visiting_purpose, 
//         visiting_department, 
//         status 
//       } = searchParams;
  
//       // Construct dynamic query object
//       const query = {};
  
//       // Add search conditions for visitor details
//       if (visitorDetails.firstname) {
//         query['visitorDetails.firstname'] = { 
//           $regex: visitorDetails.firstname, 
//           $options: "i" 
//         };
//       }
  
//       if (visitorDetails.lastname) {
//         query['visitorDetails.lastname'] = { 
//           $regex: visitorDetails.lastname, 
//           $options: "i" 
//         };
//       }
  
//       // Add search conditions for other fields
//       if (visiting_purpose) {
//         query.visiting_purpose = { 
//           $regex: visiting_purpose, 
//           $options: "i" 
//         };
//       }
  
//       if (visiting_department) {
//         query.visiting_department = { 
//           $regex: visiting_department, 
//           $options: "i" 
//         };
//       }
  
//       if (status) {
//         query.status = status;
//       }
  
//       // Validate page and perPage
//       const validPage = Math.max(1, page);
//       const validPerPage = Math.min(Math.max(1, perPage), 100); // Limit max results per page
  
//       // Get the total count of passes that match the query
//       const totalCount = await MongoDB.db
//         .collection(mongoConfig.collections.PASS_COLLECTION)
//         .countDocuments(query);
  
//       // Fetch passes with pagination
//       const pass = await MongoDB.db
//         .collection(mongoConfig.collections.PASS_COLLECTION)
//         .find(query)
//         .skip((validPage - 1) * validPerPage)
//         .limit(validPerPage)
//         .toArray();
  
//       // Calculate pagination metadata
//       const totalPages = Math.ceil(totalCount / validPerPage);
  
//       return {
//         status: true,
//         message: "Passes retrieved successfully",
//         data: pass,
//         pagination: {
//           totalCount,
//           totalPages,
//           currentPage: validPage,
//           perPage: validPerPage,
//           hasNextPage: validPage < totalPages,
//           hasPrevPage: validPage > 1
//         }
//       };
//     } catch (error) {
//       console.error('Error in getAllPasses:', error);
//       return { 
//         status: false, 
//         message: "Failed to retrieve passes", 
//         error: error.message 
//       };
//     }
//   };


// Export the service functions
module.exports = {


  getAllPasses,
  
};
