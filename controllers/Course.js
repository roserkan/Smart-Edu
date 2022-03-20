const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');


const createCourse = async (req, res) => {
    try {
        const course = await Course.create({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            user: req.session.userID
        });
        req.flash('success', `${course.name} has been created successfully`)
        res.status(201).redirect('/courses')
    } catch (error) {
        req.flash('error', `Something happend!`)
        res.status(400).redirect('/courses')
    }
};


const getAllCourses = async (req, res) => {
    try {

        const categorySlug = req.query.categories;
        const query = req.query.search;
        const category = await Category.findOne({slug: categorySlug});

        let filter = {};

        if (categorySlug) {
            filter = {category:category._id}
        }

        if(query){
            filter = {name: query}
        }

        if(!query &&  !categorySlug){
            filter.name = "",
            filter.category = null
        }

        const courses = await Course.find({
            $or:[
                {name: { $regex: '.*' + filter.name + '.*', $options: 'i'}},
                {category: filter.category}
            ]
        }).sort('-createdAt').populate('user');
        const categories = await Category.find({});

        res.status(200).render('courses', {
            page_name: 'courses',
            courses,
            categories
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

const getCourse = async (req, res) => {
    try {
        const user = await User.findById(req.session.userID);
        const course = await Course.findOne({slug: req.params.slug}).populate('user');
        const categories = await Category.find({});
        
        res.status(200).render('course', {
            page_name: 'courses',
            course,
            user,
            categories
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};


const enrollCourse = async (req, res) => {
    try {
        const user = await User.findById(req.session.userID);
        await user.courses.push({_id: req.body.course_id})
        await user.save()
        res.status(200).redirect('/users/dashboard')
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

const releaseCourse = async (req, res) => {
    try {
        const user = await User.findById(req.session.userID);
        await user.courses.pull({_id: req.body.course_id})
        await user.save()
        res.status(200).redirect('/users/dashboard')
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

module.exports = {
    createCourse,
    getAllCourses,
    getCourse,
    enrollCourse,
    releaseCourse,
}
