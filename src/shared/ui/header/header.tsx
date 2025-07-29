import { Link } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import s from './header.module.css';

type Props = {
  renderAccountBar: () => ReactNode;
};

export const Header = ({ renderAccountBar }: Props) => (
  <header className={s.header}>
    <div className={s.container}>
      <div className={s.linksBlock}>
        <Link to="/">Playlists</Link>
      </div>
      <div>{renderAccountBar()}</div>
    </div>
  </header>
);
