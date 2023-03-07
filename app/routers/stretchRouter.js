const express = require('express');

// on importe nos controllers
const stretchController = require('../controllers/stretchController');
const userMiddleware = require('../middleware/userMiddleware');

const router = express.Router();

// récupération des stretch
router.get('/',  stretchController.getAllStretches);
router.get('/:id',  stretchController.getOneStretch);

router.post("/",  userMiddleware.isUserLogged, userMiddleware.isAdmin, stretchController.createStretch);
router.patch("/:id", userMiddleware.isUserLogged, userMiddleware.isAdmin, stretchController.updateStretch)
router.delete("/:id", userMiddleware.isUserLogged, userMiddleware.isAdmin, stretchController.deleteStretch);

// on exporte le router 
module.exports = router;
