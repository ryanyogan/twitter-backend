import { GraphQLServer } from 'graphql-yoga';
import { Prisma } from 'prisma-binding';

import Query from './resolvers/Query';
import Feed from './resolvers/Feed';
import Mutation from './resolvers/Mutation';

const resolvers = {
  Query,
  Feed,
  Mutation,
};

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: req => ({
    ...req,
    db: new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint:
        'https://us1.prisma.sh/public-quarkdonkey-995/twitter-backend/dev', // the endpoint of the Prisma DB service
      secret: 'mysecret123', // specified in database/prisma.yml
      debug: true, // log all GraphQL queryies & mutations
    }),
  }),
});

server.start(() => console.log('Server is running on http://localhost:4000'));
