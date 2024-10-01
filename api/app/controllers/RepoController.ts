import { Request, Response } from "express";
import { validate } from "class-validator";
import repos from "../../data/repos.json";
import repoLang from "../../data/repoLang.json";
import fs from "fs";
import { makeRandomString } from "../helpers/makeRandomString.helper";
import { BadRequestError } from "../errors/BadRequestError.error";
import { NotFoundError } from "../errors/NotFoundError.error";
import { Repo } from "../entities/Repo.entity";
import { Status } from "../entities/Status.entity";
import { Lang } from "../entities/index.entites";

interface RepoReq {
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
    const repos = await Repo.find({
      relations: {
        status: true,
        languages: true
      }
    });
    res.status(200).json(repos);
  }

  getRepo = async (req: Request, res: Response): Promise<void> => {
    const repoID = req.params.id;

    const repo = repos.find((e) => e.id === repoID) as RepoReq;

    if (repo) {
      res.status(200).send(repo);
    } else {
      throw new NotFoundError();
    }
 
  }

  getAllLangsByRepo = async (req: Request, res: Response): Promise<void> => {
    const repoID = req.params.id;

    const foundRepo = repos.find((e) => e.id === repoID) as RepoReq;

    if (!foundRepo) {
      throw new NotFoundError();
    }

    const foundRepos: RepoLang[] = repoLang.filter((e) => e.repo_id === repoID);

    res.status(200).send(foundRepos);
  }

  postRepo = async (req: Request, res: Response): Promise<void> => {
    const data: Omit<RepoReq, "id"|"url"> = req.body;
    const repo = new Repo();

    const repoID = makeRandomString(12);

    const repoURL = "https://github.com/NicolasSokolowski/" + data.name.replace(/ /g, '');

    const statusBool = await Status.findOneOrFail({
      where: {
        id: data.isPrivate
      }
    })

    repo.id = repoID;
    repo.name = data.name;
    repo.url = repoURL;
    repo.status = statusBool;

    const error = await validate(repo);
    if (error.length > 0) {
      console.error(error);
      throw new BadRequestError("Invalid data"); // Need to create a custom 422 error
    } else {
      await repo.save();
      res.status(201).send(repo);
    }

  }

  addLangToRepo = async (req: Request, res: Response): Promise<void> => {
    const repoID = req.params.id;
    const dataLang = req.body.name;

    const repo = await Repo.findOne({
      where: {
        id: repoID
      },
      relations: [
        "status",
        "languages"
      ]
    })

    if (!repo) {
      throw new NotFoundError();
    }

    const lang = await Lang.findOne({
      where: {
        name: dataLang
      }
    })

    if (!lang) {
      throw new NotFoundError();
    }

    const checkRepoLang = repo.languages.find((e) => e.id === lang.id);

    if (!checkRepoLang) {
      repo.languages.push(lang);
      await repo.save();

      res.status(200).send({ message: `Language ${lang.name} added to repo ${repo.id} successfully.`});
    } else {
      throw new BadRequestError(`The repo ${repo.id} already uses language ${lang.name}`)
    }

    
  }

  deleteRepo = async (req: Request, res: Response): Promise<void> => {
    const repoID: RepoReq["id"] = req.params.id;

    const foundRepo = repos.find((e) => e.id === repoID) as RepoReq;

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
    const repoID: RepoReq["id"] = req.params.id;
    let data: Omit<RepoReq, "id"> = req.body;

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