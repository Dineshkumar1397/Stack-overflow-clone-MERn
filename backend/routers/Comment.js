const express = require('express');

const router = express.Router();
const CommentDB = require('../models/Comment');

router.post('/:id', async (req, res) => {
    try{
        await CommentDB.create({
            question_id: req.params.id,
            comment: req.body.comment,
            user: req.body.user,
        }).then((doc) => {
            res.status(201).send({
                status: true,
                message: "Comment added successfully",
            });
        }).catch((err) => {
            res.status(400).send({
                status: false,
                message: "Error while adding comment",
            });
        });
    } catch (err) {
        res.status(500).send({
            status: false,
            message: "Error while adding comment",
        });
    }
});

module.exports = router;