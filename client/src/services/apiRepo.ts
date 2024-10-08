import { Repo } from "../features/repo/RepoList";
import connexion from "./connexion";

export async function getRepos(): Promise<Repo[]> {
  const response = await connexion.get<Repo[]>("/repos");
  return response.data;
}