if(process.env.NODE_ENV !== "production"){
  require('dotenv').parsed
}

const express       = require('express')
const app           = express()
const expressLayout = require('express-ejs-layouts')
const port          = process.env.PORT || 3000

const indexRoute    = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressLayout)
app.use(express.static('public'))

const mongoose      = require('mongoose')

mongoose.connect('mongodb://localhost/bookStore',{ useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to mongoose'))

app.use('/', indexRoute)
app.listen(port)
