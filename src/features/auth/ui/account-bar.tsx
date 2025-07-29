import { LoginButton } from './login-button/login-button';
import { useMeQuery } from '../api/use-me-query';
import { CurrentUser } from './current-user/current-user';

export const AccountBar = () => {
  const query = useMeQuery();
  return (
    <div>
      {!query.data && <LoginButton />}
      {query.data && <CurrentUser />}
    </div>
  );
};
