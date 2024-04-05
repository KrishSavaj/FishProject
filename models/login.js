// importing the mongoose.
const mongoose = require("mongoose");
//

const schema = mongoose.Schema;

const loginSchema = new schema({
  userName: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// creating the collection.
const Login = mongoose.model("Login", loginSchema);
//

// exporting the collection so that we use in our app.js
module.exports = Login;
//
