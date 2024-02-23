import express from "express";
import { join } from "../controllers/userControllers.js"
import { trending } from "../controllers/videoControllers.js"

const globalRouter = express.Router();

globalRouter.get("/", trending);
globalRouter.get("/join", join);

export default globalRouter;