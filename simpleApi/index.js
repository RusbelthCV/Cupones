const express = require('express');
const cuponesRouter = require('./routes/cupones-controller');
const usuarioRouter = require('./routes/usuario-controller');

const body_Parser = require('body-parser');



const path = require('path');
const app = express();

app.set('port',process.env.PORT || 3000);

app.use(express.json());

app.use(body_Parser.urlencoded({extended:true}));


app.use(express.static(path.join(__dirname,'public')));

app.use('/api/cupones',cuponesRouter);

app.use('/api/usuario',usuarioRouter);

app.use('/api/usuario',usuarioRouter);

// app.use((req,res) => {
//     res.redirect("/api/cupones")
// });

app.listen(app.get('port'),() => {
    console.log("Server on port "+app.get('port'));
});