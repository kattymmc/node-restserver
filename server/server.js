const express = require('express');
const app = express();
require('./config/config');
const bodyParser = require('body-parser');

//Middlewares app.use

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.get('/usuario', (req, res) => {
    res.json('get Usuario');
});

app.post('/usuario', (req, res) => {
    let persona = req.body;
    
    if( persona.nombre === undefined ){
        res.status(400).json({
            ok: false,
            mensaje:'El nombre es necesario'
        })
    } else {
        res.json({
            persona: body
        });
    }
});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id; // el id de la url
    res.json(
        id
    );
});

app.delete('/usuario', (req, res) => {
    res.json('delete Usuario');
});

app.listen(process.env.PORT, () =>{
    console.log('Escuchando el puerto: ', process.env.PORT);
});