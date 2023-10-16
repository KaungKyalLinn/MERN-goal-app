const asyncHandler = require("express-async-handler");
const goals = require("../Models/GoalsModel")

const getGoals = asyncHandler( async (req,res) => {
  const theGoals = await goals.find({user : req.user.id});
  res.status(200).json(theGoals)
})

const setGoals = asyncHandler( async (req,res) => {
  if(!req.body.text){
    throw new Error("please fill the text field");
  }
  const theGoal = await goals.create({
    user: req.user.id,
    text : req.body.text
  })
  res.status(200)
  res.json({massage : theGoal})
})

const updateGoals = asyncHandler( async (req,res) => {
  const theGoal = await goals.findById(req.params.id);

  if(!theGoal){
    res.status(400)
    throw new Error("goal not found")
  }

  if(!req.user){
    res.status(400)
    throw new Error("User not found")
  }

  if(theGoal.user.toString() !== req.user.id){
    res.status(400)
    throw new Error("That is cheating")
  }

  const theUpdateGoal = await goals.findByIdAndUpdate(req.params.id, req.body, {new : true})
  res.status(200)
  res.json({massage : theUpdateGoal})
})

const deleteGoals = asyncHandler( async (req,res) => {
  const theGoal = await goals.findById(req.params.id);

  if(!theGoal){
    res.status(400)
    throw new Error("goal not found")
  }

  if(!req.user){
    res.status(400)
    throw new Error("User not found")
  }

  if(theGoal.user.toString() !== req.user.id){
    res.status(400)
    throw new Error("That is cheating")
  }

  const theUpdateGoal = await goals.findByIdAndDelete(req.params.id)
  res.status(200)
  res.json({id : req.params.id})
})

module.exports = {getGoals, setGoals, updateGoals, deleteGoals}