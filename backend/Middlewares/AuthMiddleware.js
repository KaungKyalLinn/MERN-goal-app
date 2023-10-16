const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const users = require("../Models/UsersModel")

const protect = asyncHandler( async (req,res,next) => {
  let token
  if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
    try{
      token = req.headers.authorization.split(" ")[1]
      const decode = jwt.verify(token , process.env.JWT_SECRET);
      req.user = await users.findById(decode.id).select("-password");
      next()
    }
    catch(err){
      res.status(401);
      throw new Error("Authorization failed")
    }
  }
  if(!token){
    res.status(401);
    throw new Error("Authorization failed : no token")
  }
})

module.exports = {protect};