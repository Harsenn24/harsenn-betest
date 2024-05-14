const redisClient = require('../../config/redis');

async function readUserList(req, res) {
    try {

        const getDataRedis = await redisClient.get('user')

        if (getDataRedis) {
            res.status(200).json(
                {
                    status: true,
                    data: JSON.parse(getDataRedis)
                }
            )
        } else {

            res.status(200).json(
                {
                    status: true,
                    data: []
                }
            )
        }


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

module.exports = readUserList