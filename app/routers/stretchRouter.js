const express = require('express');

// on importe nos controllers
const stretchController = require('../controllers/stretchController');

const router = express.Router();

// récupération des stretch
router.get('/',  stretchController.getAllStretches);
router.post("/stretches", stretchController.createStretch);
router.put("/stretches/:id", stretchController.updateStretch)
router.delete("/stretches/:id", stretchController.deleteStretch);

// on exporte le router 
module.exports = router;
