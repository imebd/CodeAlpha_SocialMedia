const express = require('express');
const { createPost, getAllPosts } = require('../controllers/postController');
const verifyToken = require('../middleware/authMiddleware'); 
const router = express.Router();

router.get('/', getAllPosts);
router.post('/', verifyToken, createPost);
module.exports = router;