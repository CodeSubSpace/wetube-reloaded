import express from "express";

const app = express(); //express application 생성

const handleListening = () => console.log("Server listening on port 4000 🚀")

app.listen(4000, handleListening) //request 대기

