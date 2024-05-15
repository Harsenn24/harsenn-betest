const { hashPassword } = require("../../helper/bcrypt");
const saveRedis = require("../../helper/saveRedis")
const UserData = require("../../models")

async function createUser(req, res) {
    try {
        
        req.body.password = hashPassword(req.body.password)

        const newUser = new UserData(req.body)

        await newUser.save()

        await saveRedis()

        res.status(200).json(
            {
                status: true,
                message: "success insert data"
            }
        )

    } catch (error) {
        console.log(error.message)
        res.status(400).json(
            {
                status: false,
                message: error.message
            }
        )
    }
}

module.exports = createUser