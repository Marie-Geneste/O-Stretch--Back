const express = require('express');

// on importe nos controllers
const userController = require('../controllers/userController');
const userMiddleware = require('../middleware/userMiddleware');

//Controller pour les favoris
//const FavoriteStretchController = require('../controllers/FavoriteStretchController');

const router = express.Router();

// routes pour l'utilisateur
router.post('/user',  userController.handleSignUpFormSubmission);
router.get('/user/me',  userMiddleware.isUserLogged, userController.getUserInfo);
router.patch('/user/me',  userMiddleware.isUserLogged, userController.updateUser);
router.delete('/user/me',  userMiddleware.isUserLogged, userController.deleteUser);


router.post('/login',  userController.handleLoginFormSubmission);

//Route pour les favoris 
//router.post('/favorite-stretch', FavoriteStretchController.addFavoriteStretch);

// on exporte le router 
module.exports = router;
