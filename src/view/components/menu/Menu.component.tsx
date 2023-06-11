import React from "react";
import { useNavigate } from "react-router";

import { useAppDispatch } from "../../../redux/hooks";
import { unsetMenu } from "../../../redux/actions/menu";
import { DEVICES_ROUTE, PROFILE_ROUTE } from "../../../utils/consts";

import styles from "./menu.scss";

export const Menu = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onClickItem = (page: string) => {
    dispatch(unsetMenu());
    navigate(page);
  };
  return (
    <>
      <div className={styles.container}>
        <h2>Меню</h2>
        <div className={styles.menu}>
          <div
            className={styles.menu__item}
            onClick={() => onClickItem(PROFILE_ROUTE)}
          >
            Профиль
          </div>
          <div
            className={styles.menu__item}
            onClick={() => onClickItem(DEVICES_ROUTE)}
          >
            Доступные устройства
          </div>
          <div className={styles.menu__item}>Статистика</div>
        </div>
        <div className={styles.x} onClick={() => dispatch(unsetMenu())}>
          x
        </div>
      </div>
      <div className={styles.backdrop} onClick={() => dispatch(unsetMenu())} />
    </>
  );
};
