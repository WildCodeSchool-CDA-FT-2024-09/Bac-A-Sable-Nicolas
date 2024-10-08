import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  repos: []
}

const repoSlice = createSlice({
  name: "repo",
  initialState,
  reducers: {
    setRepos(state, action) {
      state.repos = action.payload;
    },
    addRepo(state, action) {
      state.repos.push(action.payload);
    },
    deleteRepo(state, action) {
      state.repos = state.repos.filter((repo) => repo.id !== action.payload);
    }
  }
});

export const {
  setRepos,
  addRepo,
  deleteRepo
} = repoSlice.actions;

export default repoSlice.reducer;