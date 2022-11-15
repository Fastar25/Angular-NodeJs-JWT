const express = require('express');
const router = express.Router();

//controller path 
const controller = require('../controller/controller')

router.get('/home', requiredToken, controller.home);

//signup routes 
router.post('/signup', requiredToken, controller.signup)

//login routes 
router.post('/login', requiredToken, controller.login)

//course route 
router.get('/tutorial', requiredToken, controller.tutorial)

function requiredToken(req, res, next) {
    let headers = req.headers["token"];
    console.log(headers)
    if (typeof headers !== undefined && headers !== "") {
        req.token = headers;
        next()
    }
    else {
        res.send({
            status: false,
            message: 'token required ...'
        })
    }
}

module.exports = router;