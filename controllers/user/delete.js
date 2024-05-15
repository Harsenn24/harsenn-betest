const { validationResult } = require("express-validator");
const saveRedis = require("../../helper/saveRedis");
const UserData = require("../../models")
const { ObjectId } = require('bson');
const { generateValidatorError } = require("../../helper/generateErrors");

async function deleteUser
    (req, res) {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) throw (generateValidatorError(errors.array()));

        const { user_id } = req.body

        const resultDelete = await UserData.deleteOne(
            { _id: new ObjectId(user_id) },
        );

        if (resultDelete.deletedCount !== 1) {
            throw {
                message: "user is failed to delete"
            }
        }

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
