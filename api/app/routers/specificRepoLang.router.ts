import express from "express";
import { repoController } from "../controllers/index.controllers";
import { errorCatcher } from "../helpers/errorCatcher.helper";

const specificRepoLangRouter = express.Router({ mergeParams: true});

specificRepoLangRouter.route("/")
  .get(
    errorCatcher(repoController.getAllLangsByRepo)
  )
  .post(
    errorCatcher(repoController.addLangToRepo)
  );

export default specificRepoLangRouter;