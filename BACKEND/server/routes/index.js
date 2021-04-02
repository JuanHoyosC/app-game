const express = require('express');
const router = express.Router();

const controllerUser = require('../controllers/index');


router.get('/', controllerUser.findUsers);

router.post('/register', controllerUser.addUser);

router.post('/login', controllerUser.findUser);

router.get('/:username', controllerUser.findUserExist);


module.exports = router;