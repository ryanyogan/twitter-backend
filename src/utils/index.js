import jwt from 'jsonwebtoken';
import { TEMP_APP_SECRET } from '../config/constants';

export const getUserId = ctx => {
  const Authorization = ctx.request.get('Authorization');
  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = jwt.verify(token, TEMP_APP_SECRET);
    return userId;
  }

  throw new Error('Not Authenticated');
};
