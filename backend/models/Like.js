const db = require('../config/db');

const Like = {
    checkExists: async (userId, postId) => {
        const [rows] = await db.query(
            'SELECT * FROM likes WHERE user_id = ? AND post_id = ?',
            [userId, postId]
        );
        return rows.length > 0;
    },

    create: async (userId, postId) => {
        const [result] = await db.query(
            'INSERT INTO likes (user_id, post_id) VALUES (?, ?)',
            [userId, postId]);
        return result.insertId;
    },

    delete: async (userId, postId) => {
        await db.query(
            'DELETE FROM likes WHERE user_id = ? AND post_id = ?',
            [userId, postId]
        );
    },
    getCountByPostId: async (postId) => {
        const [rows] = await db.query(
            'SELECT COUNT(*) as likeCount FROM likes WHERE post_id = ?',
            [postId]
        );
        return rows[0].likeCount;
    }};

module.exports = Like;