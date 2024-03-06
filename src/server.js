import express from "express";
import morgan from "morgan"
import globalRouter from './routers/globalRouters.js'
import userRouter from './routers/userRouter.js'
import videoRouter from './routers/videoRouter.js'
import path from 'path';


const app = express();
const logger = morgan("dev");
app.use(logger);

app.set("view engine", "pug");
app.set("views", path.join(process.cwd(), "src/views"));


app.use(express.urlencoded({ etended: true}));

app.use("/", globalRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app