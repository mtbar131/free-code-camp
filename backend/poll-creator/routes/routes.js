const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');

const { ensureAuthenticated } = require('../helpers/auth');

require('../models/User');
require('../models/Poll');
const User = mongoose.model('users');
const Poll = mongoose.model('polls');

// Basic 
router.get('/', (req, res) => res.render('welcome'));
router.get('/login', (req, res) => res.render('login'));
router.get('/register', (req, res) => res.render('register'));
router.get('/create', ensureAuthenticated, (req,res) => res.render('create'));

// Auth
router.post('/register', (req, res) => {

    //Password validation
    let errors = [];
    if (req.body.password != req.body.password2) {
        errors.push({ text: 'Passwords do not match' });
    }

    if (req.body.password.length < 4) {
        errors.push({ text: 'Password must be at least 4 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.password2
        });
    }
    else {

        //Check if user already exists
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    req.flash('error_msg', 'That email is already registered');
                    res.redirect('/login');
                }
                else {
                    //Store user in variable
                    let newUser = new User({
                        // Ensure first letter uppercase
                        name: req.body.name.charAt(0).toUpperCase() + req.body.name.substr(1),
                        email: req.body.email,
                        password: req.body.password
                    });

                    //Hash password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;

                            //Save user and route to login
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered and can log in');
                                    res.redirect('/login');
                                })
                                .catch(err => {
                                    console.log(err);
                                    return;
                                });
                        });
                    });
                }
            });
    }
});
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/private',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});
router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are now logged out');
    res.redirect('/login');
});

// GET requiring DB
router.get('/private', ensureAuthenticated, (req, res) => {
    
    Poll.find({ owner: req.user.id })
        .then(polls => {
            res.render('private', { userName: req.user.name, polls: polls })
        });
            
});
router.get('/public', (req, res) => {
    
    Poll.find({})
        .then(polls => res.render('public', { polls: polls }));
    
});
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    Poll.findOne({ _id: req.params.id })
        .then(poll => {
            res.render('edit', {poll: poll});
        });
});
router.get('/vote/:id', (req, res) => {
    Poll.findOne({ _id: req.params.id })
        .then(poll => {
            res.render('vote', { poll: poll });
        });
});
router.get('/results/:id', (req, res) => {
    Poll.findOne({ _id: req.params.id })
        .then(poll => {
            
            
            res.render('results', { poll: poll });
    
        });
});

// Other requiring DB
router.post('/polls', ensureAuthenticated, (req, res) => {
    
    // Prep date
    let myDate = new Date();
    let myYear = myDate.getYear().toString().substr(1,2);
    let myMonth = myDate.getMonth() + 1;
    let myDay = myDate.getDate();
    let date = `${myMonth}/${myDay}/${myYear}`;
    
    let newPoll = new Poll({
        owner: req.user.id,
        title: req.body.title,
        options: {
            A: req.body.optionA,
            B: req.body.optionB,
            C: req.body.optionC,
            D: req.body.optionD
        },
        date: date
    });
    
    newPoll.save()
           .then(poll => {
               req.flash('success_msg', 'Poll added');
               res.redirect('/private');
           });
});
router.put('/polls/:id', ensureAuthenticated, (req, res) => {
    Poll.findOne({ _id: req.params.id })
        .then(poll => {
            
            poll.title = req.body.title;
            poll.options.A = req.body.optionA;
            poll.options.B = req.body.optionB;
            if (poll.options.C){
                poll.options.C = req.body.optionC;
            }
            if (poll.options.D) {
                poll.options.D = req.body.optionD;
            }
            poll.save()
                .then(poll => {
                    req.flash('success_msg', 'Poll updated successfully');
                    res.redirect('/private');
                });
        });
    
});
router.put('/vote/:id', (req, res) => {
    
    Poll.findOne({ _id: req.params.id })
        .then(poll => {
            switch(req.body.options) {
                case 'optionA':
                    poll.score.A ++;
                    poll.totalVotes ++;
                    poll.save()
                        .then(poll => {
                            req.flash('success_msg', 'Your vote has been cast');
                            res.redirect('/public');
                        });
                        break;
                case 'optionB':
                    poll.score.B ++;
                    poll.totalVotes ++;
                    poll.save()
                        .then(poll => {
                            req.flash('success_msg', 'Your vote has been successfully cast');
                            res.redirect('/public');
                        });
                        break;
                case 'optionC':
                    poll.score.C ++;
                    poll.totalVotes ++;
                    poll.save()
                        .then(poll => {
                            req.flash('success_msg', 'Your vote has been cast');
                            res.redirect('/public');
                        });
                        break;
                case 'optionD':
                    poll.score.D ++;
                    poll.totalVotes ++;
                    poll.save()
                        .then(poll => {
                            req.flash('success_msg', 'Your vote has been cast');
                            res.redirect('/public');
                        });
            }
        });
});
router.delete('/polls/:id', ensureAuthenticated, (req, res) => {
    Poll.remove({ _id: req.params.id })
        .then(() => {
            req.flash('success_msg', 'Poll removed');
            res.redirect('/private');
        });
});

module.exports = router;
