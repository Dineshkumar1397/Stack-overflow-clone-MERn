const express = require('express');
// const mongoose = require('mongoose');
const router = express.Router();
const questionRouter = require("./Question");
const answerRouter = require("./Answers");
const commentRouter = require("./Comment")

router.get('/', (req, res) => {
    res.send("Welcome to stack overflow clone!");
});
router.use('/question', questionRouter);
router.use('/answer', answerRouter);
router.use('/comment', commentRouter);

module.exports = router;