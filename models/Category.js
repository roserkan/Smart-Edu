const Mongoose = require('mongoose');
const slugify = require('slugify');
const Schema = Mongoose.Schema;

const CategorySchema = new Schema(
    {
        name: {
            type: String,
            unique: true,
            required: true,
        },
        slug: {
            type: String,
            unique: true,
        },
    },
    { timestamps: true, versionKey: false }
);

CategorySchema.pre('validate', function (next) {
    this.slug = slugify(this.name, {
        lower: true,
        strict: true,
    });
    next();
});

module.exports = Mongoose.model('Category', CategorySchema);
