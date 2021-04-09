const express = require('express');
const router = express.Router();
const webpush = require('../webpush');



router.post('/subscription', async (req, res) => {
    const payload = JSON.stringify({
        title: 'Hola mundo',
        message: 'Este es un mensje'
    })

    await webpush.sendNotification( req.body, payload );
})


module.exports = router