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
    models.Page.findOne({
        where: {
            id: req.params.id
        }
    })
        .then((result) => {
            res.render('apage', {
                titles: result.title,
                urlTitle: result.urlTitle,
                content: result.content
            });
            // res.json(result);
        })
        .catch(next);

});

module.exports = router;
