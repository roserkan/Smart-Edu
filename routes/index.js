const PageRoutes = require("./Page").router;
const CourseRoutes = require("./Course").router;
const CategoryRoutes = require("./Category").router;
const AuthRoutes = require('./Auth').router;



module.exports = (app) => {
    app.use("/", PageRoutes)
    app.use("/courses", CourseRoutes)
    app.use("/categories", CategoryRoutes)
    app.use("/users", AuthRoutes)

}