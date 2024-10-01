import express, { json } from "express";
import "dotenv/config";
import router from "./routers/index.router";
import { errorHandler } from "./middlewares/errorHandler.middleware";

const app = express();

app.use(json());

app.use(router);

app.use(errorHandler);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:${PORT}`);
})