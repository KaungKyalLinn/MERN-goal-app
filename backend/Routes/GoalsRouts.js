const express = require("express");
const router = express.Router();
const {getGoals,setGoals,updateGoals,deleteGoals} = require("../Controllers/GoalsControllers");
const {protect} = require("../Middlewares/AuthMiddleware")

router.route("/").get(protect,getGoals).post(protect,setGoals);
router.route("/:id").put(protect,updateGoals).delete(protect,deleteGoals);

module.exports = router;