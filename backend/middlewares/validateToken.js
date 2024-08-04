import jwt from 'jsonwebtoken';
import 'dotenv/config';

const { JWT_SECRET } = process.env;

const validateToken = (req, res, next) => {
    let token = req.headers.authorization;

    token = token.split(" ")[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; 
        next(); 
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export { validateToken };
