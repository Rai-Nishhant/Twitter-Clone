import express from "express";
import {createTweet, deleteTweets, likeOrDislike} from "../controllers/postController.js";
import isAuthenticated from "../config/auth.js";
const router = express.Router();

router.route("/create").post(isAuthenticated, createTweet);
router.route("/delete/:id").delete(isAuthenticated,deleteTweets);
router.route("/like/:id").put(isAuthenticated, likeOrDislike);

export default router;