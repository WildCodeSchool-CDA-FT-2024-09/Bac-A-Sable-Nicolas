import express from "express";
import { statusController } from "../controllers/index.controllers";

const specificStatusRouter = express.Router({ mergeParams: true });

specificStatusRouter.route("/")
  .get(statusController.getStatus);

export default specificStatusRouter;