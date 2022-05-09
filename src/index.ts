// const { ApolloServer, gql } = require('apollo-server');

import { gql } from 'apollo-server';
import { objectType, inputObjectType, arg, intArg, nonNull } from 'nexus';

export const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id');
    t.string('email');
    t.string('name');
    t.string('password');
  },
});

const UserWhereUniqueInput = inputObjectType({
  name: 'UserWhereUniqueInput',
  definition(t) {
    t.int('id');
  },
});

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
