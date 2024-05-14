const UserData = require('../../models');

async function readUserBy(req, res) {
    try {

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