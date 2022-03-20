const Mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = Mongoose.Schema;

const CourseSchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        slug: {
            type: String,
            unique: true,
        },
        category:{
            type: Schema.Types.ObjectId,
            ref: 'Category'
        },
        user:{
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
    },
    { timestamps: true, versionKey: false }
);

CourseSchema.pre('validate', function (next) {
    this.slug = slugify(this.name, {
        lower: true,
        strict: true,
    });
    next();
});

module.exports = Mongoose.model('Course', CourseSchema);
