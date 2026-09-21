const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const requireAuth = async (req, res, next) => {
  // verify user is authenticated
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  console.log(authorization);
  console.log(authorization.split(" "));
  console.log(authorization.split(" ")[0]);
  console.log(authorization.split(" ")[1]);

  const token = authorization.split(" ")[1];
  console.log("Gets the token (all of it)", token)

  try {
    // jwt.verify returns the decoded payload if valid, THROWS if invalid/expired
    const { _id } = jwt.verify(token, process.env.SECRET);
    console.log("Decode the payload, and returns true or false", _id)

    // Look up the user in MongoDB, keep only the _id field, attach to req
    req.user = await User.findOne({ _id }).select("_id");
    console.log("Turn the user in req in the document with the _id")
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Request is not authorized" });
  }
};

module.exports = requireAuth;

