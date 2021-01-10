const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');

const jwt = require('jsonwebtoken');

const app = express();

app.post('/login', (req, res) => {

    let body = req.body;

    Usuario.findOne({email: body.email}, (err, usuarioDB) => {
        if(err){
            // Error del servidor
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if( !usuarioDB ){
            // Datos incorrectos
            return res.status(400).json({
                ok: false,
                err: {
                    message: '(Usuario) o contraseña incorrectos'
                }
            });
        }
        // Comparar la contraseña escrita con la contraseña almacenada
        if(!bcrypt.compareSync(body.password, usuarioDB.password)){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario o (contraseña) incorrectos'
                }
            });
        }

        let token = jwt.sign({
            usuario: usuarioDB
        }, process.env.SEED ,{expiresIn: process.env.CADUCIDAD_TOKEN});

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        });

    });

});

module.exports = app;