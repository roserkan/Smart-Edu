const express = require('express');
const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddlewares');

const {
    createUser,
    loginUser,
    logoutUser,
    getDashboardPage,
} = require('../controllers/Auth');

router.post('/signup', createUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/dashboard', authMiddleware, getDashboardPage);

module.exports = {
    router,
};
