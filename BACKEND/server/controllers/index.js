const conn = require('../database');
const controller = {};

controller.findUser = (req, res) => {
    conn.query('SELECT * FROM user', (error, results, fields) => {
        if (error) throw error;
        results.forEach(data => console.log(data))
    });

    conn.end();
};

controller.findUserExist = async (req, res) => {
    conn.query(`SELECT * FROM user as user WHERE UPPER(user.username) = UPPER('${ req.params.username }')`, (error, results, fields) => {
        if (error) throw error;
        res.status(200).json({usuario: req.params.username, existe:  results.length === 0 ? false : true});
    });
};



module.exports = controller;