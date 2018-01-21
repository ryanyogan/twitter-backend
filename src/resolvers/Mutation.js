import { hash, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TEMP_APP_SECRET } from '../config/constants';
import { getUserId } from '../utils/index';

const createTweet = async (parent, { body }, ctx, info) => {
  const userId = await getUserId(ctx);
  return ctx.db.mutation.createTweet(
    {
      data: {
        body,
        postedBy: {
          connect: { id: userId },
        },
        stats: {
          create: {
            views: 0,
            likes: 0,
            retweets: 0,
            responses: 0,
          },
        },
      },
    },
    info,
  );
};

const signup = async (parent, args, ctx) => {
  const password = await hash(args.password, 10);
  const [firstName, lastName] = args.fullName.split(' ');
  const user = await ctx.db.mutation.createUser({
    data: { ...args, firstName, lastName, password },
  });

  const token = jwt.sign({ userId: user.id }, TEMP_APP_SECRET);
  return {
    token,
    user,
  };
};

const login = async (parent, args, ctx) => {
  const user = await ctx.db.query.user({ where: { email: args.email } });
  if (!user) {
    throw new Error(`Could not find a user with email: ${args.email}`);
  }

  const valid = await compare(args.password, user.password);
  if (!valid) {
    throw new Error('Invalid Password');
  }

  const token = jwt.sign({ userId: user.id }, TEMP_APP_SECRET);
  return {
    token,
    user,
  };
};

export default { createTweet, signup, login };
