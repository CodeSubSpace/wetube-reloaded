import express from "express";

const PORT = 4000;
const app = express();

// get request에 응답하는 방법 등을 application에게 먼저 만들어줘야 한다.
const logger = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
}

const privateMiddleware = (req, res, next) => {
    const url = req.url;
    if (url=='/protected') {
        return res.send("<h1>Not Allowed</h1>")
    }
    console.log("Allowed, you may continue.")
    next();
}

const handleHome = (req, res) => {
    return res.send("I love mingyun");
};

const handleProtected = (req, res) => {
    return res.send("Welcome to private world!")
}

app.use(privateMiddleware);
app.use(logger, handleHome);
app.get("/private", handleProtected);

// 그리고 나서 외부에 어플리케이션을 개방한다.
const handleListening = () =>
    console.log(`Server listening on port 4000 🚀 http://localhost:${PORT}`);

app.listen(PORT, handleListening); //request 대기  