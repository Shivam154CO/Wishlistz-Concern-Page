import 'dotenv/config'
import express from "express";
import cors from "cors";
import db from "./config/db.js"

db();
const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(cors());
app.use(express.json());

app.listen(PORT, () => {
    console.log(`server is running on port https://localhost:${PORT}`);
})