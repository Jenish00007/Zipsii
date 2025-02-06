const { Parser } = require('json2csv');
const express = require("express");
const { exportDBToCSV,getAllUsers, getOneUserById, updateUser, addUser, deleteUserById,
  generatePass} = require("../services/visiter_details.service");
const multer = require('multer');
const fs = require('fs');
const path = require('path');


// Initialize the router
var router = express.Router();

// Setup multer storage for file uploads (assuming image uploads)
const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};
// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, 'backend_folder');  // Define the folder path where files will be stored
    
    // Check if the folder exists
    if (!fs.existsSync(uploadDir)) {
      // Create the folder if it doesn't exist
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    cb(null, uploadDir);  // Set the destination folder
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);  // Get the file extension
    const uniqueName = Date.now() + ext;  // Use the current timestamp to create a unique file name
    cb(null, uniqueName);  // Save the file with the unique name
  }
});

// Initialize multer with the storage configuration
const upload = multer({ storage: storage });


// Define routes
router.get('/getallvisiter', async (req, res) => {
  res.json(await getAllUsers());
});

router.get('/:userId', async (req, res) => {
  res.json(await getOneUserById(req.params.userId));
});

// router.post('/', upload.single('image'), async (req, res) => {
//   const userObject = { ...req.body, image: req.file?.path };
//   res.json(await addUser(userObject));
// });

router.post('/', upload.single('image'), async (req, res) => {
  // If an image is uploaded, store its path in the user object
  const userObject = { ...req.body, image: req.file ? req.file.path : null };

  // Call the addUser function to save the user data in the database
  const result = await addUser(userObject);
  res.json(result);  // Respond with the result
});


router.put('/:userId', upload.single('image'), async (req, res) => {
  const userId = req.params.userId;
  const updatedUser = { ...req.body, image: req.file?.path };
  res.json(await updateUser(userId, updatedUser));
});

router.delete('/:userId', async (req, res) => {
  res.json(await deleteUserById(req.params.userId));
});


router.get('/export/csv', async (req, res) => {
  try {
    const filePath = await exportDBToCSV(req.query);
    
    // Ensure the file exists before attempting to download
    if (fs.existsSync(filePath)) {
      res.download(filePath, 'users_export.csv', (err) => {
        if (err) {
          console.error('Error downloading the file:', err);
          res.status(500).send('Error downloading the file');
        }
        // Remove the file after download
        fs.unlinkSync(filePath);
      });
    } else {
      res.status(404).send('File not found');
    }
  } catch (error) {
    console.error('Error exporting data:', error.message);
    res.status(500).json({ status: false, message: 'Error exporting data' });
  }
});


router.post('/generate-pass', async (req, res) => {
  try {
      const passData = req.body;
      console.log('Pass Data received from frontend:', passData);

      // More flexible validation
      if (!passData.visitorid) {
          return res.status(400).json({
              status: false,
              message: 'Visitor ID is required'
          });
      }

      const result = await generatePass(passData);
      console.log('Generation Result:', result);

      if (result.status) {
          res.status(200).json(result);
      } else {
          res.status(400).json(result);
      }
  } catch (error) {
      console.error('Error during pass creation:', error);
      res.status(500).json({
          status: false,
          message: 'Server error during pass creation',
          error: error.message,
      });
  }
});



// Route: Get Passes by Visitor ID
router.get('/visitor/:visitorId', async (req, res) => {
  try {
    const result = await getPassesByVisitorId(req.params.visitorId);
    res.status(result.status ? 200 : 404).json(result);
  } catch (error) {
    console.error('Visitor passes retrieval error:', error);
    res.status(500).json({
      status: false,
      message: 'Server error retrieving visitor passes',
      error: error.message
    });
  }
});
// Route: Get All Passes
router.get('/passes', async (req, res) => {
  try {
    const result = await getAllPasses(req.query);
    res.status(result.status ? 200 : 404).json(result);
  } catch (error) {
    console.error('Pass retrieval error:', error);
    res.status(500).json({
      status: false,
      message: 'Server error retrieving passes',
      error: error.message
    });
  }
});



router.delete('/pass/:id', async (req, res) => {
  try {
      const result = await deletePass(req.params.id);
      res.status(result.status ? 200 : 404).json(result);
  } catch (error) {
      res.status(500).json({
          status: false,
          message: 'Server error deleting pass',
          error: error.message
      });
  }
});
router.post('/passes/search', async (req, res) => {
  try {
      const result = await searchPasses(req.body);
      res.status(result.status ? 200 : 404).json(result);
  } catch (error) {
      res.status(500).json({
          status: false,
          message: 'Server error searching passes',
          error: error.message
      });
  }
});

module.exports = router;
