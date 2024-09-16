// const express = require('express');
// const router = express.Router();
// const auth = require('../middlewares/auth');
// const UserController =  require("../controllers/UserController");

// router.get('/', auth, ActivityController.getSourceActivity);
// router.get('/', UserController.getUser);
// router.post('/signup', UserController.storeUser);


// module.exports = router;

import express from 'express';
import {
    login,
    logout,
    signup,
    verifyEmail,
	resendVerifyEmail,
    forgotPassword,
    resetPassword,
    checkAuth
} from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// Define routes with handlers
router.get('/check-auth', verifyToken, checkAuth);

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', logout);

router.post('/verify-email', verifyEmail);
router.post('/resend-verify-email', resendVerifyEmail);
router.post('/forgot-password', forgotPassword);

router.post('/reset-password/:token', resetPassword);

export default router;
