const express = require('express');

// on importe nos controllers
const userController = require('../controllers/userController');

//Controller pour les favoris
//const FavoriteStretchController = require('../controllers/FavoriteStretchController');

const router = express.Router();

// routes pour l'utilisateur
router.post('/user',  userController.handleSignUpFormSubmission);
router.get('/user/me',  userController.getUserIdFromToken, userController.getUserInfo);
router.patch('/user/me',  userController.getUserIdFromToken, userController.updateUser);
router.delete('/user/me',  userController.getUserIdFromToken, userController.deleteUser);


router.post('/login',  userController.handleLoginFormSubmission);

//Route pour les favoris 
//router.post('/favorite-stretch', FavoriteStretchController.addFavoriteStretch);

// on exporte le router 
module.exports = router;
