require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');

//Settings
app.set('port', 4000 || process.env.PORT);

//Middlewares
app.use(cors({origin: 'http://localhost:3000'}));
app.use(morgan('dev'));
app.use(express.json());

//Protección de rutas
const rutasProtegidas = express.Router(); 
rutasProtegidas.use((req, res, next) => {
    const token = req.headers['access-token'];
 
    if (token) {
      jwt.verify(token, 'top_secret', (err, decoded) => {      
        if (err) {
          return res.json({ status: 'Token inválido' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      res.json({status: 'Token no enviado'});
    }
 });



//Routes
app.use(require('./routes/student.router'));
app.use(require('./routes/habit.router'));
app.use(require('./routes/notification.router'));

//Database
require('./database');

//Starting the server
app.listen(app.get('port'), () => {
    console.log(`app corriendo en el puerto ${ app.get('port') }`);
})