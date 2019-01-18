const express = require('express')
const router = express.Router()
const yelpController = require('../controllers/yelp')

router.get('/api/courses', yelpController.getYelp)


module.exports = router