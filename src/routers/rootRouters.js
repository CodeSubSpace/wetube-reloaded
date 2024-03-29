import express from "express";
import { getJoin, postJoin, getLogin, postLogin } from "../controllers/userControllers.js"
import { home, search } from "../controllers/videoControllers.js"

const rootRouter = express.Router();

rootRouter.get("/", home);
rootRouter.route("/join").get(getJoin).post(postJoin);
rootRouter.route("/login").get(getLogin).post(postLogin);
rootRouter.get("/search", search)

export default rootRouter;