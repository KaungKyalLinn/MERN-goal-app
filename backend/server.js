const express = require("express");
const app = express();
const path = require("path");
const dotenv = require("dotenv").config();
const dbConnect = require("./Config/Db")
const {ErrorHandling} = require("./Middlewares/ErrorHandlingMiddleware")

const port = process.env.PORT || 5000;

dbConnect()

app.use(express.json());
app.use(express.urlencoded({extended : false}))

app.use("/api/goals",require("./Routes/GoalsRouts"))
app.use("/api/users",require("./Routes/UsersRoutes"))

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "../forntend/build")));
  app.get("*",(req,res) => {
    res.sendFile(path.join(__dirname, "../forntend/build/index.html"))
  })
}else{
  app.get("/",(req,res) => {
    res.send("please make sure to production")
  })
}

app.use(ErrorHandling)

app.listen(port , () => {
  console.log(`server start running at port ${port}`)
});