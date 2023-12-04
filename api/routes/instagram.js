import express from "express"
import { igStats, retroIg } from "../controllers/instagram.js";

const router = express.Router()

router.get("/username/:username",igStats)

router.get("/retro/:instID",retroIg) 

export default router;