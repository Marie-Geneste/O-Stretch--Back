const express = require('express');

// on importe nos controllers
const categoryController = require('../controllers/categoryController');

const router = express.Router();

// récupération des catégories
router.get('/', categoryController.getAllCategories);

// on exporte le router 
module.exports = router;
