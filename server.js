if(process.env.NODE_ENV !== "production"){
  require('dotenv').parsed
}

const express       = require('express')
const app           = express()
const expressLayout = require('express-ejs-layouts')
const port          = process.env.PORT || 3000
const bodyParser    = require('body-parser')

const indexRoute    = require('./routes/index')
const authorRoute   = require('./routes/authors')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')

app.use(expressLayout)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended : false, limit: '10mb'}))

const mongoose      = require('mongoose')

mongoose.connect('mongodb://localhost/bookStore',{ useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to mongoose'))

app.use('/', indexRoute)
app.use('/authors', authorRoute)
app.listen(port)
