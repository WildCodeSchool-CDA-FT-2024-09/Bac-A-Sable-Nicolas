import express, { json } from "express";
import "dotenv/config";
import router from "./routers/index.router";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { dataSource } from "./database/client";
import cors from "cors";

const app = express();

const corsOptions = {
  credentials: true,
  origin: process.env.CLIENT_URL,
  allowedHeaders: [
    "Content-type"
  ]
}

app.use(cors(corsOptions));

app.use(json());

app.use(router);

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, async () => {
  await dataSource.initialize();
  console.log(`Server is listening on http://localhost:${PORT}`);
})