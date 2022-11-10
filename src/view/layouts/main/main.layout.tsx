import { Outlet } from 'react-router';

import logo from '../../../assets/logo_lab.png';
import { Navbar } from '../../components/navbar/navbar.component';

import styles from './main.style.scss';

const NAVBAR_ITEMS = [
  { title: 'Правила', link: '/' },
  { title: 'Пример Redux', link: 'redux' },
  { title: 'Другой layout', link: 'empty' },
];

export const MainLayout: React.FC = () => {
  return (
    <div className={styles.layout}>
      <header className={styles.layout__header}>
        <div className={styles.layout__header__logo}>
          <img src={logo} alt="" />
        </div>

        <h1 className={styles.layout__header__title}>PSPOD SPA Template</h1>
      </header>
      <Navbar items={NAVBAR_ITEMS} />
      <main className={styles.layout__main}>
        <Outlet />
      </main>
    </div>
  );
};
