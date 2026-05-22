const Post = require('../models/Post');

const createPost = async (req, res) => {
    try {
        const { content } = req.body;
        const userId = req.user.id; 

        if (!content) {
            return res.status(400).json({ message: 'Le contenu du post ne peut pas être vide.' });
        }

        const postId = await Post.create(userId, content);

        res.status(201).json({
            message: 'Publication créée avec succès !',
            postId: postId
        });
        
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.getAll();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

module.exports = { createPost, getAllPosts };