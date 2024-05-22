const { Users } = require('../DB'); // Adjust the path according to your structure
const { Sequelize } = require('sequelize');

async function createUser(req, res) {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).send({ message: "Missing data" });
        }

        const usernameLowered = username.toLowerCase();
        const findUsernameOnDB = await Users.findOne({
            where: { username: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('username')), usernameLowered) }
        });

        if (findUsernameOnDB) {
            return res.status(200).send("The username is already taken");
        }

        const createNewUser = await Users.create({
            username, password
        });
        // const newUser = await Users.create({ username: usernameLowered, password });
        return res.status(201).json("Se creo exitosamente");
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

module.exports = createUser;
