const express = require('express');
const router = express.Router();

const controllerHabit = require('../controllers/habit.controller');

router.post('/addhabit', controllerHabit.addHabit);
router.get('/gethabits/:usuario', controllerHabit.getHabits)
router.get('/deletehabit/:id', controllerHabit.deleteHabit)


module.exports = router;
