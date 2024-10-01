import express from "express";
import { repoController } from "../controllers/index.controllers";
import specificRepoRouter from "./specificRepo.router";
import { errorCatcher } from "../helpers/errorCatcher.helper";

const repoRouter = express.Router();

repoRouter.route("/")
  .get(
    errorCatcher(repoController.getAllRepos)
  )
  .post(
    errorCatcher(repoController.postRepo)
  );

repoRouter.use("/:id", specificRepoRouter);

export default repoRouter;