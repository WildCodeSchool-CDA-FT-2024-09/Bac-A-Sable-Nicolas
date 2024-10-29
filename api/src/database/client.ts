import { DataSource } from "typeorm";
import "dotenv/config";
import { Repo, Lang, Status } from "../entities/index.entites";

const { BACKEND_FILE } = process.env;

export const dataSource = new DataSource({
  type: "postgres",
  host: "db", // Nom de l'image associé à Postgres --name dans la commande
  port: 5432,
  username: "postgres",
  password: "psql", // -e POSTGRES_PASSWORD=
  database: "postgres",
  entities: [Repo, Status, Lang],
  synchronize: true,
});
