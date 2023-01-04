import jwt from 'jsonwebtoken'

 function jwtauth(req, res, next) {
  try {
    let authHeader = req.headers['authorization']
    if(authHeader){
        let token = authHeader.split(" ")[1];
        let isVerify = jwt.verify(token, process.env.JWT_SECRET)
        if(isVerify){
            req.user = isVerify
            next()
        } else{
            res.status(403).json({message:'token expired'})
        }
    } else{
        res.status(401).json({message:'authentication required for access'})
    }
  } catch (err) {
    console.log(err);
  }
}

export default jwtauth;