const Like = require('../models/Like');

const toggleLike = async (req, res) => {
    try {
        const { postId } = req.body;
        const userId = req.user.id; 

        if (!postId) {
            return res.status(400).json({ message: 'Post ID is required.' });
        }

        const alreadyLiked = await Like.checkExists(userId, postId);

        if (alreadyLiked) {
            await Like.delete(userId, postId);
            const likeCount = await Like.getCountByPostId(postId);
            return res.json({ message: 'Post unliked successfully.', liked: false, likeCount });
        } else {
            await Like.create(userId, postId);
            const likeCount = await Like.getCountByPostId(postId);
            return res.status(201).json({ message: 'Post liked successfully.', liked: true, likeCount });
        }

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }};
const getPostLikes = async (req, res) => {
    try {
        const { postId } = req.params;

        const likeCount = await Like.getCountByPostId(postId);
        res.json({ postId, likeCount });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { toggleLike, getPostLikes };