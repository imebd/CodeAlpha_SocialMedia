const Comment = require('../models/Comment');

// 1. Add a comment to a post
const createComment = async (req, res) => {
    try {
        const { postId, content } = req.body;
        const userId = req.user.id; 

        if (!postId || !content) {
            return res.status(400).json({ message: 'Post ID and comment content are required.' });
        }
        const commentId = await Comment.create(postId, userId, content);

        res.status(201).json({
            message: 'Comment added successfully!',
            commentId: commentId
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }};

const getCommentsByPost = async (req, res) => {
    try {
        const { postId } = req.params; 
        const comments = await Comment.getByPostId(postId);
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }};
module.exports = { createComment, getCommentsByPost };