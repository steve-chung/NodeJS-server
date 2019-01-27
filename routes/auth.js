const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const validateToken = require('../middleware/validateToken')


router.post('/register', authController.register)

router.post('/login', authController.login)

router.post('/logout', validateToken.checkToken, authController.logout)

module.exports = router