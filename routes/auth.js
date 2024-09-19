const router = require('express').Router();

router.get('/register', (req, res) => {
    res.render('registerForm', {url: 'register'});
});

router.post('/register', (req, res) => {
    const data = req.body;
    console.log(data);
    res.status(201);
    res.json({status: 'ok'});
})




module.exports = router;