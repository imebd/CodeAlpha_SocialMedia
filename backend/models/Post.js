const db = require('../config/db');

const Post = {
    create: async (userId, content) => {
        const [result] = await db.query(
            'INSERT INTO posts (user_id, content) VALUES (?, ?)',
            [userId, content]
        );
        return result.insertId; 
     },

    getAll: async () => {
        const [rows] = await db.query(`
            SELECT posts.*, users.username 
            FROM posts 
            JOIN users ON posts.user_id = users.id 
            ORDER BY posts.created_at DESC
        `);
        return rows;
    }
};

module.exports = Post;