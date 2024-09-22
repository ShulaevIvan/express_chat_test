const router = require('express').Router();
const User = require('../models/User');

router.get('/chat-users', async (req, res) => {
    return new Promise((resolve, reject) => {
        User.find({connected: true})
        .then((data) => {
            const names = data.map((item) => item.username ? {username: item.username}: null);
            resolve(res.json({users: names}));
        });
    })

});



module.exports = router;