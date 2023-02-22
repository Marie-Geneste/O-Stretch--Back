// librairies
const express = require('express');
const bodyParser = require('body-parser');
const { expressjwt: jwt } = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');

// stretches data
const stretches = require('./stretches.json');

// vars
const app = express();
const port = 3001;
const jwtSecret = 'OurSuperLongRandomSecretToSignOurJWTgre5ezg4jyt5j4ui64gn56bd4sfs5qe4erg5t5yjh46yu6knsw4q';

// users data
const db = {
    users: [
        {
            id: 32,
            password: 'jennifer',
            username: 'John',
            favorites: [1],
            email: 'bouclierman@herocorp.io',
        },
        {
            id: 55,
            password: 'fructis',
            username: 'Burt',
            favorites: [1],
            email: 'acidman@herocorp.io',
        },
        
    ]
};

/* Middlewares */
// parse request body
app.use(bodyParser.json());

// cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');

    // response to preflight request
    if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    }
    else {
        next();
    }
});

// prepare authorization middleware
const authorizationMiddleware = jwt({ secret: jwtSecret, algorithms: ['HS256'] });

/* Routes */
// Page d'accueil du serveur : GET /
app.get('/', (req, res) => {
    console.log('>> GET /');
    res.sendFile( __dirname + '/index.html');
});

// Liste des stretches : GET /stretches
app.get('/stretches', (req, res) => {
    console.log('>> GET /stretches');
    res.json(stretches);
});


// Login : POST /login
app.post('/login', (req, res) => {
    console.log('>> POST /login', req.body);
    const { email, password } = req.body;

// authentication
const user = db.users.find(user => user.email === email && user.password === password);

// http response
if (user) {
    const jwtContent = { userId: user.id };
    const jwtOptions = { 
        algorithm: 'HS256', 
        expiresIn: '3h' 
        };
    console.log('<< 200', user.username);
    res.json({ 
        logged: true, 
        pseudo: user.username,
        token: jsonwebtoken.sign(jwtContent, jwtSecret, jwtOptions),
    });
}
else {
    console.log('<< 401 UNAUTHORIZED');
    res.sendStatus(401);
}
});

// Favorites recipes : GET /bookmarks
app.get('/bookmarks', authorizationMiddleware, (req, res) => {
    console.log('>> GET /bookmarks', req.user);

    const user = db.users.find(user => user.id === req.user.userId);
    console.log('<< 200');
    res.json({ 
        favorites: stretches.filter((stretch) => user.favorites.includes(stretch.id)), 
});
});

// Error middleware
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        console.log('<< 401 UNAUTHORIZED - Invalid Token');
        res.status(401).send('Invalid token');
}
});

/*
 * Server
 */
app.listen(port, () => {
  console.log(`listening on *:${port}`);
});
