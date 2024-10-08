import { useDispatch } from "react-redux";
import { getRepos } from "../../services/apiRepo";
import Repo from "./Repo";
import { useLoaderData } from "react-router-dom";
import { setRepos } from "./repoSlice";
import { useEffect } from "react";

export interface Repo {
  id: string;
  name: string;
  url: string;
  status: Status[],
  languages?: Lang[]
}

export interface Status {
  id: number;
  name: string;
}

export interface Lang {
  id: number;
  name: string;
}

export default function RepoList() {
  const repos = useLoaderData() as Repo[];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setRepos(repos));
  }, [repos, dispatch]);
  
  return (
    <div className="flex flex-wrap gap-2 justify-center my-3">
      {repos.map((repo: Repo) => (
        <Repo 
          repo={repo} 
          key={repo.id}
        />
      ))}
    </div>
  )
}

export async function loader(): Promise<Repo[]> {
  const repos: Repo[] = await getRepos();
  return repos;
}
