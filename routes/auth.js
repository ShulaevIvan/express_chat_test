const router = require('express').Router();
const passport = require('passport');
const User = require('../models/User');

router.get('/register', (req, res) => {
    res.render('registerForm', {url: 'register'});
});

router.get('/login', (req, res) => {
    if (req.user) return res.redirect('/');
    res.render('login', {user: req.user, url: 'login'});
});

router.get('/logout', async (req, res) => {
    try {
        await User.updateOne({ _id: req.user.id }, { connected: false })
        .then((data) => {
            req.logout((user, err) => {
                if(err) next(err);
                res.redirect('/');
            });
        })
        
    }
    catch(err) {
        res.status(500);
        console.log('err (GET) logout');
        console.log(err);
    }
});

router.get('/check-user', async (req, res) => {
    if (req.isAuthenticated()) {
        return new Promise((resolve, reject) => {
            User.findOne({_id: req.user.id})
            .then((data) => {
               resolve(res.json({status: req.isAuthenticated(), userId: data._id}))
            });
        })
    }
    return res.json({status: req.isAuthenticated()});

});

router.post('/register', async (req, res) => {
    try {
        const data = req.body;
        await registerUser(data)
        .then((data) => {
            res.status(201);
            res.json({status: 'ok'});
        })
        .catch((err) => {
            res.status(200);
            res.json({status: 'user exists'});
        })
       
    }
    catch(err) {
        res.status(500);
        console.log(err);
        console.log('err to register user POST /register');
    }
   
});

router.post('/login',  passport.authenticate('local', { failureRedirect: '/login' }),
    async (req, res) => {
        try {
            return new Promise((resolve, reject) => {
                User.updateOne({ _id: req.user.id }, { connected: true })
                .then((data) => {
                    resolve(res.json({status: 'ok', userId: data._id}))
                });
            });
        }
        catch(err) {
            res.status(500);
            console.log('login err');
            console.log(err);
        }
    }
);

const registerUser = async (registerData) => {
    return new Promise((resolve, reject) => {
        User.findOne({email: registerData.email})
        .then((userObj) => {
            if (!userObj) {
                User.create({
                    username: registerData.username,
                    email: registerData.email,
                    password: registerData.password
                })
                .then((data) => {
                    resolve(data);
                });

                return;
            }
            reject(userObj);
        });
    });
};




module.exports = router;