import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import RepoList from "./features/repo/RepoList";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <RepoList />,
        errorElement: <Error />
      },
      // {
      //   path: "/:repoID",
      //   element: <RepoDetails />,
      //   loader: detailsLoader,
      //   errorElement: <Error />
      // }
    ]
  }
])

function App() {
  return <RouterProvider router={router} />
}

export default App;
