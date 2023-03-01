const express = require('express');

// on importe nos controllers
const userController = require('../controllers/userController');

//Controller pour les favoris
//const FavoriteStretchController = require('../controllers/FavoriteStretchController');

const router = express.Router();

// routes pour l'utilisateur
router.post('/',  userController.handleSignUpFormSubmission);
router.get('/me',  userController.getUserIdFromToken, userController.getUserInfo);
router.patch('/me',  userController.getUserIdFromToken, userController.updateUser);
router.delete('/me',  userController.getUserIdFromToken, userController.deleteUser);

router.post('/login',  userController.handleLoginFormSubmission);

//Route pour les favoris 
//router.post('/favorite-stretch', FavoriteStretchController.addFavoriteStretch);

// on exporte le router 
module.exports = router;
