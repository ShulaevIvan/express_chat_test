const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('index', {user: false, url: '/'});
});


module.exports = router;