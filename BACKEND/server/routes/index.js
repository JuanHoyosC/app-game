const express = require('express');
const router = express.Router();

const controllerUser = require('../controllers/index');


router.get('/', (req, res) => controllerUser.findUser());

router.get('/:username', async (req, res) => await controllerUser.findUserExist(req, res));


module.exports = router;