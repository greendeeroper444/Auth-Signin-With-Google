const express = require('express')
const router = express.Router()
const { test, signupUser, signinUser, getProfile, signoutUser } = require('../controllers/authController')
const { googleAuth, googleCallback } = require('../passport')

router.get('/', test)
router.post('/signup', signupUser)
router.post('/signin', signinUser)
router.get('/profile', getProfile)
router.post('/signout', signoutUser);
router.get("/auth/google", googleAuth);
router.get("/auth/google/callback", googleCallback);

module.exports = router