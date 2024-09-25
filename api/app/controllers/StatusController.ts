import { Request, Response } from "express";
import fs from "fs";
import status from "../../data/status.json";

interface Status {
  id: number;
  name: string;
}

export default class StatusController {

  constructor() {}

  getAllStatus = async (req: Request, res: Response): Promise<void> => {
    res.status(200).send(status);
  }

  getStatus = async (req: Request, res: Response): Promise<void> => {
    const statusID = parseInt(req.params.id);

    const foundStatus = status.find((e) => e.id === statusID) as Status;

    res.status(200).send(foundStatus);
  }

  postStatus = async (req: Request, res: Response): Promise<void> => {
    const data: Omit<Status, "id"> = req.body;

    const statusData: Status = {
      id: status.length + 1,
      ...data
    }

    status.push(statusData);

    fs.writeFile(
      './api/data/status.json',
      JSON.stringify(status),
      (err) =>
        err ? console.error(err) : console.log("File status has been updated.")
    )

    res.status(200).send(statusData);
  }
}