const { validationResult } = require('express-validator');
const UserData = require('../../models');
const { generateValidatorError } = require('../../helper/generateErrors');

async function readUserBy(req, res) {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) throw (generateValidatorError(errors.array()));

        const { accountNumber, identityNumber } = req.body

        const [userBy] = await UserData.aggregate(
            [
                {
                    $match: {
                        'accountNumber': accountNumber,
                        'identityNumber': identityNumber
                    }
                },
                {
                    $project: {
                        'userName': '$userName',
                        'accountNumber': '$accountNumber',
                        'emailAddress': '$emailAddress',
                        'identityNumber': '$identityNumber',
                    }
                }
            ]
        )

        if (!userBy) {
            throw {
                message: "user id is not found"
            }
        }

        res.status(200).json(
            {
                status: true,
                data: userBy
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

module.exports = readUserBy