import { UserSessionRes } from '_types/public-api';
import { StoreUser } from './user.slice.types';
import { emptyUser } from './user.slice.constants';

export function expandUser(received: UserSessionRes): StoreUser {
  if (received.state === 'visitor') {
    return emptyUser;
  }

  const { username } = received;
  const userSlug = username.toLowerCase();

  const expanded: StoreUser = {
    ...received,
    userSlug,
    userUrl: `u/${userSlug}`,
    userStylizedUrl: `u/${username}`,
  };

  return expanded;
}
