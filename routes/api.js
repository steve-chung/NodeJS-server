const express = require('express')
const router = express.Router()
const yelpController = require('../controllers/yelp')


router.get('/courses', yelpController.getYelp)



module.exports = router