import express from "express";
import { statusController } from "../controllers/index.controllers";
import specificStatusRouter from "./specificStatus.router";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import { statusCreateSchema } from "../validation/index.validation";
import { errorCatcher } from "../helpers/errorCatcher.helper";

const statusRouter = express.Router();

statusRouter.route("/")
  .get(
    errorCatcher(statusController.getAllStatus)
  )
  .post(
    validateRequest("body", statusCreateSchema),
    errorCatcher(statusController.postStatus)
  );

statusRouter.use("/:id", specificStatusRouter)

export default statusRouter;