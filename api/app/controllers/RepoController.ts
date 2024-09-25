import { Request, Response } from "express";
import repos from "../../data/repos.json";
import repoLang from "../../data/repoLang.json";
import langs from "../../data/langs.json";
import fs from "fs";

interface Repo {
  id: string;
  name: string;
  url: string;
  isPrivate: number;
}

interface RepoLang {
  repo_id: string;
  language_id: number;
}

export default class RepoController {

  constructor() {};

  getAllRepos = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json(repos);
  }

  getRepo = async (req: Request, res: Response): Promise<void> => {
    const repoID = req.params.id;

    const repo = repos.find((e) => e.id === repoID) as Repo;

    res.status(200).send(repo);
  }

  getAllLangsByRepo = async (req: Request, res: Response): Promise<void> => {
    const repoID = req.params.id;

    const foundRepos: RepoLang[] = repoLang.filter((e) => e.repo_id === repoID);

    res.status(200).send(foundRepos);
  }

  postRepo = async (req: Request, res: Response): Promise<void> => {
    const repoData: Repo = req.body;

    repos.push(repoData);

    fs.writeFile(
      './api/data/repos.json',
      JSON.stringify(repos),
      (err) =>
        err ? console.error(err) : console.log("File repo has been updated.")
    )

    res.status(200).send(repoData);
  }

  addLangToRepo = async (req: Request, res: Response): Promise<void> => {
    const repoID = req.params.id;
    const lang = req.body.name;

    const foundLang = langs.find((e) => e.name === lang);

    if (!foundLang) {
      throw new Error(`Language ${req.body.name} doesn't exist.`);
    }

    const foundRepo = repoLang.find((e) => e.repo_id === repoID && e.language_id === foundLang.id);

    if (foundRepo) {
      throw new Error("The repo already uses this language.");
    }

    const data: RepoLang = {
      repo_id: repoID,
      language_id: foundLang.id
    }

    repoLang.push(data);

    fs.writeFile(
      './api/data/repoLang.json',
      JSON.stringify(repoLang),
      (err) =>
        err ? console.error(err) : console.log(`New language added to repo ${repoID}.`)
    )

    res.status(200).send(data);
  }
}