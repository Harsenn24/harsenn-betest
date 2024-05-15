const express = require('express');
const router = express.Router();

const createUser = require('../controllers/user/create');
const readUserList = require('../controllers/user/read');
const updateUser = require('../controllers/user/update');
const deleteUser = require('../controllers/user/delete');
const loginUser = require('../controllers/user/login');
const userAuth = require('../middleware/auth');
const readUserBy = require('../controllers/user/readBy');

const readByValidator = require('../middleware/validator/readByValidator');
const updateUserValidator = require('../middleware/validator/updateUserValidator');
const deleteUserValidator = require('../middleware/validator/deleteUserValidator');


router.post("/create-user", createUser)
router.post("/login-user", loginUser)
router.use(userAuth)
router.post("/read-user", readUserList)
router.post("/read-userby", readByValidator, readUserBy)
router.post("/update-user", updateUserValidator, updateUser)
router.post("/delete-user", deleteUserValidator, deleteUser)


module.exports = router