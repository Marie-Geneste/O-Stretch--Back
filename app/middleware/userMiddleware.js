const jwt = require('jsonwebtoken');


const userMiddleware = {
    decodeToken(req, res, next) {
        //decode token

        try {
            //récupérer le token dans le header authorisation
            const authHeader = req.headers.authorization;
            const tokenRecup = authHeader && authHeader.split(' ')[1];
            if(!tokenRecup){
                next();
                return
            }
            //vérifier la validité du token et décoder son contenu pour récupérer l'id du user
            const decodedToken = jwt.verify(tokenRecup, process.env.JWT_SECRET);
            const token = decodedToken;
            req.token = token;
            next();
            //Si il y a une erreur , res.status + error
        } catch (error) {
            console.error(error);
            res.status(401).json({
                message: 'Invalid token'
            });
        }
    },


    isUserLogged(req, res, next) {
        //vérifie s'il y a un token / si je suis connecté / si il y a user.id dans le token
        //message d'erreur si token non trouvé
        const token = req.token
        if (!token) {
            return res.status(401).json({
                message: 'User is not logged'
            });
        }
        next();
    },




    //vérifier si la personne est admin req.token.role_id
    isAdmin(req,res,next) {

        if (req.token.isAdmin === 1) {
            next()
        } else {
            res.status(403).json({ message: 'Access denied' });
        }
        // const userId = req.token.sub


        // // Récupérer l'utilisateur correspondant dans la base de données
        // User.findByPk(userId)
        //     .then(user => {
        //         // Vérifier si l'utilisateur a le rôle autorisé
        //         if (user.role_id===1) {
        //             next(); // L'utilisateur est administrateur, on passe au middleware suivant
                
        // })
        // .catch(err => {
        //     console.log(err);
        //     res.status(500).json({ message: 'Server error' }); // En cas d'erreur serveur, on renvoie une erreur 500
        // });
        // }
        // Exemple d'utilisation : vérifier si l'utilisateur a le rôle 'admin'
        //checkUserRole(req.token, ['admin']);

    }
}

module.exports = userMiddleware;
