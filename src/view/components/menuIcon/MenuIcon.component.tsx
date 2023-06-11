import React from "react";

import styles from "./menuIcon.scss";
import { useAppDispatch } from "../../../redux/hooks";
import { setMenu } from "../../../redux/actions/menu";

export const MenuIcon = () => {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.burger} onClick={() => dispatch(setMenu())}>
      <span />
    </div>
  );
};
