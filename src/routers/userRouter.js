import express from "express";
import { edit, 
         remove,
         getEdit,
         postEdit, 
         see, 
         logout, 
         startGithubLogin, 
         finishGithubLogin,
         getChangePassword,
        postChangePassword
        } from "../controllers/userControllers"
import { protectorMiddleware, publicOnlyMiddleware, uploadFiles } from "../middlewares";

const userRouter = express.Router();

userRouter.get("/logout", protectorMiddleware, logout);

userRouter
    .route("/edit")
    .all(protectorMiddleware)
    .get(getEdit)
    .post(uploadFiles.single("avatar"), postEdit);

userRouter
    .route("/change-password")
    .all(protectorMiddleware)
    .get(getChangePassword)
    .post(postChangePassword)

userRouter.get("/remove", remove);


userRouter.get("/github/start", publicOnlyMiddleware, startGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, finishGithubLogin);

userRouter.get(":id", see);

export default userRouter;