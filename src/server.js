import express from "express";
import morgan from "morgan"
import session from "express-session";
import MongoStore from "connect-mongo";
import rootRouter from './routers/rootRouters.js'
import userRouter from './routers/userRouter.js'
import videoRouter from './routers/videoRouter.js'
import path from 'path';
import { localsMiddleware } from "./middlewares"

const app = express();
const logger = morgan("dev");
app.use(logger);

app.set("view engine", "pug");
app.set("views", path.join(process.cwd(), "src/views"));


app.use(express.urlencoded({ etended: true}));

console.log(process.env.COOKIE_SECRET, process.env.DB_URL)

//세션 미들웨어 추가
app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 20000,
        },
        store: MongoStore.create({mongoUrl: process.env.DB_URL}),
    })
);
    
app.use(localsMiddleware)
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app