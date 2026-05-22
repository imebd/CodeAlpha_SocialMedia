const db = require('../config/db');

const Comment = {
    create: async (postId, userId, content) => {
        const [result] = await db.query(
            'INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)',
            [postId, userId, content]
        );
        return result.insertId; 
    },
    getByPostId: async (postId) => {
        const [rows] = await db.query(`
            SELECT comments.*, users.username 
            FROM comments 
            JOIN users ON comments.user_id = users.id 
            WHERE comments.post_id = ? 
            ORDER BY comments.created_at ASC
        `, [postId]);
        return rows;
    }};
module.exports = Comment;