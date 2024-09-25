import express from "express";
import { repoController } from "../controllers/index.controllers";
import specificRepoLangRouter from "./specificRepoLang.router";

const specificRepoRouter = express.Router({ mergeParams: true });

specificRepoRouter.route("/")
  .get(repoController.getRepo);

specificRepoRouter.use("/langs", specificRepoLangRouter);

export default specificRepoRouter;