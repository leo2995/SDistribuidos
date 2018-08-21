const express = require('express'),
app = express(),
bodyParser = require('body-Parser'),
mongoose = require('mongoose'),
jwt = require('jwt-simple');
const validarJWT = './validarJWT.js';

const db = 'mongodb://leo:leo291195@ds227332.mlab.com:27332/testeupload';

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const port = process.env.PORT || 8080;
const router = express.Router();
app.use('/api', router);

const rotas = require('./rotas')
    router.route('/usuarios')
        .get(require(validarJWT), rotas.getUsuarios)
        .post(rotas.postUsuarios);

    router.route('/login')
        .post(rotas.login);


mongoose.connect(db);
app.listen(port);

console.log('on port' + port);