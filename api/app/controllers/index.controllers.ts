import LangController from "./LangController";
import RepoController from "./RepoController";
import StatusController from "./StatusController";

const repoController = new RepoController();
const langController = new LangController();
const statusController = new StatusController();

export {
  repoController,
  langController,
  statusController
}