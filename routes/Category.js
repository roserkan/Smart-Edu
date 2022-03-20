const express = require("express");
const router = require("express").Router();
const { createCategory } = require('../controllers/Category');

router.post("/", createCategory)


module.exports = {
    router,
}