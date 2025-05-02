const jwt = require('../utils/jwt');

module.exports = (req,res,next) =>{
    const token = req.headers['authorization']?.split(' ')[1];

    if(!token){
        return res.status(401).json({ message: 'Token required' });
    }
    try {
        const decoded = jwt.verifyToken(token);
        req.user = decoded;
        next()
    } catch (error) {
        res.status(401).json({
            message:'Invalid/expired Token'
        })
    }
}