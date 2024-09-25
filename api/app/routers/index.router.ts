import express from "express";
import apiRouter from "./api.router";

const router = express.Router();

router.use("/api", apiRouter);

export default router;