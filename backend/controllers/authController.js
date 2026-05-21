const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const userExists = await User.findByEmail(email);
        if (userExists) {
            return res.status(400).json({ message: 'Cet email est déjà utilisé.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const userId = await User.create(username, email, hashedPassword);

        res.status(201).json({ 
            message: 'Utilisateur créé avec succès !', 
            userId: userId 
        });
        
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByEmail(email);
        if (!user) {
            return res.status(400).json({ message: 'Identifiants invalides.' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Identifiants invalides.' });
        }

        const token = jwt.sign(
            { id: user.id }, 
            process.env.JWT_SECRET || 'secret_temporaire', 
            { expiresIn: '1d' }
        );

        res.json({
            message: 'Connexion réussie !',
            token: token,
            user: { id: user.id, username: user.username, email: user.email }
        });

    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error: error.message });
    }
};

module.exports = { register, login };