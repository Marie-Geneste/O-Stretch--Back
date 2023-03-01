const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const UserStretch = require('../models/userStretchModel');

// Route pour ajouter un nouveau favori
router.post('/user/me/stretch/:id', authMiddleware, async (req, res) => {
    try {
        const userStretch = new UserStretch({
            user_id: req.user._id,
            stretch_id: req.params.stretchId
        });

        await userStretch.save();

        res.status(201).send(userStretch);
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

// Route pour supprimer un favori
router.delete('/user/me/stretch/:id', authMiddleware, async (req, res) => {
    try {
        await UserStretch.findOneAndDelete({
            user_id: req.user._id,
            stretch_id: req.params.stretchId
        });

        res.status(204).send();
    } catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
});

module.exports = router;
