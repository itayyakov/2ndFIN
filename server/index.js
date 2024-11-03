import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import cors from "cors";

const app = express();
const port = 8080;

app.use(cors());

app.post("/post", (req, res) => {
    console.log("Server connected to react");
    res.redirect("/");
})

app.listen(port, () => {
    console.log(`Server listening on port ${8080}`);
})