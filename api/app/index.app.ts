// import express, { json } from "express";
// import "dotenv/config";
// import router from "./routers/index.router";
// import { errorHandler } from "./middlewares/errorHandler.middleware";
// import { dataSource } from "./database/client";
// import cors from "cors";

// const app = express();

// const corsOptions = {
//   credentials: true,
//   origin: process.env.CLIENT_URL,
//   allowedHeaders: [
//     "Content-type"
//   ]
// }

// app.use(cors(corsOptions));

// app.use(json());

// app.use(router);

// app.use(errorHandler);

// const PORT = process.env.PORT;

// app.listen(PORT, async () => {
//   await dataSource.initialize();
//   console.log(`Server is listening on http://localhost:${PORT}`);
// })

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import repos from "../data/repos.json";
import langs from "../data/langs.json";
import status from "../data/status.json";

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Repo {
    id: String
    name: String
    url: String
    isFavorite: Boolean
  }

  type Lang {
    id: Int
    name: String
  }

  type Status {
    id: Int
    name: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    repos: [Repo]
    langs: [Lang]
    status: [Status]
  }
`;

const resolvers = {
  Query: {
    repos: () => repos,
    langs: () => langs,
    status: () => status
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

(async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();