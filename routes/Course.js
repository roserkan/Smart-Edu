const express = require('express');
const router = require('express').Router();
const roleMiddleware = require('../middlewares/roleMiddleware');
const {
    createCourse,
    getAllCourses,
    getCourse,
    enrollCourse,
    releaseCourse,
} = require('../controllers/Course');

router.post('/', roleMiddleware(['teacher', 'admin']), createCourse);
router.get('/', getAllCourses);
router.get('/:slug', getCourse);
router.post('/enroll', enrollCourse);
router.post('/release', releaseCourse);


module.exports = {
    router,
};
