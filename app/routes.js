// Core dependencies
const fs = require('fs')
const path = require('path')

// NPM dependencies
const express = require('express')
const marked = require('marked')
const router = express.Router()

// Local dependencies
const utils = require('../lib/utils.js')

// Page routes

// Docs index
router.get('/', function (req, res) {
  res.render('index')
})

router.get('/install', function (req, res) {
  res.render('install')
})

// Pages in install folder are markdown
router.get('/install/:page', function (req, res) {
  // If the link already has .md on the end (for GitHub docs)
  // remove this when we render the page
  if (req.params.page.slice(-3).toLowerCase() === '.md') {
    req.params.page = req.params.page.slice(0, -3)
  }
  redirectMarkdown(req.params.page, res)
  var doc = fs.readFileSync(path.join(__dirname, '/documentation/install/', req.params.page + '.md'), 'utf8')
  var html = marked(doc)
  res.render('install_template', { 'document': html })
})

// Redirect to the zip of the latest release of the Prototype Kit on GitHub
router.get('/download', function (req, res) {
  var url = utils.getLatestRelease()
  res.redirect(url)
})

// Examples - examples post here
router.post('/tutorials-and-examples', function (req, res) {
  res.redirect('tutorials-and-examples')
})

// Example routes

// Passing data into a page
router.get('/examples/template-data', function (req, res) {
  res.render('examples/template-data', { 'name': 'Foo' })
})

// Branching
// URL must match 'action' in <form> tag in page
router.post('/name/of/url/in/page', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let name = req.session.data['name']

  if (name === 'value') {
    res.redirect('/name/of/url/you/might/go/to')
  }
   else {
    res.redirect('/name/of/url/in/page')
  }
})

// WHAT RELATIONSHIP - LEGAL ADVISORS GO TO LEGAL RESULT
router.post('/relationship', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let who_are_you = req.session.data['who_are_you']

  if (who_are_you === 'me') {
    res.redirect('/enquirer_details.html')
  }
   else {
    res.redirect('/relationship')
  }
})


// SELECT A SERVICE ROUTING
router.post('/criteria.html', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let select_a_service = req.session.data['select_a_service']

  if (select_a_service === 'reunion') {
    res.redirect('/result_familyreunion.html')
  } else if (select_a_service === 'send_a_message') {
      res.redirect('/result_sendamessage.html')
  } else {
    res.redirect('/criteria.html')
  }
})

// COUNTRY NOT SURE
router.post('/risks.html', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let country = req.session.data['country']

  if (country === 'not_sure') {
    res.redirect('/risks.html')
  } else {
    res.redirect('/risks.html')
  }
})

// CRITERIA
router.post('/whichcountry.html', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let criteria = req.session.data['criteria']

  if (criteria === 'not_eligible') {
    res.redirect('/result_not_eligible.html')
  } else {
    res.redirect('/whichcountry.html')
  }
})

module.exports = router

// Strip off markdown extensions if present and redirect
var redirectMarkdown = function (requestedPage, res) {
  if (requestedPage.slice(-3).toLowerCase() === '.md') {
    res.redirect(requestedPage.slice(0, -3))
  }
  if (requestedPage.slice(-9).toLowerCase() === '.markdown') {
    res.redirect(requestedPage.slice(0, -9))
  }
}
