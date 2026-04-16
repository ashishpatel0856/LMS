import jwt from 'jsonwebtoken';

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;  // Cookie se verify hoga
        
        if (!token) {
            return res.status(401).json({
                message: "User are not authenticated",
                success: false
            });
        }
        
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(401).json({
                message: "Invalid token",
                success: false
            });
        }
        
        req.id = decode.userId;
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Authentication failed",
            success: false
        });
    }
}

export default isAuthenticated;