import express, { Express, NextFunction, Request, Response } from "express";
import "dotenv/config";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import { dbCon } from "./src/utils/dbcon";
import userRouter from "./src/routes/user";

interface CustomError extends Error {
  status: number;
  timeStamp: Date;
  path: string;
}

//configuration
const app: Express = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());

//route configuration
app.get("/health", (req: Request, res: Response) => {
  res.json({
    timeStamp: new Date(Date.now()),
    status: 200,
    message: "server is healthy 🚀",
  });
});
app.use("/api/v0/users", userRouter);
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const error: CustomError = {
    status: err.status || 500,
    message: err.message || "Internal Server Error",
    stack: err.stack || "N/A",
    name: err.name || "unknown error",
    timeStamp: err.timeStamp || new Date(Date.now()),
    path: err.path || "path not specified",
  };
  res.status(err.status || 500).json(error);
});

const startServer = async () => {
  try {
    await dbCon();
    app.listen(process.env.PORT || 8080, () => {
      console.log("server is listening on port" + process.env.PORT || 8080);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
