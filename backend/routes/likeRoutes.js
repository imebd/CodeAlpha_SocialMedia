const express = require('express');
const { toggleLike, getPostLikes } = require('../controllers/likeController');
const verifyToken = require('../middleware/authMiddleware'); // Protects the toggle action
const router = express.Router();

router.get('/:postId', getPostLikes);
router.post('/toggle', verifyToken, toggleLike);
module.exports = router;