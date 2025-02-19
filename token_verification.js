const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET; 

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(403).send({ message: 'No token provided!' });
  }
  const tokenWithoutBearer = token.split(' ')[1];
  try{
    const verified = jwt.verify(tokenWithoutBearer, secretKey); 
      res.user = verified;
      next();
  }catch(err){
    res.status(400).send('Invalid Token ss');
  }

};

module.exports = verifyToken;
