const express = require('express');
const router = express.Router();

router.use('/', require('./swaggerRoute'));

router.get('/', (req, res) => {
    //#swagger.tags=['Hello World']
    res.send('Hello World');
  });

router.use('/contacts', require('./contacts'));

module.exports = router;