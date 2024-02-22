import express from "express";
import morgan from "morgan"

const PORT = 4000;
const app = express();
const logger = morgan("dev");
const logger_test = morgan("combined")
const logger_test2 = morgan("tiny")

const home = (req, res) => {
    console.log("I will respond.");
    return res.send("hello");
};
const login = (reg, res) => {
    return res.send("login");
}

app.use(logger);
app.get("/", home);
app.get("/login", login);

// 그리고 나서 외부에 어플리케이션을 개방한다.
const handleListening = () =>
    console.log(`Server listening on port 4000 🚀 http://localhost:${PORT}`);

app.listen(PORT, handleListening); //request 대기  