const express = require('express');
const createUser = require('../controllers/user/create');
const readUserList = require('../controllers/user/read');
const updateUser = require('../controllers/user/update');
const deleteUser = require('../controllers/user/delete');
const loginUser = require('../controllers/user/login');
const userAuth = require('../middleware/auth');
const readUserBy = require('../controllers/user/readBy');
const router = express.Router();

router.post("/create-user", createUser)
router.post("/login-user", loginUser)
router.use(userAuth)
router.post("/read-user", readUserList)
router.post("/read-userby", readUserBy)
router.post("/update-user", updateUser)
router.post("/delete-user", deleteUser)


module.exports = router