import { NavLink } from 'react-router-dom';
import classNames from 'classnames';

import { NavbarProps } from './navbar.type';
import styles from './navbar.style.scss';

export const Navbar = ({ items }: NavbarProps) => {
  return (
    <div className={styles.navbar}>
      {items.map(({ link, title }) => (
        <NavLink
          to={link}
          key={link}
          className={({ isActive }) =>
            classNames(styles.navbar__item, { [styles.active]: isActive })
          }
        >
          {title}
        </NavLink>
      ))}
    </div>
  );
};
