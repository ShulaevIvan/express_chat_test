const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('index', {user: req.user, url: '/'});
});


module.exports = router;