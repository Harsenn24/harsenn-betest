const { ObjectId } = require("bson")
const UserData = require("../models")
const redisClient = require('../config/redis');

async function saveRedis() {
    try {
        const listUser = await UserData.aggregate(
            [
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

        await redisClient.setEx('user', 600, JSON.stringify(listUser))
    } catch (error) {
        console.log(error.message)
    }
}

module.exports = saveRedis