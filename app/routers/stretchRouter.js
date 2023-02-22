const express = require('express');

// on importe nos controllers
const stretchController = require('../controllers/stretchController');

const router = express.Router();

// récupération des stretch
router.get('/',  stretchController.getAllStretches);


// on exporte le router 
module.exports = router;
