const express = require('express')
const router = express.Router()
const authenticateUser = require("../middleware/authentication")
const testUser = require('../middleware/testUser');
const { register, verifyEmail, login, updateUser } = require('../controllers/auth')
const rateLimiter = require('express-rate-limit');
const apiLimiter = rateLimiter({
  windowMs: 60 * 1000, // 15 minutes
  max: 100000,
  message: {
    msg: 'Too many requests from this IP, please try again after 15 minutes',
  },
});
router.post('/register', register)
router.post('/verify-email', verifyEmail);
router.post('/login', login)
router.patch('/updateUser', authenticateUser, testUser, updateUser)
module.exports = router
