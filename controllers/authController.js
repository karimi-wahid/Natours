import User from "../models/userModel";
import catchAsync from "../utils/catchAsync";
import jwt from "jsonwebtoken";
import AppError from "../utils/appError";

const signup = catchAsync(async (req, res) => {
    const newUser = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        passwordConfirm: req.body.passwordConfirm
    });

    const token = jwt.sign({ id: newUser._id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    )

    res.status(201).json({
        status: 'success',
        token,
        data: {
            user: newUser
        }
    })
});

const login = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if(!email || !password) {
        return next(new AppError('Please provide email and password', 400))
    }

    // 2) Check if user exists && password is correct
    const user = await User.findOne({ email }).select('+password');
    const correct = await user.correctPassword(password, user.password);

    if(!user || !correct) {
        return next(new AppError('Incorrect email or password', 401));
    }

    // 3) If everything is ok, send token to client
    const token = jwt.sign({ id: user._id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );

    res.status(200).json({
        status: 'success',
        token,
    });
});


const authControllers = {
    signup,
    login
}

export default authControllers;

