import express from "express";
import { repoController } from "../controllers/index.controllers";
import { validateRequest } from "../middlewares/validateRequest.middleware";
import { langCreateSchema } from "../validation/index.validation";
import { errorCatcher } from "../helpers/errorCatcher.helper";

const specificRepoLangRouter = express.Router({ mergeParams: true});

specificRepoLangRouter.route("/")
  .get(
    errorCatcher(repoController.getAllLangsByRepo)
  )
  .post(
    validateRequest("body", langCreateSchema),
    errorCatcher(repoController.addLangToRepo)
  );

export default specificRepoLangRouter;