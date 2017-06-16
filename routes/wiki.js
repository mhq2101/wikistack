'use strict'
var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;




// base directory is /wiki/
router.get('/', function(req, res, next) {
  res.redirect('/');

});

router.post('/', function(req, res, next) {
    
    var page = Page.build({
        title: req.body.title,
        content:req.body.content,
        status: req.body.status
    })
    
    page.save().then((result) => {
        res.json(result);
    });
});

router.get('/add', function(req, res, next) {
//   res.send('got to GET /wiki/add');
  res.render('addpage');
});

router.get('/:page', function(req, res, next) {
    Page.findOne({
        where: {
            urlTitle: req.params.page
        }
    })
    .then((result) => {
        res.render('wikiPage', {
            titles: result.title,
            urlTitle: result.urlTitle,
            content: result.content
        });
        // res.json(result);
    })
    .catch(next);

});

module.exports = router;