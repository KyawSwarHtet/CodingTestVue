import express, {
  Request,
  Response,
  Errback,
  ErrorRequestHandler,
  NextFunction,
} from "express";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";
import { config } from "dotenv";
import imgRouter from "./router/image-route";

const app = express();
config();

//middleware
app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//image folder route
app.use("/codetest", express.static(path.join(__dirname, "codetest")));

//connect to mongodb
mongoose
  .connect(process.env.MONGO_URL!)
  .then(() => console.log("connected with MONGODB", process.env.MONGO_URL))
  .catch((err) => {
    console.log(err);
  });

// api path
app.use("/api", imgRouter);
//checking image type and response
app.use(
  (
    err: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (err.name === "LIMIT_FILE_TYPES") {
      res.status(422).json({ message: "Only images are allowed" });
      next();
    }

    if (err.name === "LIMIT_FILE_SIZE") {
       res
        .status(422)
        .json({ message: "Too large. Max size is allowed only 5MB" });

        next();
    }

    next();
  }
);

const PORT = process.env.PORT || 5000;
console.log("server is running on ", PORT);
app.listen(PORT);
