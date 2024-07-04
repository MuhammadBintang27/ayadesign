const User = require('../Models/userModels')
const createError = require('../utils/appError')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (user) {
            return next(new createError(400, 'User already exists'))
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        const newUser = await User.create({
            ...req.body,
            password: hashedPassword
        })
        // assign JWT to user
        const token = jwt.sign({ _id: newUser._id }, "secretkey123", {
            expiresIn: '90d'
        })
        res.status(201).json({
            status: 'success',
            message: 'User created successfully',
            token,
            user:{
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }
        })
    } catch (error) {
        next(error)
    }
}


exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })

        if(!user) {
            return next(new createError('User not found', 404))
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if(!isPasswordValid) {
            return new createError('Invalid email or password', 401)
        }
        // assign JWT to user
        const token = jwt.sign({ _id: user._id }, "secretkey123", {
            expiresIn: '90d'
        })
        res.status(200).json({
            "status": "success",   
            token,
            "message": "User logged in successfully",
            user:{
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })
    } catch (error) {
        next(error)
    }
}
