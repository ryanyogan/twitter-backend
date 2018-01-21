import { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TEMP_APP_SECRET } from '../config/constants';

const createTweet = (parent, { body }, ctx, info) =>
  ctx.db.mutation.createTweet({ data: { body } }, info);

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

export default { createTweet, signup };
