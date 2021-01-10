const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('./config/config');
const bodyParser = require('body-parser');

//Middlewares app.use

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

// Configuración global de rutas
app.use(require('./routes/index'));


mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(process.env.URLDB,
{ useFindAndModify: false },
(err, res) => {
    if (err) throw err;
    console.log('Base de datos CONNECTED');
})

app.listen(process.env.PORT, () =>{
    console.log('Escuchando el puerto: ', process.env.PORT);
});