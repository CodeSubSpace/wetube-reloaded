import express from "express";

const PORT = 4000;
const app = express();

// get request에 응답하는 방법 등을 application에게 먼저 만들어줘야 한다.
const handleHome = () => console.log("Somebody is trying to go home");
app.get("/", handleHome);

// 그리고 나서 외부에 어플리케이션을 개방한다.
const handleListening = () =>
    console.log(`Server listening on port 4000 🚀 http://localhost:${PORT}`);

app.listen(PORT, handleListening); //request 대기

