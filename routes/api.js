const express = require('express')
const router = express.Router()
const yelpController = require('../controllers/yelp')
const holesController = require('../controllers/holes')
const validateToken = require('../middleware/validateToken')
const reserveController = require('../controllers/reserve')
const statController = require('../controllers/stat')
const statViewController = require('../controllers/statView')

router.get('/courses', yelpController.getYelp)

router.post('/reserve', validateToken.checkToken, reserveController.postReserve)
router.post('/holes', validateToken.checkToken, holesController.postHoles)

router.post('/stat', validateToken.checkToken, statController.postStat)
router.get('/stat/id/:id', validateToken.checkToken, statController.getStat)
router.put('/stat/id/:id', validateToken.checkToken, statController.putStat)
router.get('/stat/view', validateToken.checkToken, statViewController.getStatView)

module.exports = router