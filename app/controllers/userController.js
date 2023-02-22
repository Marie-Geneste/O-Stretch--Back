const { User } = require("../models");

const emailValidator = require("email-validator");
const bcrypt = require('bcrypt');


const userController = {

    async handleSignUpFormSubmission(req, res) {
        // On destructure le body pour récupérer plus facilement toutes les valeurs dans des variables
        const {
            name,
            email,
            password,
            passwordConfirm
        } = req.body;


        // Vérification que tous les champs soient remplis
        // Dans le cas contraire, renvoie d'un message à l'utilisateur pour lui dire que les champs sont incomplets
        if(!name || !email || !password || !passwordConfirm) {
            return res.status(400).json({ errorMessage: "Veuillez remplir tous les champ" });
        }

        // Vérification de la validation du format de l'email
        if(!emailValidator.validate(email)) {
            return res.status(400).json({ errorMessage: "Format d'email non valide" });
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

        if(alreadyExistingUser) {
            return res.status(400).json({ errorMessage: `L'email ${email} est déjà utilisé` });
        }

        // Vérification du couple mdp / confirmation de mdp
        if(password !== passwordConfirm) {
            return res.status(400).json({ errorMessage: `La confirmation de mot de passe ne correspond pas au mot de passe renseigné` });
        }

        // Hash du mot de passe pour qu'il ne soit plus en clair
        const saltRounds = 10; // 10 représente le nombre de "round" de complexité pour générer le salt
        // On génère d'abord un salt qui va permettre de faire en sorte que deux mdp identiques ne donnent pas le meme hash en sortie
        const salt = await bcrypt.genSalt(saltRounds);
        // Ensuite seulement on peut hasher le mdp avec le salt généré (qui sera du coup toujours différent et UNIQUE)
        const hashedPassword = await bcrypt.hash(password, salt);

        // On stocke l'utilisateur en DB avec toutes ses infos
        await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.redirect('/login');

        } catch (error) {
            console.log(error);

            return res.status(500).render("500");
        }
},

  async handleLoginFormSubmission(req, res) {
    // On récupère  les champs du formulaire
    const { email, password } = req.body;

    // On vérifie que tous les champs du form sont remplis sinon renvois d'une erreur
    if( !email || !password ) {
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
      if(!existingUser) {
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

      // On enregistre le user dans la session (dans une première version)
      // VERSION AMELIOREE POSSIBLE: on pourrait stocker dans la session uniquement l'id du user
      // et faire un appel en DB pour récupérer les infos dont on a besoin dans un middleware dédié uniquement sur les routes qui en ont besoin
      req.session.user = {
        id: existingUser.id,
        firstname: existingUser.firstname,
        lastname: existingUser.lastname,
        email: existingUser.email,
        role: existingUser.role
      };

    
      res.redirect("/");

    } catch (error) {
      console.log(error);

      return res.status(500);
    }

// ################## LOGOUT ##################

  },

  logout(req, res) {
    // On supprime le user de la session
    req.session.user = null;
    // et on redirige vers la home
    res.redirect("/");
  }
};

module.exports = userController;
