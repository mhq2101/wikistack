'use strict'
var express = require('express');
var router = express.Router();
var models = require('../models');

// base directory is /wiki/
router.get('/', function(req, res, next) {
  res.send('got to GET /wiki/');
});

router.post('/', function(req, res, next) {
  res.send('got to POST /wiki/');
});

router.get('/add', function(req, res, next) {
//   res.send('got to GET /wiki/add');
  res.render('addpage')
});

module.exports = router;