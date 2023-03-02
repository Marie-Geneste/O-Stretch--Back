const {UserStretch} = require('../models');

const favorites = {

    addFavoriteStretch: async (req, res) => {
        try {
            const { userId, stretchId } = req.body;

            // Vérifiez si le favori existe déjà pour cet utilisateur
            const favoriteStretch = await UserStretch.findOne({
                where: { user_id: userId, stretch_id: stretchId }
            });

            if (favoriteStretch) {
                return res.status(409).send({ message: 'Already in favorites' });
            }

            // Créez un nouveau favori pour cet utilisateur
            const newFavorite = await UserStretch.create({
                user_id: userId,
                stretch_id: stretchId
            });

            return res.status(201).send(newFavorite);
        } catch (error) {
            console.error(error);
            return res.status(500).send({ message: 'error' });
        }
    }
};


module.exports = favorites;