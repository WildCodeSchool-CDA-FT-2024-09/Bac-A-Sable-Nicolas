import express from "express";
import { statusController } from "../controllers/index.controllers";
import { errorCatcher } from "../helpers/errorCatcher.helper";

const specificStatusRouter = express.Router({ mergeParams: true });

specificStatusRouter.route("/")
  .get(
    errorCatcher(statusController.getStatus)
  )
  .put(
    errorCatcher(statusController.putStatus)
  )
  .delete(
    errorCatcher(statusController.deleteStatus)
  );

export default specificStatusRouter;