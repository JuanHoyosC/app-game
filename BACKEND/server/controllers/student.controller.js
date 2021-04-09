const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const controller = {};
const Estudiante = require('../models/student.model');

controller.addStudent = async (req, res) => {
    try {
        //Leer los datos enviados desde el frontend
        let { username, password, nombre, apellidos, correo } = req.body;

        //Verifica que el correo no se encuentre ya tomado
        const correoFind = await Estudiante.find({correo});
        if(correoFind.length > 0) { res.status(200).json({mensaje: 'El correo ya existe', continuar: false}); return ;};

        //Verifica que el usuario no se encuentre ya tomado
        const usernameFind = await Estudiante.find({correo});
        if(usernameFind.length > 0) { res.status(200).json({mensaje: 'El usuario ya existe', continuar: false}); return ;};
        
        //Encripta la contraseña para ser guardada en la base de datos
        password = await bcrypt.hash(password, 10);

        //Crea el model estudiante
        const estudiante = new Estudiante({ username, password, nombre, apellidos, correo });

        await estudiante.save();

        res.status(200).json({ mensaje: 'Usuario guardado con exito', continuar: true });
    } catch (error) {
        res.json({ mensaje: 'Hubo un error' });
    }
}

controller.findStudent = async (req, res) => {
    try {
        const { correo, password } = req.body;

        const estudiante = await Estudiante.findOne({ correo: correo });
        if (!estudiante) { res.status(200).json({ mensaje: 'El correo no existe', continuar: false }); return; };
        const compare = await bcrypt.compare(password, estudiante.password);
        if (!compare) { res.status(200).json({ mensaje: 'La contraseña no es correcta', continuar: false }); return; };

        console.log(estudiante)
        const { _doc } = { ...estudiante };
        delete _doc.password
        //Crea un token apartir del correo y el id, el token vence en 1h
        const token = jwt.sign({ token: _doc }, 'top_secret', { expiresIn: 3600 });
        res.status(200).json({ token, continuar: true });
    } catch (error) {
        res.json({ mensaje: 'Hubo un error' });
    }
};


module.exports = controller;
