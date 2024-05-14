const { ObjectId } = require("bson")
const { verifyToken } = require("../helper/bcrypt")
const UserData = require("../models")

async function userAuth(req, res, next) {
    try {
        if (!req.headers['access_token']) {
            throw {
                message: "access token is not found"
            }
        }

        const access_token = req.headers['access_token']

        const jwtContent = verifyToken(access_token)

        const [findUser] = await UserData.aggregate(
            [
                {
                    $match : {
                        'userName' : jwtContent.userName,
                        '_id' : new ObjectId(jwtContent.user_id)
                    }
                },
                {
                    $project : {
                        'userName' : '$userName',
                        'accountNumber' : '$accountNumber'
                    }
                }
            ]
        )

        if(!findUser) {
            throw {
                message : "user is not registered"
            }
        }

        next()
    } catch (error) {
        console.log(error.message, "error from user auth")
        res.status(400).json(
            {
                status: false,
                message: error.message
            }
        )
    }
}

module.exports = userAuth