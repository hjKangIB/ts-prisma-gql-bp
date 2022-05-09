import { ApolloServer } from 'apollo-server';
import path from 'path';
import { makeSchema } from 'nexus';
import { context } from './context';

import * as types from './index';

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
// const server = new ApolloServer({ typeDefs, resolvers });

const server = new ApolloServer({
  schema: makeSchema({
    types,
    outputs: {
      schema: path.join(__dirname, '/generated/schema.graphql'),
      typegen: path.join(__dirname, '/generated/nexus-typegen.d.ts'),
    },
    contextType: {
      // 1
      module: path.join(__dirname, './context.ts'), // 2
      export: 'Context', // 3
    },
    // sourceTypes: {
    //   modules: [
    //     {
    //       module: '@prisma/client',
    //       alias: 'prisma',
    //     },
    //   ],
    // },
  }),
  context,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
