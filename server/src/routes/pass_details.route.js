const { Parser } = require('json2csv');
const express = require("express");
const {getAllPasses} = require("../services/pass_details.service");
const multer = require('multer');
const fs = require('fs');

// Initialize the router
var router = express.Router();

// Setup multer storage for file uploads (assuming image uploads)
const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    cb(isValid ? null : new Error('Invalid image type'), 'public/uploads');
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.split(' ').join('-');
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  }
});

const upload = multer({ storage: storage });



// Route: Get All Passes
router.get('/getallpasses', async (req, res) => {
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



module.exports = router;
