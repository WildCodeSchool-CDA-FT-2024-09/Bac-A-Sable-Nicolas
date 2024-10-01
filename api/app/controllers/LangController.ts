import { Request, Response } from "express";
import fs from "fs";
import langs from "../../data/langs.json";
import repoLang from "../../data/repoLang.json";
import { BadRequestError } from "../errors/BadRequestError.error";
import { NotFoundError } from "../errors/NotFoundError.error";

interface Lang {
  id: number;
  name: string;
};

export default class LangController {

  constructor() {}

  getAllLangs = async (req: Request, res: Response): Promise<void> => {
    const filteredLangs = langs.filter((e) => e.name != "");
    res.status(200).json(filteredLangs);
  }

  getLang = async (req: Request, res: Response): Promise<void> => {
    const langID = parseInt(req.params.id);

    const lang = langs.find((e) => e.id === langID) as Lang;

    if (lang) {
      res.status(200).send(lang);
    } else {
      throw new NotFoundError();
    }

  }

  postLang = async (req: Request, res: Response): Promise<void> => {
    const data: Omit<Lang, "id"> = req.body;

    const checkName = langs.find((e) => e.name === data.name);

    if (checkName) {
      throw new BadRequestError("Provided name is already being used");
    }

    const langData: Lang = {
      id: langs.length + 1,
      ...data
    }

    langs.push(langData);

    fs.writeFile(
      './api/data/langs.json',
      JSON.stringify(langs),
      (err) =>
        err ? console.error(err) : console.log("File langs has been updated.")
    )

    res.status(200).send(langData);
  }

  deleteLang = async (req: Request, res: Response): Promise<void> => {
    const langID: Lang["id"] = parseInt(req.params.id);

    const foundLang = langs.find((e) => e.id === langID);

    if (!foundLang) {
      throw new NotFoundError();
    }

    const langIndex = langs.findIndex((obj) => obj.id === langID);
    langs[langIndex].name = "";

    const deletedRepoLang = repoLang.filter((e) => e.language_id != langID);

    fs.writeFile(
      './api/data/langs.json',
      JSON.stringify(langs),
      (err) =>
        err ? console.error(err) : console.log(`Language ${langID} deleted successfuly`)
    )

    fs.writeFile(
      './api/data/repoLang.json',
      JSON.stringify(deletedRepoLang),
      (err) =>
        err ? console.error(err) : console.log(`Repo's associated language ${langID} deleted successfuly`)
    )

    res.status(204).send();
  }

  putLang = async (req: Request, res: Response): Promise<void> => {
    const langID: Lang["id"] = parseInt(req.params.id);
    let data: Omit<Lang, "id"> = req.body;

    const checkName = langs.find((e) => e.name === data.name);

    if (checkName) {
      throw new BadRequestError("Provided name already in use")
    }

    const langIndex = langs.findIndex((e) => e.id === langID);
    
    if (langIndex === -1) {
      throw new NotFoundError();
    }

    Object.assign(langs[langIndex], data);
  
    fs.writeFile(
      './api/data/langs.json',
      JSON.stringify(langs),
      (err) =>
        err ? console.error(err) : console.log("File langs has been updated.")
    );
  
    res.status(200).send(langs[langIndex]);
  }
}