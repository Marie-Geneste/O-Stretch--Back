const express = require('express');

// on importe nos controllers
const stretchController = require('../controllers/stretchController');

const router = express.Router();

// récupération des stretch
router.get('/',  stretchController.getAllStretches);

// création d'un stretch
router.post('/stretches', stretchController.getAllStretches);

// récupération d'un stretch par son id
router.get('/stretches/:id', stretchController.getStretchById);

// mise à jour d'un stretch par son id
router.put('/stretches/:id', stretchController.updateStretchById);

// suppression d'un stretch par son id
router.delete('/stretches/:id', stretchController.deleteStretchById);

// on exporte le router 
module.exports = router;
