import express from "express";
import { statusController } from "../controllers/index.controllers";
import { errorCatcher } from "../helpers/errorCatcher.helper";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import { statusCreateSchema } from "../validation/index.validation";

const specificStatusRouter = express.Router({ mergeParams: true });

specificStatusRouter.route("/")
  .get(
    errorCatcher(statusController.getStatus)
  )
  .put(
    validateRequest("body", statusCreateSchema),
    errorCatcher(statusController.putStatus)
  )
  .delete(
    errorCatcher(statusController.deleteStatus)
  );

export default specificStatusRouter;