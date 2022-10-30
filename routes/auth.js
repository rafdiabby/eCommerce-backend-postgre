const prisma = require('../util/prisma_client');
const express = require('express');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const e = require('express');
const router = express.Router()

//test
router.get('/TEST', (req, res) => {
    res.send("MANTAPP")
})

//register user
router.post('/Register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const saltRounds = 10;
    var user;
            
    bcrypt.hash(password, saltRounds, async function(err, hash) {
        user = {
            username: username,
            password: hash,
            email: req.body.email
        }
        try {
            //check if user is already registered
            const exist = await prisma.user.findFirst({
                where: { username: username}
            })
    
            if(exist){
                res.send({message:"Failed to create user, username is already exist"})
            } else {
                const newUser = await prisma.user.create({
                    data : user
                })
                console.log(newUser);
                res.send({message:`Success registered account with username ${username}`})
            }
        } catch (err) {console.log(err)}
    })
})

//login user
router.post('/Login', async (req, res) => {

    
    const username = req.body.username;
    const password = req.body.password;

    var userdata;
    var password_db;
    try {
        const user = await prisma.user.findFirst({
            where: {username: username}
        });
        password_db = user.password
    } catch(err) {}

    bcrypt.compare(password, password_db, function(err, result) {
        if(result){
            const payload = {
                username : req.body.username
            }
            const token = jwt.sign(payload, process.env.SECRET_TOKEN, {expiresIn:30})
            res.send({status: "success", message : "Login success", token: token})
        } else {
            res.status(401);
            res.send({status: "failed", message : "Invalid username or password!"})
        }
    })
})

//checktoken

router.get('/Check', (req, res) => {
    try {
        var decoded = jwt.verify(req.body.token, process.env.SECRET_TOKEN)
        if(decoded.username !== req.body.username){
            res.send("username does not match!")
        } else{
            res.send("ok")
        }
    } catch (e) {
        res.send('fail')
    }
})

module.exports = router