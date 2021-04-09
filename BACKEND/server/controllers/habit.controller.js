const Habit = require('../models/habit.model');
const controller = {};


controller.addHabit = async (req, res) => {
    try {
        const { titulo, descripcion, dificultad, frecuencia, id_usuario } = req.body

        const habito = new Habit(req.body);

        await habito.save();

        res.status(200).json({ mensaje: 'Habito creado', continuar: true });
    } catch (error) {
        res.status(200).json({ mensaje: 'Hubo un error', continuar: false });
    }
}


controller.deleteHabit = async (req, res) => {
    try {
        await Habit.findByIdAndRemove(req.params.id)
        res.status(200).json({ mensaje: 'Se borro el habito', continuar: true });
    } catch (error) {
        res.status(200).json({ mensaje: 'Hubo un error', continuar: false });
    }
}

controller.getHabits = async (req, res) => {

    try {
        const habitos = await Habit.find({ id_usuario: req.params.usuario });
        res.status(200).json({ habitos, continuar: true });

    } catch (error) {
        res.status(200).json({ mensaje: 'Hubo un error', continuar: false });
    }
}


module.exports = controller