"use strict"

const { User } = require("../models");

const emailValidator = require("email-validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


async function hashPassword(password) {
    // Hash du mot de passe pour qu'il ne soit plus en clair
    const saltRounds = 10; // 10 représente le nombre de "round" de complexité pour générer le salt
    // On génère d'abord un salt qui va permettre de faire en sorte que deux mdp identiques ne donnent pas le meme hash en sortie
    const salt = await bcrypt.genSalt(saltRounds);
    // Ensuite seulement on peut hasher le mdp avec le salt généré (qui sera du coup toujours différent et UNIQUE)
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
}

const userController = {

    // Methode pour le formulaire d'inscription (recuperer les infos du front verifications de tous les champs du formulaire)
    // Vérification de l'email(deja utilisé), vérification du match entre le mdp/et confirmer le mdp.
    // Hash du mot de passe ( salt puis hash)
    // Stockage de l'utilisateur en base de donnée
    // Création du token
    // Gestion de la validation : ok ou alors error
    async handleSignUpFormSubmission(req, res) {
        // On destructure le body pour récupérer plus facilement toutes les valeurs dans des variables
        const {
            username,
            email,
            password,
            passwordConfirm
        } = req.body;


        // Vérification que tous les champs soient remplis
        // Dans le cas contraire, renvoie d'un message à l'utilisateur pour lui dire que les champs sont incomplets
        if (!username || !email || !password || !passwordConfirm) {
            return res.status(400).json({ errorMessage: "Veuillez remplir tous les champ" });
        }

        // Vérification de la validation du format de l'email
        if (!emailValidator.validate(email)) {
            return res.status(400).json({ errorMessage: "Format d'email non valide" });
        }

        // Vérification du couple mdp / confirmation de mdp
        if (password !== passwordConfirm) {
            return res.status(400).json({ errorMessage: `La confirmation de mot de passe ne correspond pas au mot de passe renseigné` });
        }
        // Comme à partir d'ici on contacte un service extérieur qui nous renvoie une promesse (l'appel à la DB)
        // on utilise le try / catch pour pouvoir gérer un éventuel rejet de la promesse avec une erreur
        try {
            // Vérification que l'email sur lequel l'utilisateur souhaite s'enregistrer n'est pas déjà utilisé dans la DB
            const alreadyExistingUser = await User.findOne({
                where: {
                    email
                }
            });

            if (alreadyExistingUser) {
                return res.status(400).json({ errorMessage: `L'email ${email} est déjà utilisé` });
            }

            // Vérification du couple mdp / confirmation de mdp
            if (password !== passwordConfirm) {
                return res.status(400).json({ errorMessage: `La confirmation de mot de passe ne correspond pas au mot de passe renseigné` });
            }

            const hashedPassword = await hashPassword(password);

            // On stocke l'utilisateur en DB avec toutes ses infos
            const newUser = await User.create({
                username,
                email,
                password: hashedPassword
            });

            res.status(201).json({
                user: {
                    id: newUser.id,
                    name: newUser.username,
                    email: newUser.email,
                },
            });

        } catch (error) {
            console.log(error);

            res.status(500).json({ errorMessage: "Erreur serveur" });
        }
    },

    // Methode pour le formulaire de login (recuperer les infos du front email + password)
    // Vérification email et password :
    // 1: Les 2 champs email + password remplis, si ok = continue, sinon  res.status(400) avec l'erreur.
    // 2: Verification que l'user existe dans la bdd si ok = continue, sinon res.status(400) avec l'erreur.
    // 3: Si User existe on compare le mdp envoyer dans le form avec celui haser en bdd si ok = continue, 

    async handleLoginFormSubmission(req, res) {
        // On récupère  les champs du formulaire
        const { email, password } = req.body;

        // On vérifie que tous les champs du form sont remplis sinon renvois d'une erreur
        if (!email || !password) {
            return res.status(400).json({ errorMessage: "Veuillez remplir tous les champ" });
        }

        // On véfifie que le user qui tente de se connecter existe bien en DB
        try {
            const existingUser = await User.findOne({
                where: {
                    email
                }
            });

            // Si le user n'existe pas, on renvoie un message d'erreur
            if (!existingUser) {
                return res.status(400).json({ errorMessage: "Email ou mot de passe incorrect" });
            }

            // Si il existe, on compare le mdp récupéré du form de connexion avec le hash enregistré dans la DB
            const hashedPassword = existingUser.password;

            // On utilise la méthode de bcrypt dédiée pour comparé le mdp du form avec celui qu'on a récup en DB de notre user existant, qui est censé correspondre
            const passwordValidation = await bcrypt.compare(password, hashedPassword);

            // Si le mdp est erroné, on stop tout et on envoie un message à l'utilisateur.
            if (!passwordValidation) {
                return res.status(400).json({ errorMessage: "Email ou mot de passe incorrect" });
            }

            //Utilisatation d'un token avec jwt pour enregistrer le user et l'envoyer au front
            const payload = {
                sub: existingUser.id,
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });

            // res.cookie("jwt", token, {
            //     httpOnly: true,
            //     secure: true,
            //     maxAge: 3600000,
            //     sameSite: "none",
            // });

            res.status(200).json({
                message: "Connexion réussie !",
                token
            });

        } catch (error) {
            console.log(error);

            res.status(500).json({ errorMessage: "Erreur serveur" });
        }
    },

    logout(req, res) {
        // res.clearCookie("jwt")
        // et on renvoie une réponse JSON indiquant que l'utilisateur a été déconnecté
        res.json({ message: "Utilisateur déconnecté" });
    },

    //middleware pour récupérer l'id de l'utilisateur à partir d'un token d'authentification JWT
    getUserIdFromToken(req, res, next) {
        //récupérer le token dans le header authorisation
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        //message d'erreur si token non trouvé
        if (!token) {
            return res.status(401).json({ message: 'Token missing' });
        }

        try {
            //vérifier la validité du token et décoder son contenu pour récupérer l'id du user
            const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
            const userId = decodedToken.sub;
            req.userId = userId;
            next();
            //Si il y a une erreur , res.status + error
        } catch (error) {
            res.status(401).json({ message: 'Invalid token' });
        }
    },

    //middleware qui récupère les info du user à partir de l'id précédent
    async getUserInfo(req, res) {
        const userId = req.userId;
        //trouver l'user correspondant à l'id
        const userFound = await User.findByPk(userId);
        //renvoyer le user trouvé dans la réponse json
        res.json({ userFound })
    },

    async updateUser(req, res) {
        //on destructure les infos du user
        const {  username,  biography } = req.body;

        // if (!email && !username && !password) { // Si le client veut faire un update sans préciser aucun nouveau champs, on bloque.
        //     return res.status(400).json({ error: "Invalid body. Should provide at least a 'username', 'email' or 'password' property" });
        // }
        const userId = req.userId;
        //trouver l'user correspondant à l'id
        const userToUpdate = await User.findByPk(userId);

        if (username !== undefined) { // Si il y a une nouveau pseudo
            userToUpdate.username = username;
        }

        if (biography !== undefined) { // Si il y a une nouveau pseudo
            userToUpdate.biography = biography;
        }

        await userToUpdate.save();

        // Réponse
        res.status(204).end();
    },

    async deleteUser(req, res) {
        const userId = req.userId;
        //trouver l'user correspondant à l'id
        const userToDelete = await User.findByPk(userId);

        if (!userToDelete) {
            return res.status(404).json({ error: "User not found. Please verify the provided id." });
        }

        await userToDelete.destroy();

        // Réponse
        res.status(204).end();
    }
};

module.exports = userController;




