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


//Routes
app.use(require('./routes/index'));

//Starting the server
app.listen(app.get('port'), () => {
    console.log(`app corriendo en el puerto ${ app.get('port') }`);
})