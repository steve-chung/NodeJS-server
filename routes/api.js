const express = require('express')
const router = express.Router()
const yelpController = require('../controllers/yelp')
const holesController = require('../controllers/holes')
const validateToken = require('../middleware/validateToken')
const reserveController = require('../controllers/reserve')

router.get('/courses', yelpController.getYelp)

router.post('/')

router.post('/reserve', validateToken.checkToken, reserveController.postReserve)
// router.post('/holes', validateToken.checkToken, holesController.postHoles)

// router.get('/holes', validateToken.checkToken, holesController.getHoles)

module.exports = router