import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

interface RouteErrorReq {
  message: string;
  status?: number;
}

function Error() {
  const error = useRouteError() as RouteErrorReq;

  return (
    <div>
      <h1>Something went wrong 😢 </h1>
      {error && (
        <div>
          <p>
            Error message: {error.message}
          </p>
          {error.status ? `Status code: ${error.status} - ${error.message}` : error.message}
        </div>
      )}
      <LinkButton to="-1">&larr; Go back</LinkButton>

    </div>
  )
}

export default Error;
