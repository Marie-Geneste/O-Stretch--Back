const { Category } = require("../models");

const categoryController = {

    async getAllCategories(req, res) {
        // On récupère la liste des catégories depuis la DB à partir du model Sequelize
        try {
            const categories = await Category.findAll();
            res.status(200).json(categories);

        // Permet de d'indique que le serveur a rencontré un problème inattendu qui l'empêche de répondre à la requête.         
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },
}


module.exports = categoryController;
