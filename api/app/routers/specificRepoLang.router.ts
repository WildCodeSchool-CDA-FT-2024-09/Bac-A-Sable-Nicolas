import express from "express";
import { repoController } from "../controllers/index.controllers";

const specificRepoLangRouter = express.Router({ mergeParams: true});

specificRepoLangRouter.route("/")
  .get(repoController.getAllLangsByRepo)
  .post(repoController.addLangToRepo);

export default specificRepoLangRouter;