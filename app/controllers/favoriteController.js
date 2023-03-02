const { UserStretch } = require('../models');

const favoriteController = {
    getAllFavorites: async (req, res) => {
        // On récupère la liste des favoris depuis la DB à partir du model Sequelize
        const userId = req.token.sub;
        try {
            const favorites = await UserStretch.findOne({
                where: { user_id: userId }
            });
            res.status(200).json(favorites);

            // Permet de d'indique que le serveur a rencontré un problème inattendu qui l'empêche de répondre à la requête.         
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },

    addFavoriteStretch: async (req, res) => {
        try {
            const userId = req.token.sub;
            const stretchId = req.params.id

            // Vérifiez si le favori existe déjà pour cet utilisateur
            const favoriteStretch = await UserStretch.findOne({
                where: { user_id: userId, stretch_id: stretchId }
            });

            if (favoriteStretch) {
                return res.status(409).json({ message: 'Already in favorites' });
            }

            // Créez un nouveau favori pour cet utilisateur
            const newFavorite = await UserStretch.create({
                user_id: userId,
                stretch_id: stretchId
            });

            return res.status(201).json(newFavorite);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'error' });
        }
    },


    deleteFavoriteStretch: async (req, res) => {
        try {
            const userId = req.token.sub;
            const stretchId = req.params.id;

            // Vérifiez si le favori existe pour cet utilisateur
            const favoriteStretch = await UserStretch.findOne({
                where: { user_id: userId, stretch_id: stretchId }
            });

            if (!favoriteStretch) {
                return res.status(404).json({ message: 'Favorite not found' });
            }

            // Supprimez le favori pour cet utilisateur
            await favoriteStretch.destroy();

            return res.status(204).send();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error deleting favorite' });
        }
    }


};


module.exports = favoriteController;
