import express from "express";
import morgan from "morgan"
import globalRouter from './routers/globalRouters.js'
import userRouter from './routers/userRouter.js'
import videoRouter from './routers/videoRouter.js'

const PORT = 4000;

const app = express();
const logger = morgan("dev");
app.use(logger);

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

// Open application
const handleListening = () =>
    console.log(`Server listening on port 4000 🚀 http://localhost:${PORT}`);

app.listen(PORT, handleListening); //request 대기  