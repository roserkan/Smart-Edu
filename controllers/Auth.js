const User = require('../models/User');
const Category = require('../models/Category');
const Courses = require('../models/Course');

const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).redirect('/login');
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            const same = await bcrypt.compare(password, user.password);

            if (same) {
                // USER SESSION
                req.session.userID = user._id;
                return res.status(200).redirect('/users/dashboard');
            }
        }
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

const logoutUser = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};

const getDashboardPage = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.session.userID }).populate('courses');
        const categories = await Category.find();
        const courses = await Courses.find({user: req.session.userID})

        res.status(200).render('dashboard', {
            page_name: 'dashboard',
            user,
            categories,
            courses
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};

module.exports = {
    createUser,
    loginUser,
    logoutUser,
    getDashboardPage,
};
