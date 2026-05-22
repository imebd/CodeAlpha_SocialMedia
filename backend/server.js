const express = require('express');
const cors = require('cors');
require('dotenv').config();
require('./config/db');

const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const commentRoutes = require('./routes/commentRoutes');
const likeRoutes = require('./routes/likeRoutes');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/likes', likeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/comments', commentRoutes);

app.get('/', (req, res) => {
    res.send("CodeAlpha Social media Api is live");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server successfully started on port ${PORT}`);
});