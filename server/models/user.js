const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    googleId: String,
    name: String,
    email:{
        type: String,
        unique: true
    },
    password: String,
    image: String
})

//another method
// const userSchema = new mongoose.Schema({
//     name:String,
//     email: {
//         type: String,
//         unique: true
//     },
//     password: String
// })

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;