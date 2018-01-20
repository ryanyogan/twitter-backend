const tweets = ({ tweetIds }, args, ctx, info) =>
  ctx.db.query.tweets({ where: { id_in: tweetIds } }, info);

export default { tweets };
