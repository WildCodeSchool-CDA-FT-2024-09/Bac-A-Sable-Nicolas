import { useDispatch } from "react-redux";
import { GET_REPOS } from "../../services/apiRepo";
import Repo from "./Repo";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { setRepos } from "./repoSlice";

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
  const { loading, error, data } = useQuery(GET_REPOS);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data && data.getRepos) {
      dispatch(setRepos(data.getRepos));
    }
  }, []);

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error</div>
  
  return (
    <div className="flex flex-wrap gap-2 justify-center my-3">
      {data.getRepos.map((repo: Repo) => (
        <Repo 
          repo={repo} 
          key={repo.id}
        />
      ))}
    </div>
  )
}
