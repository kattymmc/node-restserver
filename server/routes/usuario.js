const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');

const app = express();

app.get('/usuario', (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);
    let limite = req.query.limite || 5;
    limite = Number(limite);
    
    Usuario.find({estado: true}, 'nombre email')
            .skip(desde)
            .limit(limite)
            .exec((err,usuarios) => {
                if(err){
                    return res.status(400).json({
                        ok:false,
                        err
                    });
                }

                Usuario.countDocuments({estado: true},(err, conteo) => {
                    res.json({
                        ok: true,
                        usuarios,
                        cantidad: conteo
                    })
                })
                
            })
});

app.post('/usuario', (req, res) => {
    let persona = req.body;

    let usuario = new Usuario({
        nombre: persona.nombre,
        email: persona.email,
        password: bcrypt.hashSync(persona.password, 10),
        role: persona.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        });
    });

});

app.put('/usuario/:id', (req, res) => {
    let id = req.params.id; // el id de la url
    let body = _.pick(req.body, ['nombre','email','img','role','estado']); 
    
    Usuario.findByIdAndUpdate(id, body, {new: true, 
                                         runValidators: true,
                                         context: 'query'},
                                         (err, usuarioDB) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuario: usuarioDB
        })
    })
});

app.delete('/usuario/:id', (req, res) => {
    let id = req.params.id;
/*     Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        };
        if(!usuarioBorrado){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }
        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    }) */

    let cambiaEstado = {
        estado: false
    }

    Usuario.findByIdAndUpdate(id, cambiaEstado, {new: true}, (err,usuarioBorrado) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        };
        if(!usuarioBorrado){
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }
        res.json({
            ok: true,
            usuario: usuarioBorrado
        })
    })
});

module.exports = app;