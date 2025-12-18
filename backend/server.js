import "dotenv/config";
import express from "express";
import cors from "cors";
import db from "./config/db.js";
import router from "./Routes/routes.js";

const app = express();
const PORT = process.env.PORT || 5000;

db();

/* middlewares */
app.use(cors());
app.use(express.json());
app.use(router);
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
