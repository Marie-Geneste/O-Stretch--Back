const express = require('express');

// on importe nos controllers
const favoriteController = require('../controllers/favoriteController');

const router = express.Router();

// récupération des stretch
// router.get('/', favoriteController.getAllFavorites);
// router.post('/:id', favoriteController.addOneFavorite);
// router.delete('/:id', favoriteController.deleteOneFavorite);


// on exporte le router 
module.exports = router;
