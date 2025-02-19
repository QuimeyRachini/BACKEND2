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