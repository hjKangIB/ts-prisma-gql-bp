// const { ApolloServer, gql } = require('apollo-server');

import { objectType, intArg, nonNull } from 'nexus';
import { User } from '../graphql';

export const Query = objectType({
  name: 'Query',
  definition(t) {
    t.list.field('users', {
      type: User,
      args: {
        id: nonNull(intArg()),
      },
      resolve: async (parent, args, context) => {
        const ret = await context.prisma.user.findMany({
          where: {
            id: args.id,
          },
        });
        return ret;
      },
    });
  },
});
