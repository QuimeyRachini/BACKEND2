import jwt from 'jsonwebtoken';
import passport from 'passport';

export const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.sendStatus(403);
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        next();
    });
};

export const initializePassport = () => {
    passport.initialize();
};

export const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Acceso denegado: Solo los administradores pueden realizar esta acción.' });
    }
    next();
};

export const authorizeUser = (req, res, next) => {
    if (req.user.role !== 'user') {
        return res.status(403).json({ message: 'Acceso denegado: Solo los usuarios pueden realizar esta acción.' });
    }
    next();
};