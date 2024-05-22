const axios = require('axios');
const { Users } = require("../DB")

async function login(req, res) {
    const { username, password } = req.body;
    try {
        const allUsers = await Users.findAll({});
        const found = allUsers.find((element) => element.username == username);
        if (found) {
            if (found.password === password) {
                res.status(200).send({ access: true });
            } else {
                res.status(200).send({ message: "The password is not correct" });
            }
        } else {
            res.status(200).send({ message: "The user was not found" });
        }
    } catch (error) {
        console.log("error en login.js");
        res.status(500).send({ message: error.message });
    }
}

module.exports = login;