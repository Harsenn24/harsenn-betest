const saveRedis = require("../../helper/saveRedis");
const UserData = require("../../models")
const { ObjectId } = require('bson');

async function deleteUser
    (req, res) {
    try {

        const { user_id } = req.body

        await UserData.deleteOne(
            { _id: new ObjectId(user_id) },
        );

        await saveRedis()

        res.status(200).json(
            {
                status: true,
                message: "successfully deleted"
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

module.exports = deleteUser
