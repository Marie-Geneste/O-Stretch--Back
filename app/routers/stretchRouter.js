const express = require('express');

// on importe nos controllers
const stretchController = require('../controllers/stretchController');

const router = express.Router();

// récupération des stretch
router.get('/',  stretchController.getAllStretches);
router.post("/", stretchController.createStretch);
router.put("/:id", stretchController.updateStretch)
router.delete("/:id", stretchController.deleteStretch);

// on exporte le router 
module.exports = router;
