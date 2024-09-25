import { Request, Response } from "express";
import fs from "fs";
import langs from "../../data/langs.json";

interface Lang {
  id: number;
  name: string;
};

export default class LangController {

  constructor() {}

  getAllLangs = async (req: Request, res: Response): Promise<void> => {
    res.status(200).json(langs);
  }

  getLang = async (req: Request, res: Response): Promise<void> => {
    const langID = parseInt(req.params.id);

    const lang = langs.find((e) => e.id === langID) as Lang;

    res.status(200).send(lang);
  }

  postLang = async (req: Request, res: Response): Promise<void> => {
    const data: Omit<Lang, "id"> = req.body;

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
}