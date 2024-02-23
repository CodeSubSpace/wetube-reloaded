import express from "express";
import morgan from "morgan"

const PORT = 4000;

const app = express();
const logger = morgan("dev");
app.use(logger);

const globalRouter = express.Router();
const handleHome = (req, res) => res.send("home");
globalRouter.get("/", handleHome)

const userRouter = express.Router();
const handleEdituser = (req, res) => res.send("Edit User");
userRouter.get("/edit", handleEdituser)

const videoRouter = express.Router();
const handleWatchVideo = (req, res) => res.send("Watch Video");
videoRouter.get("/watch", handleWatchVideo);

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);




// Open application
const handleListening = () =>
    console.log(`Server listening on port 4000 🚀 http://localhost:${PORT}`);

app.listen(PORT, handleListening); //request 대기  