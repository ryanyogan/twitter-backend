const createTweet = (parent, { body }, ctx, info) =>
  ctx.db.mutation.createTweet({ data: { body } }, info);

export default { createTweet };
