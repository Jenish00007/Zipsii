const express = require('express');
const router = express.Router();

// import all the routs from this folder files.
const userAuthRoutes = require('./userAuth');

router.use('/user', userAuthRoutes);


module.exports = router;