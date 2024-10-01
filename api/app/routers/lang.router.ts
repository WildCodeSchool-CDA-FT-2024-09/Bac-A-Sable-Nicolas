import express from "express";
import { langController } from "../controllers/index.controllers";
import specificLangRouter from "./specificLang.router";
import { validateRequest } from "../middlewares/index.middlewares";
import { langCreateSchema } from "../validation/index.validation";
import { errorCatcher } from "../helpers/index.helpers";

const langRouter = express.Router();

langRouter.route("/")
  .get(
    errorCatcher(langController.getAllLangs)
  )
  .post(
    validateRequest("body", langCreateSchema),
    errorCatcher(langController.postLang) 
  );

langRouter.use("/:id", specificLangRouter)

export default langRouter;