import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import { getLikedVideos } from "../controllers/userController.js";

const router = express.Router();

router.get("/liked", protect, getLikedVideos);

export default router;
