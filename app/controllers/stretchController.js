const { Stretch } = require("../models");

const stretchController = {

    //Récuprer tous les étirements.
    async getAllStretches(req, res) {

        // On récupère la liste des étirements depuis la DB à partir du model Sequelize
        try {
            const stretches = await Stretch.findAll();
            res.status(200).json(stretches);

            // Permet d'intercepter les potentielles erreurs lors de la récupération des étirements      
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },

    //Middleware pour la création d'un étirement.
    async createStretch(req, res) {
        try {
            const { title, description_content, main_image, description_image } = req.body;
            const newStretch = await Stretch.create({ title, description_content, main_image, description_image });
            res.status(201).json(newStretch);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },

    // Mise à jour de l'étirement avec l'identifiant spécifié
    async updateStretch(req, res) {

        const { title, description_content, main_image, description_image } = req.body;

        // Si aucun champs n'est modifié,
        if (!title && !description_content && !main_image && !description_image) {
            return res.status(400).json({ error: "Invalid body. Should provide at least a 'username', 'email' or 'password' property" });
        }

        const stretchId = req.userId;
        //trouver l'user correspondant à l'id
        const stretchToUpdate = await Stretch.findByPk(stretchId);

        if (title !== undefined) { // Si il y a un nouveau mail
            stretchToUpdate.title = title;
        }

        if (description_content !== undefined) { // Si il y a une nouveau pseudo
            stretchToUpdate.description_content = description_content;
        }

        if (main_image !== undefined) { // Si il y a une nouveau pseudo
            stretchToUpdate.main_image = main_image;
        }

        if (description_image !== undefined) { // Si il y a une nouveau pseudo
            stretchToUpdate.description_image = description_image;
        }


        await stretchToUpdate.save();

            // Réponse
            res.status(204).end();
        },


    // suppression de l'étirement avec l'identifiant spécifié
    async deleteStretch(req, res) {

            try {
                const stretchId = req.params.id;
                const stretch = await Stretch.findByPk(stretchId);
                if (!stretch) {
                    return res.status(404).json({ error: "Stretch not found" });
                }
                await stretch.destroy();
                res.status(204).end();
            } catch (error) {
                console.log(error);
                return res.status(500).json({ error: "Internal server error" });
            }
        },

  };




    module.exports = stretchController;
