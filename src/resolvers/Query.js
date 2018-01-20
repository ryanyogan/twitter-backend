const feed = async (parent, { filter, first, skip, orderBy }, ctx) => {
  const where = filter ? { body_contains: filter } : {};

  const allTweets = await ctx.db.query.tweets({});
  const count = allTweets.length;

  const queriedTweets = await ctx.db.query.tweets({
    first,
    skip,
    where,
    orderBy,
  });

  return {
    tweetIds: queriedTweets.map(tweet => tweet.id),
    count,
  };
};

const tweet = async (parent, { id }, ctx, info) =>
  await ctx.db.query.tweet({ where: { id } }, info);

export default { feed, tweet };
