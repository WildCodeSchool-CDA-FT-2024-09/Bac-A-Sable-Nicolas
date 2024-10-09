import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { dataSource } from './database/client';
import { buildSchema } from 'type-graphql';
import "reflect-metadata";
import RepoResolver from './resolvers/repo.resolver';
import LangResolver from './resolvers/lang.resolver';
import StatusResolver from './resolvers/status.resolver';

const PORT = parseInt(process.env.PORT);

(async () => {
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [RepoResolver, LangResolver, StatusResolver]
  })

  const server = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(
    server, {
      listen: {
        port: PORT
      }
    }
  );
  console.log(`GraphQL server ready at ${url}`);
})();

