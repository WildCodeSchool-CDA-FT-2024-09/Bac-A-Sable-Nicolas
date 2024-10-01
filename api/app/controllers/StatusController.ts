import { Request, Response } from "express";
import fs from "fs";
import status from "../../data/status.json";
import repos from "../../data/repos.json";
import { BadRequestError } from "../errors/BadRequestError.error";
import { NotFoundError } from "../errors/NotFoundError.error";

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

    if (foundStatus) {
      res.status(200).send(foundStatus);
    } else {
      throw new NotFoundError();
    }
    
  }

  postStatus = async (req: Request, res: Response): Promise<void> => {
    const data: Omit<Status, "id"> = req.body;

    const checkName = status.find((e) => e.name === data.name);

    if (checkName) {
      throw new BadRequestError("Provided name is already being used")
    }

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

  deleteStatus = async (req: Request, res: Response): Promise<void> => {
    const statusID = parseInt(req.params.id);

    const foundStatus = status.find((e) => e.id === statusID);

    if (!foundStatus) {
      throw new NotFoundError();
    }

    const checkStatus = repos.find((e) => e.isPrivate === statusID);

    if (checkStatus?.name === "") {
      throw new BadRequestError("Status id is inactive.");
    } else if (checkStatus) {
      throw new BadRequestError("Status is currently being used")
    }

    const statusIndex = status.findIndex((e) => e.id === statusID);
    status[statusIndex].name = "";

    fs.writeFile(
      './api/data/status.json',
      JSON.stringify(status),
      (err) =>
        err ? console.error(err) : console.log(`Status ${statusID} deleted successfuly`)
    )

    res.status(200).send();
  }

  putStatus = async (req: Request, res: Response): Promise<void> => {
    const statusID: Status["id"] = parseInt(req.params.id);
    let data: Omit<Status, "id"> = req.body;

    const checkName = status.find((e) => e.name === data.name);

    if (checkName) {
      throw new BadRequestError("Provided name already in use")
    }

    const statusIndex = status.findIndex((e) => e.id === statusID);
    
    if (statusIndex === -1) {
      throw new NotFoundError();
    }

    Object.assign(status[statusIndex], data);
  
    fs.writeFile(
      './api/data/status.json',
      JSON.stringify(status),
      (err) =>
        err ? console.error(err) : console.log("File status has been updated.")
    );
  
    res.status(200).send(status[statusIndex]);
  }
}