const { Stretch } = require("../models");
const UserStretch = require("../models/UserStretch");


const favoriteController = {
    getAllFavorites: async (req, res) => {
        const userId = req.token.sub;
        try {
            const favorites = await UserStretch.findAll({
                where: { user_id: userId }
            });
            const favoriteTable = favorites.map(favori => favori.stretch_id);
            const promises = favoriteTable.map(stretchFavorite => Stretch.findByPk(stretchFavorite));
            const favoritesList = await Promise.all(promises);
            res.status(200).json(favoritesList);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    },
    

    addOneFavorite: async (req, res) => {
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


    deleteOneFavorite: async (req, res) => {
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

            return res.status(204).end();
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error deleting favorite' });
        }
    }


};


module.exports = favoriteController;
