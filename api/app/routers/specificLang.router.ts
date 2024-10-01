import express from "express";
import { langController } from "../controllers/index.controllers";
import { errorCatcher } from "../helpers/errorCatcher.helper";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import { langCreateSchema } from "../validation/index.validation";

const specificLangRouter = express.Router({ mergeParams: true });

specificLangRouter.route("/")
  .get(
    errorCatcher(langController.getLang)
  )
  .put(
    validateRequest("body", langCreateSchema),
    errorCatcher(langController.putLang)
  )
  .delete(
    errorCatcher(langController.deleteLang)
  );

export default specificLangRouter;