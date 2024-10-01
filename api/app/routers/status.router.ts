import express from "express";
import { statusController } from "../controllers/index.controllers";
import specificStatusRouter from "./specificStatus.router";
import { errorCatcher } from "../helpers/errorCatcher.helper";

const statusRouter = express.Router();

statusRouter.route("/")
  .get(
    errorCatcher(statusController.getAllStatus)
  )
  .post(
    errorCatcher(statusController.postStatus)
  );

statusRouter.use("/:id", specificStatusRouter)

export default statusRouter;