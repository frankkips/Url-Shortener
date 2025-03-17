const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    url: String,
    shortcode: String,
    createdAt: String,
    updatedAt: String,
    shortUrl: String
})

const UserModel = mongoose.model("urlData", UserSchema)
module.exports = UserModel