const express = require('express');
const bookmarksController = require('../controllers/bookmarksController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

// Route pour ajouter un nouveau favori
router.post('/user/me/bookmark', authMiddleware, bookmarksController.ajouterFavori);

// Route pour supprimer un favori
router.delete('/user/me/bookmark/:id', authMiddleware, bookmarksController.supprimerFavori);

module.exports = router;
