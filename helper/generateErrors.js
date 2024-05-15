module.exports = {
    generateValidatorError: (errorObj) => {
        let msgError
        errorObj.reduce(function (res, value) {
            if (value) {
                msgError = value.msg
            }
        }, {});
        return { message: msgError }
    },

};
