const router = require('express').Router();

router.get('/', async (req, res) => {
    return res.render('index', {user: req.user, url: '/'});
});


module.exports = router;