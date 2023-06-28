import { ApolloServer, ApolloServerOptions } from '@apollo/server';
import { resolvers } from './schema/resolvers.generated';
import { typeDefs } from './schema/typeDefs.generated';

async function bootstrap() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  server.listen(3000).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
}

bootstrap();
