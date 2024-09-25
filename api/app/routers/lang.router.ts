import express from "express";
import { langController } from "../controllers/index.controllers";
import specificLangRouter from "./specificLang.router";

const langRouter = express.Router();

langRouter.route("/")
  .get(langController.getAllLangs)
  .post(langController.postLang)

langRouter.use("/:id", specificLangRouter)

export default langRouter;