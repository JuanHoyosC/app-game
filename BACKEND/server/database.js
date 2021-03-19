const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    database: 'appGame',
    user: 'root',
    pass: '',
});

conn.connect((error) => {
    if(error) return ;
    console.log('conexion a la base de datos exitosa');
});

module.exports = conn