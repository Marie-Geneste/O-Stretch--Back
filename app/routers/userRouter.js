const express = require('express');

// on importe nos controllers
const userController = require('../controllers/userController');


const router = express.Router();

// récupération des stretch
router.post('/signup',  userController.handleSignUpFormSubmission);
router.post('/login',  userController.handleLoginFormSubmission);


// on exporte le router 
module.exports = router;
