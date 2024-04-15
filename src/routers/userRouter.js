import express from "express";
import { edit, 
         remove,
         getEdit,
         postEdit, 
         see, 
         logout, 
         startGithubLogin, 
         finishGithubLogin} from "../controllers/userControllers"

const userRouter = express.Router();

userRouter.get("/logout", logout);
userRouter.route("/edit").get(getEdit).post(postEdit);
userRouter.get("/remove", remove);
userRouter.get("/github/start", startGithubLogin);
userRouter.get("/github/finish", finishGithubLogin);
userRouter.get(":id", see);

export default userRouter;