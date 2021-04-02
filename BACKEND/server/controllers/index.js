const conn = require('../database');
const bcrypt = require('bcrypt');
const controller = {};

controller.findUsers = (req, res) => {
    conn.query('SELECT * FROM user', (error, results, fields) => {
        if (error) throw error;
        results.forEach(data => console.log(data))
    });

    conn.end();
};

controller.findUserExist = (req, res) => {
    conn.query(`SELECT * FROM user as user WHERE UPPER(user.username) = UPPER('${ req.params.username }')`, (error, results, fields) => {
        if (error) throw error;
        res.status(200).json({usuario: req.params.username, existe:  results.length === 0 ? false : true});
    });

    conn.end();
};


controller.addUser = async (req, res) => {

    //Leer los datos enviados desde el frontend
    const { name, lastname, pass, username } = req.body;

    //Encripta la contraseña
    const passCrypt = await bcrypt.hash( pass, 10 );

    //Crea el usuario en la base de datos
    conn.query(`INSERT INTO user (name, lastname, pass, username) VALUES ('${name}', '${ lastname }', '${ passCrypt }', '${ username }')`, (  error, results, fields ) => {
        if (error) throw error;
        if(results) res.status(200).json({status: 'Se agrego un usuario'});
    });

    conn.end();
}

controller.findUser = async (req, res) => {

    const {username, pass} = req.body;
    
    conn.query(`SELECT * FROM user`,  async (error, results, fields) => {
        if (error) throw error;
        const user = results.filter(async ( data ) => data.username === username && await bcrypt.compare( pass, data.pass ));
        console.log(user)
        conn.end();
    });

    
    

    const compare = await bcrypt.compare( pass, '453' )
    console.log(compare)
};




module.exports = controller;