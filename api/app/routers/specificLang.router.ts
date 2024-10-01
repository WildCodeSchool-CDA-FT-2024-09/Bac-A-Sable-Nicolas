import express from "express";
import { langController } from "../controllers/index.controllers";
import { errorCatcher } from "../helpers/errorCatcher.helper";

const specificLangRouter = express.Router({ mergeParams: true });

specificLangRouter.route("/")
  .get(
    errorCatcher(langController.getLang)
  )
  .put(
    errorCatcher(langController.putLang)
  )
  .delete(
    errorCatcher(langController.deleteLang)
  );

export default specificLangRouter;