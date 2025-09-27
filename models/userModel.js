import mongoose from 'mongoose';
import validator from 'validator';


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide your name"],   
    },
    email: {
        type: String,
        required: [true, "Please provide your email"],
        unique: true,
        lowercase: true,
        validator: [validator.isEmail, "Please provide a valid email"]
    },
    photo: String,
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minLength: 8,
    },
    confirmPassword: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (el) {
                return el === this.password;
            },
            message: "Passwords are not the same!"
        }
    }
});

const User = mongoose.model('User', userSchema);

export default User;