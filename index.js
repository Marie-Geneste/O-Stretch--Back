// Charger les variables d'environnements
require("dotenv/config");

// Import des dépendances
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const stretchRouter = require("./app/routers/stretchRouter");
const userRouter = require("./app/routers/userRouter");

// Créer l'app
const app = express();

// On autorise les requêtes Cross-Origin, qui par défaut seraient bloquées.
app.use(cors({
    origin: "*",
}));

// On limite le nombre de requête des clients
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100000,
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);


// Body parsing middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//multer
// const multer = require("multer");
// const bodyParser = multer();

// on utlise .none() pour dire qu'on attends pas de fichier, uniquement des inputs "classiques" !
// app.use( bodyParser.none() );

// Router
app.use("/stretches", stretchRouter);
app.use(userRouter);

// Lancer l'app
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
