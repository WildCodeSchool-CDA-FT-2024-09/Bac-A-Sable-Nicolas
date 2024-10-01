import express from "express";
import { repoController } from "../controllers/index.controllers";
import specificRepoLangRouter from "./specificRepoLang.router";
import { errorCatcher } from "../helpers/errorCatcher.helper";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import { repoCreateSchema } from "../validation/index.validation";

const specificRepoRouter = express.Router({ mergeParams: true });

specificRepoRouter.route("/")
  .get(
    errorCatcher(repoController.getRepo)
  )
  .put(
    validateRequest("body", repoCreateSchema),
    errorCatcher(repoController.putRepo)
  )
  .delete(
    errorCatcher(repoController.deleteRepo)
  );

specificRepoRouter.use("/langs", specificRepoLangRouter);

export default specificRepoRouter;