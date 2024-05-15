const { validationResult } = require("express-validator");
const saveRedis = require("../../helper/saveRedis");
const UserData = require("../../models")
const { ObjectId } = require('bson');
const { generateValidatorError } = require("../../helper/generateErrors");

async function updateUser
    (req, res) {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) throw (generateValidatorError(errors.array()));

        const { user_id, accountNumberUpdated } = req.body

        const resultUpdated = await UserData.updateOne(
            { _id: new ObjectId(user_id) },
            {
                $set: {
                    accountNumber: accountNumberUpdated
                },
            }
        );

        if(resultUpdated.matchedCount !== 1) {
            throw {
                message: "user id is failed to update"
            }
        }

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
