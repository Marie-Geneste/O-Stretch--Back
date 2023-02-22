const { Stretch } = require("../models");

const stretchController = {
    async getAllStretches(req, res) {

    // On récupère la liste des étirements depuis la DB à partir du model Sequelize
        try {
            const stretches = await Stretch.findAll();
            res.status(200).json(stretches);

        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
};

module.exports = stretchController;
