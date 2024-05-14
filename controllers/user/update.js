const saveRedis = require("../../helper/saveRedis");
const UserData = require("../../models")
const { ObjectId } = require('bson');

async function updateUser
    (req, res) {
    try {

        const { user_id, accountNumberUpdated } = req.body

        await UserData.updateOne(
            { _id: new ObjectId(user_id) },
            {
                $set: {
                    accountNumber: accountNumberUpdated
                },
            }
        );

        await saveRedis()

        res.status(200).json(
            {
                status: true,
                message: "successfully updated"
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

module.exports = updateUser
