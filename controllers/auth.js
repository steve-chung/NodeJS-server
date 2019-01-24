const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')

router.post('/auth/register', authController.userRegister)

router.post('/auth/login', authController.userLogin)

router.post('/auth/logout', authController.userLogout)