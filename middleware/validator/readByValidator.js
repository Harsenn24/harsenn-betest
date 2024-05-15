const { body } = require("express-validator");

module.exports = [
    body("accountNumber")
        .trim()
        .notEmpty()
        .withMessage("accountNumber is required"),
    body("identityNumber")
        .trim()
        .notEmpty()
        .withMessage("identityNumber is required"),
]
