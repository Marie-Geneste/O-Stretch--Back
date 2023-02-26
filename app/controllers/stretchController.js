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
        // création d'un nouvel étirement
        try {

            const newStretch = await Stretch.create(req.body);
            res.status(201).json(newStretch);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },
    
    async updateStretch(req, res) {
        // mise à jour de l'étirement avec l'identifiant spécifié
        try {
          const { id } = req.params;
          const stretch = await Stretch.findByPk(id);
          
          if (!stretch) {
            return res.status(404).json({ error: "Stretch not found" });
          }
          await stretch.update(req.body);
          res.status(200).json(stretch);
        } catch (error) {
          
            console.log(error);
          return res.status(500).json({ error: "Internal server error" });
        }
      },

      
    // suppression de l'étirement avec l'identifiant spécifié
    async deleteStretch(req, res) {
        
        try {
            const { id } = req.params;
            const stretch = await Stretch.findByPk(id);
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
