import express from "express";

const userRouter = express.Router();
const handleEdituser = (req, res) => res.send("Edit User");
userRouter.get("/edit", handleEdituser)

export default userRouter;