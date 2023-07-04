const { urlencoded } = require('body-parser')
const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
// Connect to mongodb://localhost/MODEL_NAME
mongoose.connect("mongodb://localhost/PS", {useNewUrlParser : true})
const app = express()

app.use('/static' , express.static('static'))
app.use(urlencoded())

app.set('view engine' , 'pug')
app.set( 'views' ,  path.join(__dirname,'template'))

const ps5Schema = new mongoose.Schema({
    name :String,
    phone: String,
    mail: String,
    games : String
})

const PS = new mongoose.model('PS' , ps5Schema)

app.get('/',(req,res) => {
    res.status(200).render('base.pug')
})

app.get('/games',(req,res) => {
    res.status(200).render('games.pug')
})

app.get('/contact',(req,res) => {
    res.status(200).render('contact.pug')
})

app.get(' ',(req,res) => {
    res.status(200).render('404 error')
})

app.post('/contact' , (req,res)=>{
    var mydata = new PS(req.body)
    mydata.save().then(()=>{
        res.status(200).render('base.pug')
    }).catch(() =>{
        res.status(400).send(`The data isn't send`)
    })
})

app.listen(80 , ()=>{
    console.log(`The app has started at localhost`)
})