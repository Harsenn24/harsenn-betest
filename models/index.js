const mongoose = require('mongoose');
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true
        },
        accountNumber: {
            type: Number,
            required: true,
            unique: true
        }
        ,
        emailAddress: {
            type: String,
            required: true,
            unique: true
        },
        identityNumber: {
            type: String,
            required: true,
            unique: true,
            index : -1
        },
        password: {
            type: String,
            required: true,

        },
    }
);

userSchema.index({ identityNumber: -1 })

const userData = new Schema(userSchema, { collection: "user_data" })
const UserData = mongoose.model('User_data', userData)

module.exports = UserData;
