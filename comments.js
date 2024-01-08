// Create web server

// Import modules
const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');
const Post = require('../models/post');

// Create comment
router.post('/', async (req, res) => {
    try {
        const comment = new Comment({
            content: req.body.content,
            post: req.body.post,
            user: req.user._id
        });
        await comment.save();
        await Post.findByIdAndUpdate(req.body.post, { $push: { comments: comment._id } });
        res.status(201).send(comment);
    } catch (error) {

    }
}
);

// Get comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find({}).populate('user', 'name').populate('post', 'title');
        res.status(200).send(comments);
    } catch (error) {

    }
});

// Get comment by id
router.get('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id).populate('user', 'name').populate('post', 'title');
        res.status(200).send(comment);
    } catch (error) {

    }
});

// Update comment
router.put('/:id', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndUpdate(req.params.id, {
            content: req.body.content
        });
        res.status(200).send(comment);
    } catch (error) {

    }
});

// Delete comment

router.delete('/:id', async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        res.status(200).send(comment);
    } catch (error) {

    }
});

module.exports = router;


