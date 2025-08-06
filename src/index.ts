import express from "express";
import { AppDataSource } from "./config/database";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan";
const app = express();
const port = 3000;

app.use(helmet());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  })
);

app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (req: any, res: any) => {
  res.status(200).json({
    status: "ok",
    message: "Chat app is up and running",
    Timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

AppDataSource.initialize().then(() => {
  console.log("Data Source has been initialized!");
  app.listen(port, () => {
    console.log(`app listening on port ${port}`);
  });
});
