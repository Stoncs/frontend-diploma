import { Outlet } from 'react-router';
import { NavLink } from 'react-router-dom';

import styles from './empty.style.scss';

export const EmptyLayout: React.FC = () => {
  return (
    <main className={styles.layout}>
      <Outlet />
      <NavLink to={'/'}>На главную</NavLink>
    </main>
  );
};
