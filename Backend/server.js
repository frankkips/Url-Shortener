const crypto = require('crypto')
const express = require('express')
const mongoose = require('mongoose')
const UserModel = require('./schema')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
// Connect MongoDB
mongoose.connect('mongodb://localhost:2717/user')
mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

function isValidUrl(url){
    try {
        new URL(url);
        return true;
    } catch (error) {
        return false;
    }
}

function generateShortCode(url) {
    return crypto.createHash("md5").update(url).digest("hex").substring(0, 6);
}

// Create Short URL
app.post('/shorten', async(req,res) => {
    const { url } = req.body
    // console.log(isValidUrl(url))
    if (!isValidUrl(url)){
        return res.status(400).json({error: "Invalid URL"})
    }

    const shortcode = generateShortCode(url)
    const shortUrl = `https://www.bit.ly/${shortcode}`
    const timestamp = new Date()
    const checkAlready = await UserModel.findOne({url})
    if (!checkAlready){
        UserModel.create({
            url,
            shortcode,
            shortUrl,
            createdAt:timestamp,
            updatedAt:timestamp
            
        })
        .then((newEntry) => {
            res.status(201).json(newEntry)
            // res.json({shortcode})
        })
        .catch((error) => {
            res.status(500).json({error: "Database Error"})
        }) 
    }else{
        res.status(409).json({message: "Url Already Exists"})
    }
    
})

// Retreive Original URL
app.get('/shorten/:shortcode', async(req,res) => {
    const {shortcode} = req.params
    const urlData = await UserModel.findOne({shortcode})
    const url = urlData.url
    res.status(200).json({message: url})
})

// Update Short Url
app.put('/shorten/:shortcode', async(req,res) => {
    const {shortcode} = req.params
    const {url} = req.body
    console.log(url)

    const updateCode = await UserModel.findOneAndUpdate(
        {shortcode},
        { url, updatedAt: new Date() },
        {new: true}
    )
    if (!updateCode){
        res.status(404).json({error: "Shortcode not Found"})
    }
    res.status(200).json({message: "Short URL updated"})
})

// Delete Short URL
app.delete('/shorten/:shortcode', async(req,res) => {
    const {shortcode} = req.params

    const deleteShorty = await UserModel.findOneAndDelete({shortcode})
    if (!deleteShorty){
        res.status(404).json({error: "Short Url Not found"})
    }
    res.status(204).json({message: "No Content"})
})

// Get Url Stats
app.get('/shorten/:shortcode/stats', async(req,res) => {
    const {shortcode} = req.params
    const foundData = await UserModel.findOne({shortcode})
    if (!foundData){
        res.status(404).json({error: "Shortcode not found"})
    }
    res.status(200).json({foundData})
})


app.listen(3000, () => {
    console.log("Server running on port 3000");
});