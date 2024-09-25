import express from "express";
import { repoController } from "../controllers/index.controllers";
import specificRepoRouter from "./specificRepo.router";

const repoRouter = express.Router();

repoRouter.route("/")
  .get(repoController.getAllRepos)
  .post(repoController.postRepo);

repoRouter.use("/:id", specificRepoRouter);

export default repoRouter;