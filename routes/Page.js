const express = require('express');
const router = require('express').Router();
const redirectMiddleware = require('../middlewares/redirectMiddleware');
const {
    getIndexPage,
    getAboutPage,
    getRegisterPage,
    getLoginPage,
    getContactPage,
    sendEmail,
} = require('../controllers/Page');

router.get('/', getIndexPage);
router.get('/about', getAboutPage);
router.get('/contact', getContactPage);
router.post('/contact', sendEmail);
router.get('/register', redirectMiddleware, getRegisterPage);
router.get('/login', redirectMiddleware, getLoginPage);

module.exports = {
    router,
};
