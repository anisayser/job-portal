const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');


//user schema
const userSchema = mongoose.Schema({
    id: {
        type: String,
        trim: true,
        unique: true,
        required: [true, "Id is required."]
    },
    email: {
        type: String,
        require: [true, "Email is required."],
        validate: [validator.isEmail, "Please enter a valid email."],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, "Password is required."],
        validate: {
            validator: (value) => {
                return validator.isStrongPassword(value, [{
                    minLength: 6,
                    minLowercase: 3,
                    minUppercase: 1,
                    minNumbers: 1,
                    minSymbols: 1
                }])
            },
            message: "Please Provie a valid password of Minimum length of 6, Minimum 3 lowercase, Minimum 1 Uppercase, Minimum 1 Number, Minimum 1 Symbols",
        }
    },
    confirmPassword: {
        type: String,
        required: [true, "Please Confirm your password."],
        validate: {
            validator: function (value) {
                return value === this.password;
            },
            message: "Password Didn't matched"
        }
    },
    role: {
        type: String,
        enum: ["candidate", "hiring-manager", "admin"],
        default: "candidate"
    },
    firstName: {
        type: String,
        trim: true,
        required: [true, "Please provide a first name."],
        minLength: [3, "First name must be at least 3 charecters."],
        maxLength: [100, "First name must be less then 101 charecters."],
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, "Please provide a last name."],
        minLength: [3, "Last name must be at least 3 charecters."],
        maxLength: [100, "Last name must be less then 101 charecters."],
    },
    contactNumber: {
        type: String,
        validate: [validator.isMobilePhone, "Please provide a valid mobile number."]
    },
    imgUrl: {
        type: String,
        validate: [validator.isURL, "Please provide a valid image url."],
    },
    status: {
        type: String,
        enum: ["active", "inactive", "blocked"],
        default: "active"
    }

}, { timestamps: true });

userSchema.pre("save", function (next) {
    const password = this.password;

    const hashedPassword = bcrypt.hashSync(password);
    this.password = hashedPassword;
    this.confirmPassword = undefined;

    next();
});




const User = mongoose.model("User", userSchema);

module.exports = User;