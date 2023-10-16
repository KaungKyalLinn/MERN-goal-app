const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const users = require("../Models/UsersModel");


// des register user
// route /api/users/register
// public
const registerUser = asyncHandler( async (req,res) => {

  const {name, email, password} = req.body;

  // check every fields already filled and throw error
  if(!name || !email || !password){
    res.status(400)
    throw new Error ("please fill all the fields")
  }
  
  // check exists user and throw error
  const existsUser = await users.findOne({email})
  if(existsUser){
    res.status(400)
    throw new Error ("this email is already used")
  }

  // hash password and create a user
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt)
  const user = await users.create({
    name,
    email,
    password : hashPassword,
  })
  res.status(200).json({
    name : user.name,
    token : tokenGenerate(user.id)
  })
})



// des login user
// route /api/users/login
// public
const loginUser = asyncHandler( async (req,res) => {
  const {email,password} = req.body;

  if(!email || !password){
    throw new Error("please fill all the fields")
  }

  // check the user already exists
  const theUser = await users.findOne({email});
  if(theUser && await bcrypt.compare(password, theUser.password)){
    res.status(200).json({
      name : theUser.name,
      token : tokenGenerate(theUser.id)
    })
  }else{
    res.status(400)
    throw new Error("Invalid credintial")
  }

})



// des taking user data
// route /api/users
// private
const getUser = asyncHandler( async (req,res) => {
  res.status(200).json({
    name : req.user.name,
    email : req.user.email
  })
})

// token generating
const tokenGenerate = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn : "10d"})
}

module.exports = {registerUser, loginUser, getUser}