const db = require("../dbconnection");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

module.exports.home = (req, res) => {
    res.send('api working');

}

// signup

module.exports.signup = (req, res) => {

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    //on verifie si le email existe deja
    let emailchqry = `select email from users where email='${email}'`
    console.log();
    db.query(emailchqry, async (err, result) => {
        if (err) throw err;
        console.log(result.length, 'check email id ');
        if (result.length > 0) {
            res.send({
                message: 'email existant '
            })

        }
        else {
            //password decrypt
            decryptpwd = await bcrypt.hash(password, 10)
            console.log(decryptpwd);

            // insertion des donnees
            let insertqry = `insert into users(name,email,password) values ('${name}','${email}','${decryptpwd}')`;

            db.query(insertqry, (err, result) => {
                if (err) throw err;
                res.send({
                    statut: true,
                    message: 'enregistreement reussie '
                })
            })
            console.log('ok');


        }
    })
}

module.exports.login = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    let chmailid = `select * from users where email='${email}'`;

    db.query(chmailid, async (err, result) => {
        if (err) throw err;

        if (result.length > 0) {
            let data = {
                name: result[0].name,
                email: result[0].email
            }
            //verification du mot de passe
            let chkpwd = await bcrypt.compare(password, result[0].password)
            if (chkpwd === true) {
                let token = jwt.sign({ data }, 'privatkey')
                console.log(token);
                res.send({
                    message: 'Connexion reussie',
                    token: token
                })
            }
            else {
                res.send({
                    message: 'Email ou mot de passe incorrect'
                })
            }

        }
        else {
            res.send({
                message: 'Invalide email'
            })
        }

    })
}

//course
module.exports.tutorial = (req, res) => {

    //check verifyToken
    let chkToken = verifyToken(req.token)
    if (chkToken.status == true) {
        let tutorialqry = `select * from tutorial`;
        db.query(tutorialqry, (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                res.send({
                    status: true,
                    data: result
                })
            }
            else {
                res.send({
                    status: false,
                    message: 'data not found '
                })
            }
        })
    }
    else {
        res.send({
            status: false,
            message: 'token non valade'
        })
    }



}

//veriftokens
function verifyToken(token) {
    return jwt.verify(token, 'privatkkey', (err, result) => {
        if (err) {
            let a = { staus: false }
            return a;
        }
        else {
            let b = { staus: false }
            return b;
        }
    })
}
