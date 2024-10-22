import { DataSource } from "typeorm";
import "dotenv/config";
import { Repo, Lang, Status } from "../entities/index.entites";

const { BACKEND_FILE } = process.env;

export const dataSource = new DataSource({
  type: "sqlite",
  database: `${BACKEND_FILE}`,
  entities: [Repo, Lang, Status],
  synchronize: true
});