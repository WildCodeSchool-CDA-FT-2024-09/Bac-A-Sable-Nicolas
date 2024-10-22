import { dataSource } from "./client";
import { Lang, Status, Repo } from "../entities/index.entites";
import { langs, status, repos, repoLang } from "../../data/index.data";

(async () => {
  await dataSource.initialize();
  const queryRunner = dataSource.createQueryRunner();

  try {
    await queryRunner.startTransaction();
    await queryRunner.query("DELETE FROM repo_languages_lang");
    await queryRunner.query("DELETE FROM lang");
    await queryRunner.query("DELETE FROM repo");
    await queryRunner.query("DELETE FROM status");

    await queryRunner.query("DELETE FROM sqlite_sequence WHERE name='status' OR name='lang'");

    const savedLangs = await Promise.all(
      langs.map(async (e) => {
        const lang = new Lang();
        lang.name = e.name;

        return await lang.save();
      })
    )

    const savedStatus = await Promise.all(
      status.map(async (e) => {
        const status = new Status();
        status.name = e.name;

        return await status.save();
      })
    )

    await Promise.all(
      repos.map(async (e) => {
        const repo = new Repo();
        repo.id = e.id;
        repo.name = e.name;
        repo.url = e.url;

        const status = savedStatus.find((st) => st.id === e.isPrivate) as Status;
        repo.status = status;

        const repoLangs = savedLangs.filter((sl) => {
          const associatedLang = repoLang.filter((lr) => lr.repo_id === e.id);
          const langName = langs.filter((l) => associatedLang.some((al) => al.language_id === l.id));
          return langName.some((ln) => ln.name === sl.name);
        })
        repo.languages = repoLangs;

        return await repo.save();
      })
    )

    await queryRunner.commitTransaction();

  } catch (err) {
    console.error(err);
    await queryRunner.rollbackTransaction();
  }
})();