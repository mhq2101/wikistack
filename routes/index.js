'use-strict';
const express = require('express');
const router = express.Router();
const models = require('../models');
const wikiRouter = require('./wiki');
const userRouter = require('./user');

router.get('/', function (req, res, next) {
    models.Page.findAll().then((result) => {
        res.render('index', {
            pages: result
        });
    });
});

router.get('/search', function(req, res, next) {
    res.render('tagsearchpage');
})

router.use('/wiki', wikiRouter);
router.use('/users', userRouter);

module.exports = router;
