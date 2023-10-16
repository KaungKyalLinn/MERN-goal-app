const express = require("express");
const router = express.Router();
const {registerUser, loginUser, getUser} = require("../Controllers/UsersControllers");
const {protect} = require("../Middlewares/AuthMiddleware")

router.route("/").get(protect,getUser).post(registerUser)
router.post("/login",loginUser)

module.exports = router;