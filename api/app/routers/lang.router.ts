import express from "express";
import { langController } from "../controllers/index.controllers";
import specificLangRouter from "./specificLang.router";
import { errorCatcher } from "../helpers/index.helpers";

const langRouter = express.Router();

langRouter.route("/")
  .get(
    errorCatcher(langController.getAllLangs)
  )
  .post(
    errorCatcher(langController.postLang) 
  );

langRouter.use("/:id", specificLangRouter)

export default langRouter;