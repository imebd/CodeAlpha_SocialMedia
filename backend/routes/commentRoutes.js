const express = require('express');
const { createComment, getCommentsByPost } = require('../controllers/commentController');
const verifyToken = require('../middleware/authMiddleware'); 
const router = express.Router();

router.get('/:postId', getCommentsByPost);
router.post('/', verifyToken, createComment);
module.exports = router;