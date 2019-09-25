const express = require('express');
const router = express.Router();

const model = require('../models/index');
const Op = model.Sequelize.Op;

router.all('/', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
    next();
});
router.all('/:xxx', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT, OPTIONS");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
})
router.get('/', (req, res, next) => {
    model.Cupon.findAll()
        .then(cupones => res.json({
            ok: true,
            data: cupones
        }))
        .catch(err => res.json({
            ok: true,
            error: err
        }))
});

router.get('/:busqueda', (req, res, next) => {
    let busqueda = req.params.busqueda;
    model.Cupon.findAll({ where: { Nombre:{[Op.like]: '%' + busqueda + '%'} } })
    .then(cupones => res.json({
        ok: true,
        data: cupones
    }))
    .catch(err => res.json({
        ok: true,
        error: err
    }))
});

router.post('/add',(req,res) => {
    console.log(req.body);
    model.Cupon.create(req.body)
    .then(cupon => res.json({
        ok: true,
        data: cupon
    }))
    .catch(error => res.json({
        ok: false,
        error:error
    }));
})

module.exports = router;