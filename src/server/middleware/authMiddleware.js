import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                if (err.name === 'TokenExpiredError') {
                    return res.status(401).json({ error: 'Token expirado. Faça login novamente' });
                }
                return res.status(403).json({ error: 'Token invalido ou erro de autenticaçao' })
            }

            req.user = user;
            next();
        });
    } else {
        return res.status(401).json({ error: 'Autorizaçao requerida' })
    }
};

export { authenticateJWT };