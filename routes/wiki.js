'use strict'
var express = require('express');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

// base directory is /wiki/
router.get('/', function (req, res, next) {

    res.redirect('/');

});

router.post('/', function (req, res, next) {
    User.findOrCreate({
        where: {
            name: req.body.name,
            email: req.body.email
        }
    }).then((result) => {
        var user = result[0]
        var page = Page.build({
            title: req.body.title,
            content: req.body.content,
            status: req.body.status,
            tags: req.body.tags.split(' ')
        });
        return page.save().then((pageResult) => {
            return pageResult.setAuthor(user);
        });
    })
        .then((page) => {
            res.redirect(page.route);
        })
        .catch(next);
});

router.get('/add', function (req, res, next) {
    //   res.send('got to GET /wiki/add');
    res.render('addpage');
});

router.get('/search', function (req, res, next) {
    Page.findByTag(req.query.tag.split(' ')).then((result) => {
        res.render('index', {
            pages: result
        })
    })

});

router.get('/:page', function (req, res, next) {
    
    var pagePromise = Page.findOne({
        where: {
            urlTitle: req.params.page
        }
    })
    var userPromise = pagePromise.then((result) =>{
        var user = User.findOne({
            where: {
                id: result.authorId
            }
        })
        return user;
    })
        
    Promise.all([
        pagePromise,
        userPromise
    ])
        .then((result) => {
            var page = result[0];
            var user = result[1];
            res.render('wikipage', {
                // titles: page.title,
                // urlTitle: page.urlTitle,
                // content: page.content
                page,
                user
            });
            // res.json(result);
        })
        .catch(next);
});

router.get('/:page/similar', function (req, res, next) {
    Page.findOne({
        where: {
            urlTitle: req.params.page
        }
    })
    .then((result) => {
        result.findSimilar().then((result) => {
            res.render('index', {
                pages: result
            });
        });  
    });

    


    // Page.findByTag(req.query.tag.split(' ')).then((result) => {
    //     res.render('index', {
    //         pages: result
    //     })
    // })

});



module.exports = router;
