import { getUser } from 'utils/user';

const getAuthorizationHeader = (): string => {
  const user = getUser();

  return `Bearer ${user ? user.accessToken : ''}`;
};

const getRefreshToken = (): string => {
  const user = getUser();

  return user ? user.refreshToken : '';
};

export { getAuthorizationHeader, getRefreshToken };
