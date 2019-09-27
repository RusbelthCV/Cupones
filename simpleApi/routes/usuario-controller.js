const express = require('express');
const router = express.Router();

const sequelize = require('sequelize');
const model = require('../models/index');
const usuarioLog = model.Usuario;
const Op = model.Sequelize.Op;
const Token = model.Token;

// router.all('/', (req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
//     next();
// });
// router.all('/:xxx', (req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT, OPTIONS");
//     res.setHeader("Access-Control-Allow-Credentials", "true");
//     next();
// });

router.all('/:algo',(req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
  });

router.post('/create', (req, res) => {
    let diff;
    let now = new Date();
    now = now.getTime();
    let nacimiento = new Date(req.body.nacimiento);
    nacimiento = nacimiento.getTime();
    diff = now - nacimiento;
    // un año equivale a 31557600000 milisegundos
    /*========================================================================
        Calculos para obtener la mayoría de edad según la fecha de nacimiento
    ==========================================================================*/
    let miliToYear = 31557600000;
    let edad = diff / miliToYear;
    if (edad < 18) {

        console.log("EL USUARIO ES MENOR DE EDAD"); //Mensaje del servidor para notificar que no es mayor de edad
        res.json({
            ok: false,
            Mayor:0
        });
    }
    else {
        model.Usuario.findOne({ where: { email: req.body.email } })
            .then(item => {
                if (item) {
                    throw "Email existente";
                } else {
                    return model.Usuario.create(req.body);
                }
            })
            .then(usuario => res.json({
                ok: true,
                data: usuario
            }))
            .catch(err => res.json({
                ok: false,
                error: err,
                Mayor:1
            }));
    }
});

router.get('/:id', (req,res) => {
    let id = req.params.id;
    if(id) {
        model.Usuario.findOne({
            where: {
                _uuid: id
            }
        })
        .then(usuario => res.json({
            ok: true,
            data:usuario
        }))

    }
});


router.post('/login',(req,res) => {
    model.Usuario.findOne({where: {
        [Op.and]: [{email: req.body.email},{password: req.body.password}]
    }})
    .then(item => {
        if(item){
            return item;
        }
        else{
            throw "Valores nos válidos"
        }
    })
    .then(usuari => {
        let token = '';
        const caractersPossibles = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const longitud = 15;
        for(var i = 0; i < longitud; i++){
            token += caractersPossibles.charAt(Math.floor(Math.random() * caractersPossibles.length));
        }
        return Token.create({
            token,
            idusuari: usuari._uuid,
            nomusuari: usuari.nombre,
            admin: usuari.admin
        })
    })
    .then((token) => res.json({ok:true,data:token}))
    .catch(err => console.log(err))
})

router.delete('/logout',(req,res) => {
    
    const {token} = req.body;
    console.log("EL TOKEN RECIBIDO ES: "+{token});
    if(!token) {
        return res.status(400).json({ok: false , error: "Token no recibido!"});
    }
    else {
        Token.destroy({where: {token}})
        .then(() => res.json({ok:true}))
        .catch(error => res.json({ok: false,error: error}));
    }
});

module.exports = router;