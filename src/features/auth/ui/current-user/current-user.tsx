import { Link } from '@tanstack/react-router';
import s from '../account-bar.module.css';
import { useMeQuery } from '../../api/use-me-query';
import { LogoutButton } from '../logout-button/logout-button';

export const CurrentUser = () => {
  const query = useMeQuery();

  if (!query.data) return <span>...</span>;

  return (
    <div className={s.meInfoContainer}>
      <Link to="/my-playlists" activeOptions={{ exact: true }}>
        {query.data.login}
      </Link>

      <LogoutButton />
    </div>
  );
};
