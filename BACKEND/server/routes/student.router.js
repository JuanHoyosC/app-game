const express = require('express');
const router = express.Router();

const controllerUser = require('../controllers/student.controller');

router.post('/register', controllerUser.addStudent);

router.post('/login', controllerUser.findStudent);


module.exports = router;
