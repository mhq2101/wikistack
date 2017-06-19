'use strict';
var express = require('express');
var router = express.Router();
var models = require('../models');

router.get('/', function (req, res, next) {
    models.User.findAll().then((result) => {
        res.render('authorpage', {
            authors: result
        });
    });
});

router.get('/:id', function (req, res, next) {

    var userPromise = models.User.findById(req.params.id);
    var pagesPromise = models.Page.findAll({
        where: {
            authorId: req.params.id
        }
    });
    Promise.all([
        userPromise,
        pagesPromise
    ])
        .then((result) => {
            var user = result[0];
            var pages = result[1];
            res.render('apage', {
                user,
                pages
            });
        })
        .catch(next);

});

module.exports = router;
