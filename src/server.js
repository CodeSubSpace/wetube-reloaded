import express from "express";
import morgan from "morgan"
import session from "express-session";
import rootRouter from './routers/rootRouters.js'
import userRouter from './routers/userRouter.js'
import videoRouter from './routers/videoRouter.js'
import path from 'path';


const app = express();
const logger = morgan("dev");
app.use(logger);

app.set("view engine", "pug");
app.set("views", path.join(process.cwd(), "src/views"));


app.use(express.urlencoded({ etended: true}));

//세션 미들웨어 추가
app.use(
    session({
        secret:"Hello!",
        resave: true,
        saveUninitialized: true
    })
);

//세션을 이해하기 위하여...
app.use((req, res, next) => {
    req.sessionStore.all((error, sessions) => {
        console.log(sessions)
        next();
    })
})

app.get("/add-one", (req, res, mex)=>{
    req.session.zammin += 1
    return res.send(`${req.session.id}`)
})

app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);

export default app