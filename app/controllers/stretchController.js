const { Stretch } = require("../models");

const stretchController = {

    //Récuprer tous les étirements.
    async getAllStretches(req, res) {

        // On récupère la liste des étirements depuis la DB à partir du model Sequelize
        try {
            const stretches = await Stretch.findAll();
            //utilisation du .map pour mettre que les infos utilisés côté front
            const filtredStretches = stretches.map(etirement => {
                return {
                    title: etirement.title,
                    main_image: etirement.main_image,
                    categorie_id: etirement.category_id
                };
            });
            res.status(200).json(filtredStretches);

        // Permet de d'indique que le serveur a rencontré un problème inattendu qui l'empêche de répondre à la requête.         
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },

    async getOneStretch(req, res) {
        
        // On récupère un seul étirement dans la base de données
        try {
            const stretchId = req.params.id;
            //trouver l'user correspondant à l'id
            const stretch = await Stretch.findByPk(stretchId);
            res.status(200).json(stretch);

        // Permet de d'indique que le serveur a rencontré un problème inattendu qui l'empêche de répondre à la requête.         
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },


    //Middleware pour la création d'un étirement.
    async createStretch(req, res) {
        try {
            const {
                title,
                description_content, 
                main_image, 
                description_image,
                category_id,
            } = req.body;

            const newStretch = await Stretch.create({ 
                title,
                description_content, 
                main_image, 
                description_image,
                category_id
            }); 
            
            res.status(201).json({
                stretch: {
                    id: newStretch.id,
                    title: newStretch.title,
                    description_content: newStretch.description_content,
                    main_image: newStretch.main_image,
                    description_image: newStretch.description_image,
                    category_id: newStretch.category_id
                },
            });

        // Permet de d'indique que le serveur a rencontré un problème inattendu qui l'empêche de répondre à la requête. 
        } catch (error) {
            console.log(error);
            return res.status(500).json({ errorMessage: "Erreur serveur" });
        }
    },

    // Mise à jour de l'étirement avec l'identifiant spécifié
    async updateStretch(req, res) {

        const { title, description_content, main_image, description_image, category_id } = req.body;

        // Si aucun champs n'est modifié,
        if (!title && !description_content && !main_image && !description_image && !category_id) {
            return res.status(400).json({ error: "Invalid body. Should provide at least a 'title', 'description_content', 'main_image', 'description_image' or 'category_id' property" });
        }

        const stretchId = req.params.id;
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

        if (category_id !== undefined) { // Si il y a une nouveau pseudo
            stretchToUpdate.category_id = category_id;
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
