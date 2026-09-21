const express = require("express");
const router = express.Router();
const { loginUser, signupUser, getMe } = require("../controllers/userController");
const requireAuth = require("../middleware/requireAuth");
  
// login route
router.post("/login", loginUser);
  
// signup route
router.post("/signup", signupUser);

router.get("/me", requireAuth, getMe);
  
module.exports = router;

