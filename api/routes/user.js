import express from "express"; // if we write in{} then it will not take entire express module only the express function
import {register,login} from "../controllers/user.js";


const router = express.Router();

router.post("/register",register);

router.post("/login",login);


export default router; 