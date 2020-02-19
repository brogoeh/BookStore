const express = require('express')
const router  = express.Router()
const Author  = require('../models/author')

// ALl authors routes
router.get('/', async (req, res) => {
  let searchOptions = {}
  if(req.query.username !== '' && req.query.username != null ){
    searchOptions.username = new RegExp(req.query.username, 'i')
  }
  try {
      const authors = await Author.find(searchOptions)
      res.render("authors/index", {
        authors : authors,
        searchOptions: req.query
      })
  } catch (e) {
      res.redirect('/')
  }
})

// New authors routes
router.get('/new', (req, res) => {
  res.render("authors/new", { author: new Author() })
})

// Create authors route
router.post('/', async (req, res) => {
  const author = new Author({
    username: req.body.username
  })
  try {
    const newAuthor = await author.save()
    // res.redirect(`authors/${newAuthor.id}`)
    res.redirect(`authors`)
  } catch (e) {
    res.render('authors/new', {
      author: author,
      errorMessage: 'Error creating Author!'
    })
  }

  // author.save((err, newAuthor) => {
  //   if(err){
  //     res.render('authors/new', {
  //       author: author,
  //       errorMessage: 'Error creating Author!'
  //     })
  //   }else{
  //     // res.redirect(`authors/${newAuthor.id}`)
  //     res.redirect(`authors`)
  //   }
  // })
})


module.exports = router
