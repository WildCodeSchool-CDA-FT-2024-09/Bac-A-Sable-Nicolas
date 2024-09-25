import express from "express";
import { statusController } from "../controllers/index.controllers";
import specificStatusRouter from "./specificStatus.router";

const statusRouter = express.Router();

statusRouter.route("/")
  .get(statusController.getAllStatus)
  .post(statusController.postStatus);

statusRouter.use("/:id", specificStatusRouter)

export default statusRouter;