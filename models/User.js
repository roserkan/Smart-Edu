const Mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = Mongoose.Schema;

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
        },
        role: {
            type: String,
            enum: ['student', 'teacher', 'admin'],
            default: 'student'
        },
        courses: [{
            type: Schema.Types.ObjectId,
            ref: 'Course'
        }]
    },
    { timestamps: true, versionKey: false }
);

UserSchema.pre('save', function (next) {
    const user = this;
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        next();
    });
});

module.exports = Mongoose.model('User', UserSchema);
