const path = require('path');
const fs = require('fs');
const { Parser } = require('json2csv');
const { mongoConfig } = require("../config");
const MongoDB = require("./mongodb.service");
const { ObjectId } = require('mongodb');

// Function to get all users
// const getAllUsers = async () => {
//   try {
//     return await MongoDB.db.collection(mongoConfig.collections.VISITER).find().toArray();
//   } catch (error) {
//     return { status: false, message: "Failed to find users", error: `Error: ${error.message}` };
//   }
// };

const getAllUsers = async (searchParams = {}) => {
  try {
      // Log the incoming search parameters to debug
      console.log("Search Parameters:", searchParams);

      // Create a dynamic query object based on search parameters
      const query = {};
      // Fetch the users with sorting by 'createdAt' in ascending order
      const users = await MongoDB.db.collection(mongoConfig.collections.VISITER)
          .find(query)
          // .sort({ createdAt: 1 })  // Sort by createdAt field in ascending order
          .toArray();

      return {
          status: true,
          message: "Users found",
          data: users
      };
  } catch (error) {
      console.error("Error in getAllUsers:", error);
      return {
          status: false,
          message: "Failed to find users",
          error: `Error: ${error.message}`,
          data: []
      };
  }
};

// Example usage
// const result = await getAllUsers({ firstname: 'John', pass_no: '123' }, 1, 10);

// Function to get one user by ID
const getOneUserById = async (userId) => {
  try {
    const user = await MongoDB.db.collection(mongoConfig.collections.VISITER).findOne({ _id: new ObjectId(userId) });
    return user ? { status: true, message: "User found", user } : { status: false, message: "No user found" };
  } catch (error) {
    return { status: false, message: "Failed to find user", error: `Error: ${error.message}` };
  }
};

// Function to add a new user
const addUser = async (userObject) => {
  try {
    const { insertedId } = await MongoDB.db.collection(mongoConfig.collections.VISITER).insertOne(userObject);
    return { status: true, message: "User added", userId: insertedId };
  } catch (error) {
    return { status: false, message: "Failed to add user", error: `Error: ${error.message}` };
  }
};

// Function to update an existing user
const updateUser = async (userId, updatedUser) => {
  try {
    const { modifiedCount } = await MongoDB.db.collection(mongoConfig.collections.VISITER).updateOne({ _id: new ObjectId(userId) }, { $set: updatedUser });
    return modifiedCount ? { status: true, message: "User updated" } : { status: false, message: "No user found" };
  } catch (error) {
    return { status: false, message: "Failed to update user", error: `Error: ${error.message}` };
  }
};

// Function to delete a user by ID
const deleteUserById = async (userId) => {
  try {
    const { deletedCount } = await MongoDB.db.collection(mongoConfig.collections.VISITER).deleteOne({ _id: new ObjectId(userId) });
    return deletedCount ? { status: true, message: "User deleted" } : { status: false, message: "No user found" };
  } catch (error) {
    return { status: false, message: "Failed to delete user", error: `Error: ${error.message}` };
  }
};

// Format user data with additional fields
const formatUserObject = (userData) => {
  return {
    firstname: userData.firstname,
    middlename: userData.middlename,
    lastname: userData.lastname,
    dateofbirth: userData.dateofbirth,
    contactnumber: userData.contactnumber,
    address: userData.address,
    visitorType: userData.visitorType,
    gatePassNumber: userData.gatePassNumber,
    addressProofType: userData.addressProofType,
    aadharCardNumber: userData.aadharCardNumber,
    vehicleLicenceNumber: userData.vehicleLicenceNumber,
    vehicleNumber: userData.vehicleNumber,
    vehicleType: userData.vehicleType,
    inTime: userData.inTime,
    outTime: userData.outTime,
    reasonOfVisit: userData.reasonOfVisit,
    escort: userData.escort,
    rank: userData.rank,
    zone: userData.zone,
    date: new Date(),
    companyname:userData.companyname
  };
};

// Modified functions to add and update user with additional fields
const addUserWithDetails = async (userDetails) => {
  const userObject = formatUserObject(userDetails);
  return await addUser(userObject);
};

const updateUserWithDetails = async (userId, updatedDetails) => {
  const updatedUser = formatUserObject(updatedDetails);
  return await updateUser(userId, updatedUser);
};

const searchUsers = async (searchParams) => {
  try {
    // Prepare the query
    let query = {};

    // Add search conditions with exact or partial matching
    if (searchParams.firstname) {
      query.firstname = {
        $regex: `^${searchParams.firstname}`, // Start of the string matching
        $options: "i"  // Case-insensitive
      };
    }

    // Extract pagination parameters
    const offset = parseInt(searchParams.offset) || 0;
    const limit = parseInt(searchParams.limit) || 10;

    // Get total count for pagination
    const totalCount = await MongoDB.db.collection(mongoConfig.collections.VISITER)
      .countDocuments(query);

    // Apply pagination and search
    const users = await MongoDB.db.collection(mongoConfig.collections.VISITER)
      .find(query)
      .skip(offset)
      .limit(limit)
      .toArray();

    return {
      status: true,
      message: "Users found",
      data: users,
      count: totalCount,
      offset,
      limit
    };
  } catch (error) {
    console.error('Search error:', error);
    return {
      status: false,
      message: "Failed to search users",
      error: error.message
    };
  }
};

const exportDBToCSV = async () => {
  try {
    // Use process.cwd() to get the absolute path of the project root
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Create the directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      try {
        fs.mkdirSync(uploadDir, { recursive: true });
        console.log(`Created directory: ${uploadDir}`);
      } catch (mkdirError) {
        console.error('Error creating upload directory:', mkdirError);
        throw new Error(`Failed to create upload directory: ${mkdirError.message}`);
      }
    }

    // Fetch data from the VISITER collection
    const visitors = await MongoDB.db.collection(mongoConfig.collections.VISITER)
      .find() // Fetch all records
      .toArray();

    // Fetch data from the PASS_COLLECTION
    const passes = await MongoDB.db.collection(mongoConfig.collections.PASS_COLLECTION)
      .find() // Fetch all records
      .toArray();

    // Combine the data from both collections
    const combinedData = [...visitors, ...passes];

    // Prepare CSV
    const json2csvParser = new Parser();
    const csvData = json2csvParser.parse(combinedData);

    // Generate unique filename
    const filename = `users_pass_export_${Date.now()}.csv`;
    const filePath = path.join(uploadDir, filename);

    // Write the combined data to a CSV file
    try {
      fs.writeFileSync(filePath, csvData);
      console.log(`CSV file created at: ${filePath}`);
    } catch (writeError) {
      console.error('Error writing CSV file:', writeError);
      throw new Error(`Failed to write CSV file: ${writeError.message}`);
    }

    return filePath;
  } catch (error) {
    console.error('Detailed export error:', error);
    throw error;
  }
};


const importDataFromCSV = async (csvFilePath) => {
  try {
    const client = new MongoClient(mongoConfig.uri);
    await client.connect();
    const db = client.db(mongoConfig.dbName);
    const visitorsCollection = db.collection(mongoConfig.collections.VISITER);
    const passesCollection = db.collection(mongoConfig.collections.PASS_COLLECTION);
    
    const data = [];

    // Read and parse CSV file
    fs.createReadStream(csvFilePath)
      .pipe(csvParser())  // parsing the CSV file
      .on('data', (row) => {
        data.push(row); // Push each row into the data array
      })
      .on('end', async () => {
        console.log('CSV file successfully parsed!');
        
        // Depending on the structure, decide how to segregate the data
        // If you need to separate the data between VISITER and PASS_COLLECTION, you can add logic here
        const visitorsData = data.filter(item => item.collectionType === 'VISITER');  // Example filter, adjust as needed
        const passesData = data.filter(item => item.collectionType === 'PASS_COLLECTION');  // Example filter, adjust as needed
        
        // Insert data into collections
        try {
          if (visitorsData.length > 0) {
            await visitorsCollection.insertMany(visitorsData);
            console.log(`${visitorsData.length} records inserted into VISITER collection.`);
          }

          if (passesData.length > 0) {
            await passesCollection.insertMany(passesData);
            console.log(`${passesData.length} records inserted into PASS_COLLECTION.`);
          }
        } catch (insertError) {
          console.error('Error inserting data into MongoDB:', insertError);
          throw new Error(`Failed to insert data into MongoDB: ${insertError.message}`);
        }

        // Close MongoDB connection
        await client.close();
      })
      .on('error', (err) => {
        console.error('Error reading the CSV file:', err);
        throw new Error(`Failed to read the CSV file: ${err.message}`);
      });
  } catch (error) {
    console.error('Detailed import error:', error);
    throw error;
  }
};



const generatePass = async (passData) => {
  try {
    // Check if visitorid is passed and valid
    if (!passData.visitorid || !ObjectId.isValid(passData.visitorid)) {
      throw new Error("Invalid Visitor ID");
    }

    // Convert ObjectId to string before saving
    const visitorIdString = new ObjectId(passData.visitorid).toString();

    // Generate unique pass number (combination of date and random number)
    const generatePassNumber = () => {

      const randomNumber = Math.floor(100000 + Math.random() * 900000); // Generate a 6-digit random number
      return `${randomNumber}`;
    };
    const passNo = generatePassNumber(); // Generate the pass number
    // Default values or pull from visitor data if needed
    const passDocument = {
      pass_no: passNo,  // Generated pass number
      visitorId: visitorIdString,  // Save visitorId as string
      valid_until: passData.valid_until ? new Date(passData.valid_until) : new Date(Date.now() + 24 * 60 * 60 * 1000), // Default to 24 hours from now
      visiting_purpose: passData.visiting_purpose || 'Not specified',
      whom_to_visit: passData.whom_to_visit || 'Not specified',
      visiting_department: passData.visiting_department || 'Not specified',
      created_at: new Date(),
      status: 'Active',

      // Optional: Include additional visitor details
      visitorDetails: {
        firstname: passData.firstname,
        lastname: passData.lastname,
        contactnumber: passData.contactnumber,
        visitorType: passData.visitorType
      }
    };

    const result = await MongoDB.db.collection('passCollection').insertOne(passDocument);

    if (result && result.insertedId) {
      const newPass = await MongoDB.db.collection('passCollection').findOne({ _id: result.insertedId });

      if (newPass) {
        return {
          status: true,
          message: 'Pass created successfully',
          data: newPass,
        };
      } else {
        return { status: false, message: 'Failed to retrieve the created pass' };
      }
    } else {
      return { status: false, message: 'Failed to create pass' };
    }
  } catch (error) {
    console.error('Error generating pass:', error);
    return { status: false, message: 'Error generating pass', error: error.message };
  }
};





// Export the service functions
module.exports = {

  generatePass,
  getAllUsers,
  getOneUserById,
  addUser,
  deleteUserById,
  updateUser,
  addUserWithDetails,
  updateUserWithDetails,
  searchUsers,
  exportDBToCSV
};
