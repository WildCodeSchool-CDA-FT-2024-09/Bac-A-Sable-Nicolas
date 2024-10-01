import express from "express";
import { repoController } from "../controllers/index.controllers";
import specificRepoLangRouter from "./specificRepoLang.router";
import { errorCatcher } from "../helpers/errorCatcher.helper";

const specificRepoRouter = express.Router({ mergeParams: true });

specificRepoRouter.route("/")
  .get(
    errorCatcher(repoController.getRepo)
  )
  .put(
    errorCatcher(repoController.putRepo)
  )
  .delete(
    errorCatcher(repoController.deleteRepo)
  );

specificRepoRouter.use("/langs", specificRepoLangRouter);

export default specificRepoRouter;