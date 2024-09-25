import express from "express";
import { langController } from "../controllers/index.controllers";

const specificLangRouter = express.Router({ mergeParams: true });

specificLangRouter.route("/")
  .get(langController.getLang);

export default specificLangRouter;