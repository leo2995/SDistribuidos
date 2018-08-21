const model = require('./ModelUsuario')
    , jwt = require('jwt-simple')
    , segredo = 'seusegredodetoken'
module.exports = function (req, res, next) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];

    if (token) {
        try {
            //1
            const decoded = jwt.decode(token, segredo);
            console.log('decodando' + decoded);

            //2
            if (decoded.exp <= Date.now()) {
                res.json(400, { error: 'Acesso expirado, faça login novamente' });
            }

            //3
            model.findOne({ _id: decoded.iss }, function (err, user) {
                if (err)
                    res.status(500).json({ message: "error ao procurar usuario do token" })
                req.user = user;
                console.log('achei usuario' + req.user)
                return next();
            });


        }

        //4
        catch (err) {
            return res.status(401).json({ message: 'Erro: Token Invalido' });
        }
    }
    else {
        res.json(401, { message: 'Token nao encontrado ou não informado' })
    }

};


//1 SE existir um token, rodamos a funçaõ jwt.decode().

//2 , usamos o resultado do jwt.decode() para verificar se o token expirou.

//3 pesquisamos no MongoDB pelo _id que veio no JWT

 //4 ficamos de olho por erros, caso aconteça, 401 neles.