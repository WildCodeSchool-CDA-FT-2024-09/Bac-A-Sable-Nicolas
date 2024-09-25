import fs from "fs";

type Repo = {
  id: string;
  name: string;
  url: string;
  isPrivate: number;
}

type Lang = {
  id: number;
  name: string;
}

type RepoLang = {
  repo_id: string;
  language_id: number;
}

(async() => {
  const raw = await JSON.parse(
    fs.readFileSync("./api/data/raw.json", { encoding: "utf-8"})
  )


  const repo: Repo[] = raw.map((rep: { id: string; isPrivate: boolean; name: string; url: string}) => ({
    id: rep.id,
    isPrivate: rep.isPrivate ? 1 : 2,
    name: rep.name,
    url: rep.url
  }))

  const langs: Lang[] = [];
  const repoLang: RepoLang[] = [];
  let langId: number = 1;
  raw.forEach((rep: any) => {
    rep.languages.forEach((lang: { node: { name: string}}) => {
      if (!langs.some((lg: Lang) => lg.name === lang.node.name)) {

        langs.push({id: langId, name: lang.node.name });
        langId++;
      }

      const languageId = langs.map((e) => e.name).indexOf(lang.node.name) + 1;
      repoLang.push({ repo_id: rep.id, language_id: languageId });

    })
  })

  fs.writeFile(
    './api/data/repos.json',
    JSON.stringify(repo),
    (err) =>
      err ? console.error(err) : console.log("File repo is ready")
  )

  fs.writeFile(
    './api/data/langs.json',
    JSON.stringify(langs),
    (err) =>
      err ? console.error(err) : console.log("File langs is ready")
  )

  fs.writeFile(
    './api/data/status.json',
    JSON.stringify([{
      id: 1, label: "Privé"
    }, { id: 2, label: "Public"}]),
    (err) =>
      err ? console.error(err) : console.log("File status is ready")
  )

  fs.writeFile(
    './api/data/repoLang.json',
    JSON.stringify(repoLang),
    (err) =>
      err ? console.error(err) : console.log("File repoLang is ready")
  )
})()
