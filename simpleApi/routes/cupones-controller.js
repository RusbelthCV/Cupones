const express = require('express');
const router = express.Router();

const model = require('../models/index');
const Op = model.Sequelize.Op;

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage }).single('file');

router.all('/', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
    next();
});
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
router.all('/:algo', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});
router.all('/:algo/:algo', (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS, DELETE");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});
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
    model.Cupon.findAll({ where: { Nombre: { [Op.like]: '%' + busqueda + '%' } } })
        .then(cupones => res.json({
            ok: true,
            data: cupones
        }))
        .catch(err => res.json({
            ok: true,
            error: err
        }))
});

router.post('/add', (req, res) => {
    console.log(req.body);
    model.Cupon.create(req.body)
        .then(cupon => res.json({
            ok: true,
            data: cupon
        }))
        .catch(error => res.json({
            ok: false,
            error: error
        }));
});

router.get('/miscupones/:id', (req, res) => {
    const token = req.params.id;
    if (!token) {
        return res.status(400).json({ ok: false, error: "TOKEN NO RECIBIDO!" });
    }
    else {
        model.Cupon.findAll({
            where: {
                usuario: token
            }
        })
            .then(cupones => res.json({
                ok: true,
                data: cupones
            }))
    }
});

router.get('/logueado/:id', (req, res) => {
    const token = req.params.id;
    if (!token) {
        return res.status(400).json({ ok: false, error: "TOKEN NO RECIBIDO!" });
    }
    else {
        model.Cupon.findAll({
            where: {
                usuario: {
                    [Op.notLike]: token
                }
            }
        })
            .then(cupones => res.json({
                ok: true,
                data: cupones
            }))
    }
});


router.get('/individual/:id', (req, res) => {

    let id = req.params.id;
    model.Cupon.findOne({
        where: {
            id: id
        }
    })
        .then(cupon => res.json({
            ok: true,
            data: cupon
        }))
        .catch(error => res.json({
            ok: false,
            error: error
        }));

});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    console.log(id);
    model.Cupon.destroy({
        where: {
            id: id
        }
    })
        .then(cupon => res.json({
            ok: true,
            data: cupon
        }))
        .catch(error => res.json({
            ok: false,
            error: error
        }));
})

router.put('/:id', (req, res) => {
    let id = req.params.id;
    if (id) {
        model.Cupon.findOne({
            where: {
                id: id
            }
        })
            .then(item => item.update(req.body))
            .then(item => res.json({
                ok: true,
                data: item
            }))
            .catch(error => res.json({
                ok: false,
                error: error
            }));
    }
})


router.post('/foto', (req, res, next) => {
    
    upload(req, res, function (err) {    
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        let id = req.body.idfoto;
        if (id){
            model.Cupon.findOne({ where: { id: id } })
                .then(item => {
                    item.urlfoto = req.file.filename;
                    return item.save();
                })
                .then (() => res.status(200).send(req.file));
        } else {
            return res.status(200).send(req.file);
        }

        
    });

});

module.exports = router;