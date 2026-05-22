const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; 

    if (!token) {
        return res.status(401).json({ message: 'Accès refusé. Aucun token fourni.' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_temporaire');
        req.user = decoded; 
        next(); 
    } catch (error) {
        res.status(403).json({ message: 'Token invalide ou expiré.' });}
};

module.exports = verifyToken;