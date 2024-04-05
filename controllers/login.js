// requiring the login schema.
const Login = require("../models/login");
//

// imporitng the json web token.
const jwt = require("jsonwebtoken");
//

const { JWT_SECRET } = require("../config");

module.exports.authentication = async (req, res) => {
  const success = await Login.findOne(req.body);

  if (success) {
    const token = jwt.sign({ userId: success._id }, JWT_SECRET);

    res.json(token);
    return;
  }

  res.status(411).json({
    message: "Error while logging in",
  });
};
