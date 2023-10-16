const mongoose = require("mongoose");

const UsersSchema = mongoose.Schema({
  name : {
    type : String,
    required : [true, "please fill the name first"]
  },
  email : {
    type : String,
    required : [true, "please fill email"]
  },
  password : {
    type : String,
    required : [true, "please fill the password"]
  },
},
{
  timestamps : true
}
)

module.exports = mongoose.model("User", UsersSchema);