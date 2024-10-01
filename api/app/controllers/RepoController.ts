import { Request, Response } from "express";
import repos from "../../data/repos.json";
import repoLang from "../../data/repoLang.json";
import langs from "../../data/langs.json";
import fs from "fs";
import { makeRandomString } from "../helpers/makeRandomString.helper";
import { BadRequestError } from "../errors/BadRequestError.error";
import { NotFoundError } from "../errors/NotFoundError.error";

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

    if (repo) {
      res.status(200).send(repo);
    } else {
      throw new NotFoundError();
    }
 
  }

  getAllLangsByRepo = async (req: Request, res: Response): Promise<void> => {
    const repoID = req.params.id;

    const foundRepo = repos.find((e) => e.id === repoID) as Repo;

    if (!foundRepo) {
      throw new NotFoundError();
    }

    const foundRepos: RepoLang[] = repoLang.filter((e) => e.repo_id === repoID);

    res.status(200).send(foundRepos);
  }

  postRepo = async (req: Request, res: Response): Promise<void> => {
    const data: Omit<Repo, "id"|"url"> = req.body;

    const checkName = repos.find((e) => e.name === data.name);

    if (checkName) {
      throw new BadRequestError("Provided name is already being used")
    }

    const repoID = makeRandomString(12);

    const repoURL = "https://github.com/NicolasSokolowski/" + data.name.replace(/ /g, '');

    const repoData: Repo = {
      id: repoID,
      url: repoURL,
      ...data
    }

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

    const foundRepo = repos.find((e) => e.id === repoID) as Repo;

    if (!foundRepo) {
      throw new NotFoundError();
    }

    const foundLang = langs.find((e) => e.name === lang);

    if (!foundLang) {
      throw new NotFoundError();
    }

    const foundRepoLang = repoLang.find((e) => e.repo_id === repoID && e.language_id === foundLang.id);

    if (foundRepoLang) {
      throw new BadRequestError("The repo already uses this language.");
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

  deleteRepo = async (req: Request, res: Response): Promise<void> => {
    const repoID: Repo["id"] = req.params.id;

    const foundRepo = repos.find((e) => e.id === repoID) as Repo;

    if (!foundRepo) {
      throw new NotFoundError();
    }

    const deletedRepo = repos.filter((e) => e.id != repoID);
    const deletedRepoLang = repoLang.filter((e) => e.repo_id != repoID);

    fs.writeFile(
      './api/data/repos.json',
      JSON.stringify(deletedRepo),
      (err) =>
        err ? console.error(err) : console.log(`Repo ${repoID} deleted successfuly`)
    )

    fs.writeFile(
      './api/data/repoLang.json',
      JSON.stringify(deletedRepoLang),
      (err) =>
        err ? console.error(err) : console.log(`Repo ${repoID}'s languages deleted successfuly`)
    )

    res.status(204).send();
  }

  putRepo = async (req: Request, res: Response): Promise<void> => {
    const repoID: Repo["id"] = req.params.id;
    let data: Omit<Repo, "id"> = req.body;

    const checkName = repos.find((e) => e.name === data.name);

    if (checkName) {
      throw new BadRequestError("Provided name already in use")
    }

    const repoIndex = repos.findIndex((e) => e.id === repoID);
    
    if (repoIndex === -1) {
      throw new NotFoundError();
    }

    const repoURL = "https://github.com/NicolasSokolowski/" + data.name.replace(/ /g, '');

    data = {
      ...data,
      url: repoURL
    }

    Object.assign(repos[repoIndex], data);
  
    fs.writeFile(
      './api/data/repos.json',
      JSON.stringify(repos),
      (err) =>
        err ? console.error(err) : console.log("File repo has been updated.")
    );
  
    res.status(200).send(repos[repoIndex]);
  }
  
}