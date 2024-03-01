import express from "express";
import { connectToMongo } from "./data/db.js";
import UserRouter from "./routes/User.js";
import { config } from "dotenv";
import CORS from "cors";

const app = express();
app.use(express.json());

config({
  path: "./data/config.env",
});

connectToMongo();

app.use(
  CORS({
    origin: process.env.ORIGIN_URL,
    optionsSuccessStatus: 200,
    methods: ["POST", "GET", "PUT", "DELETE"],
  })
);

// Routers

app.get("/", (req, res) => {
  res.send("hii");
});
app.use("/api/v1/user", UserRouter);

// Server
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
