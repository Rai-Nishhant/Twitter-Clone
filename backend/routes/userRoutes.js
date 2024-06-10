import express from "express";
import {Registration, getMyProfile, getOtherUsers} from "../controllers/authorization.js";
import { Login , logout, bookmarks} from "../controllers/authorization.js";
import isAuthenticated from "../config/auth.js";

const router = express.Router();

router.route("/registration").post(Registration);
router.route("/login").post(Login);
router.route("/logout").get(logout);
router.route("/bookmark/:id").put(isAuthenticated , bookmarks);
router.route("/profile/:id").get(isAuthenticated, getMyProfile);
router.route("/otheruser/:id").get(isAuthenticated, getOtherUsers);

export default router;