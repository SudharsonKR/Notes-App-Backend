import express from "express";

import userCtrl from "../controllers/userController.js";
import auth from "../middleware/auth.js";

const router = express.Router()

//register user
router.post("/register", userCtrl.registerUser)

//login user
router.post("/login", userCtrl.loginUser)

//verify token
router.get('/verify', userCtrl.verifiedToken)

export default router;