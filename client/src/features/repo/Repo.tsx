import Language from "./Language";
import { Lang } from "./RepoList";

function Repo({ repo }) {
  return (
    <div className="flex flex-col items-start p-5 border w-48 h-64">
      <h1 className="font-semibold mb-1">
        {repo.name}
      </h1>
      <div className="italic text-purple-400 hover:text-purple-700 mb-1">
        <a
          href={repo.url} 
          target="_blank" 
          className="visited:text-blue-800"
        >
          See repo
        </a>
      </div>
      <div className="flex items-start">
        {repo.status.id === 1 ? "Private" : "Public"} {repo.status.id === 1 ? "🔒" : "🔓"}
      </div>
      <div className="flex items-end w-full h-full">
        <div className="flex w-full items-end">
          <ul className="flex flex-wrap-reverse h-full">
            {repo.languages.map((lang: Lang) => (
              <Language
                lang={lang}
                key={lang.id}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Repo;
