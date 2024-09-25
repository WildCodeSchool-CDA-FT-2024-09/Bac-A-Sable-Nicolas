import express from "express";
import repoRouter from "./repo.router";
import langRouter from "./lang.router";
import statusRouter from "./status.router";

const apiRouter = express.Router();

apiRouter.use("/repos", repoRouter);
apiRouter.use("/langs", langRouter);
apiRouter.use("/status", statusRouter);

export default apiRouter;