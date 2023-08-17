const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
        const token = req.headers.authorization;
        if (!token) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
        const tokenData = token.split(' ');
        if (tokenData[0] !== 'Bearer') {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
        const data = jwt.verify(tokenData[1], process.env.JWT_SECRET);
        if (!data) {
            return res.status(401).json({
                message: 'Unauthorized'
            });
        }
        req.user = data.user;
        next();
    };

module.exports = authMiddleware;