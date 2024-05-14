const { checkPass, createToken } = require("../../helper/bcrypt")
const UserData = require("../../models")
const { ObjectId } = require('mongodb');

async function loginUser(req, res) {
    try {
        const { userName, password } = req.body

        const [findUser] = await UserData.aggregate(
            [
                {
                    $match: {
                        'userName': userName
                    }
                },
                {
                    $project: {
                        'password': '$password',
                    }
                }
            ]
        )

        if (!findUser) {
            throw {
                message: "userName or password is incorrect"
            }
        }

        const getPass = findUser.password

        const checkPassword = checkPass(password, getPass)

        if (!checkPassword) {
            throw {
                message: "userName or password is incorrect"
            }
        }

        const payLoadJwt = {
            user_id: new ObjectId(findUser._id).toString(),
            userName
        }

        const token = createToken(payLoadJwt)

        res.status(200).json(
            {
                status : true,
                token
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

module.exports = loginUser