const express = require('express');

// on importe nos controllers
const userController = require('../controllers/userController');

const router = express.Router();

// routes pour l'utilisateur
router.get('/user/me',  userController.getUserIdFromToken, userController.getUserInfo);
router.patch('/user/me',  userController.getUserIdFromToken, userController.updateUser);
router.delete('/user/me',  userController.getUserIdFromToken, userController.deleteUser);
router.post('/user',  userController.handleSignUpFormSubmission);
router.post('/login',  userController.handleLoginFormSubmission);


// on exporte le router 
module.exports = router;
