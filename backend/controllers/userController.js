const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/userModel')

const registerUser = asyncHandler(async (req, res) => {
    const{name,email,password} = req.body

    if(!name||!email||!password){
        res.status(400)
        throw new Error('Please Add the feilds')
    }
    const userExists = await User.findOne({email})

    if(userExists){
        res.status(400)
        throw new Error('USer already exsists')
    }

    //hash

    const salt = await bcrypt.genSalt(10)
    const hasdedPassword = await bcrypt.hash(password,salt)


    //Create user
    const user = await User.create({
        name,
        email,
        password:hasdedPassword
    })

    if(user){
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email

        })
    }else{
        res.status(400)
        throw new Error("invalid")
    }
  res.json({ message: 'User registered successfully' });
});

const loginUser = asyncHandler(async (req, res) => {
  res.json({ message: 'login user' });
});

const getMe = asyncHandler(async (req, res) => {
  res.json({ message: 'User data' });
});

module.exports = {
  registerUser,
  loginUser,
  getMe,
};