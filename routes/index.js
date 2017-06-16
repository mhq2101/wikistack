'use strict'
const express = require('express');
const router = express.Router();
const models = require('../models');
const wikiRouter = require('./wiki');
const userRouter = require('./user');

// router.use('/')

router.use('/wiki', wikiRouter);




module.exports = router;