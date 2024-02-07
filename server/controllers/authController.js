const UserModel = require("../models/user");
const { hashPassword, comparePassword } = require('../helpers/auth')
const jwt = require('jsonwebtoken')
const passport = require('passport');

const test = (req, res) => {
    res.json('Test is working')
}

const signupUser = async(req, res) => {
    try {
        const {name, email, password} = req.body;

        //check is the name was entered
        if(!name){
            return res.json({
                error: "Name is required"
            })
        };

        //check if the password is good
        if(!password || password.length < 6){
            return res.json({
                error: "Password is required and should be at least 6 characters"
            })
        };

        //check email 
        const exist = await UserModel.findOne({email});
        if(exist){
            return res.json({
                error: 'Email is taken already'
            })
        }

        const hashedPassword = await hashPassword(password)
        //create
        const user = await UserModel.create({
            name, 
            email, 
            password: hashedPassword
        })

        return res.json(user)
    } catch (error) {
        console.log(error)
    }
}

const signinUser = async(req, res) => {
    try {
        const {email, password} = req.body;

        //check if user exist
        const user = await UserModel.findOne({email});
        if(!user){
            return res.json({
                error: 'No user exist'
            })
        }

        //check is password match
        const match = await comparePassword(password, user.password)
        if(match){
            // res.json('Password is match')
            jwt.sign({
                email: user.email, 
                id: user._id, 
                name: user.name
            }, process.env.JWT_SECRET, {}, (err, token) => {
                if(err) throw err;
                res.cookie('token', token).json(user)
            })
        }
        if(!match){
            res.json({
                error: 'Password do not match'
            })
        }
    } catch (error) {
        console.log(error)
    }
}


const getProfile = (req, res) => {
    const {token} = req.cookies;

    if(token){
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if(err){
                res.json(null);
            } else{
                res.json(user);
            }
        });
    } else if(req.isAuthenticated()){
        //ff the user is authenticated via Google authentication, send the user information
        const { id, name, email } = req.user;
        res.json({ id, name, email });
    } else{
        res.json(null);
    }
};


const signoutUser = (req, res) => {
    req.session.destroy((err) => {
      if(err){
        console.error('Error destroying session:', err);
        res.status(500).json({ message: 'Internal Server Error' });
      } else{
        res.clearCookie('token').json({ message: 'Logout successful' });
      }
    });
};


  
module.exports = {
    test,
    signupUser,
    signinUser,
    getProfile,
    signoutUser
}