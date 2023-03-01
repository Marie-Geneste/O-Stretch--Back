// Imports generaux
const { Router } = require("express");

// Imports des differents routeurs
const stretchRouter = require("./stretchRouter");
const userRouter = require("./userRouter");


// Création du router principal
const router = Router();


// On branches les sous routeurs
router.use("/stretches", stretchRouter);
router.use("/user", userRouter);


// On exporte le routeur principal
module.exports = router;
