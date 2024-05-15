const { body } = require("express-validator");

module.exports = [
    body("user_id")
        .trim()
        .notEmpty()
        .withMessage("user_id is required"),
]
