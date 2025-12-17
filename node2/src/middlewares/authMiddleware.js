import jwt from 'jsonwebtoken';

const authMiddleware = (req,res,next) => {
    const authHeader = req.headers['authorization'];
    
    if(!authHeader){
        return res.status(401).json({message: "No token provided"});
    }

    // ARREGLO AQUÍ: Separamos la palabra "Bearer" del token real
    // Si viene "Bearer eyJ...", tomamos la segunda parte [1]
    const token = authHeader.split(' ')[1] || authHeader;

    jwt.verify(token, process.env.JWT_SECRET, (err,decoded) => {
        if(err){
            console.error(err.message);
            return res.status(401).json({message: "Failed to authenticate token"});
        }
        req.userId = decoded.id;
        next();
    });
}

export default authMiddleware;