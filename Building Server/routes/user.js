var express = require('express');
var router = express.Router();
var userService = require('../services/user');


/* GET ALL BOOKS */
router.get('/', userService.getUsers);

/* GET SINGLE User BY ID */
router.get('/:id', userService.getUser);

/* SAVE User */
router.post('/', userService.createUser);

/* AUTHENTICATE USER */
router.post('/authenticate', userService.authenticateUser);

/* DELETE User */
// router.delete('/:id', userService.deleteUser);


module.exports = router;