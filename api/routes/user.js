const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')
const User = require('../model/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



router.post('/register', (req, res, next) => {
    email = user.findOne({
        email: req.body.email
    });

    var MongoClient = require('mongodb').MongoClient;
    MongoClient.connect("mongodb+srv://kuljeet:Stkh%401895@cluster0.wgq90.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", function (err, db) {
        db.collection('users', function (err, collection) {
            collection.findOne()({
                email: req.body.email
            });
        });
    });
    if (email) {
        return res.status(404).json({
            msg: 'Email already registered'
        });
    }

    bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
            return res.status(500).json({
                error: err
            })
        } else {

            const user = new User({
                _id: new mongoose.Types.ObjectId,
                username: req.body.username,
                password: hash,
                phone: req.body.phone,
                email: req.body.email
            })
            user.save()
                .then(result => {
                    res.status(200).json({
                        new_user: result
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                })
        }
    })
})

router.post('/login', (req, res, next) => {
    User.find({
            username: req.body.username
        })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    msg: 'user not exist'
                })
            }
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (!result) {

                    return res.status(401).json({
                        msg: 'incorrect passsword',
                    })
                }
                if (result) {
                    const token = jwt.sign({
                            username: user[0].username,
                            email: user[0].email,
                            phone: user[0].phone
                        },
                        'this is dummy', {
                            expiresIn: "24h"
                        }
                    );
                    res.status(200).json({
                        username: user[0].username,
                        email: user[0].email,
                        phone: user[0].phone,
                        token: token
                    })
                }
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})


module.exports = router;