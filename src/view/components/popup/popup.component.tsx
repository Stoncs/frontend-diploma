import classNames from "classnames";
import React from "react";
import { useNavigate } from "react-router";
import { unsetPopup } from "~/redux/actions/popup";
import { useAppDispatch } from "~/redux/hooks";
import { PopupDetails } from "~/redux/types";

import styles from "./popup.scss";

export default function Popup({ header, message, type, page }: PopupDetails) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <>
      <div
        className={classNames(styles.container, {
          [styles.container__normal]: type === "normal",
          [styles.container__error]: type === "error",
        })}
      >
        <div className={styles.content}>
          <h2>{header}</h2>
          <p>{message}</p>
          <button
            className={classNames(styles.button, {
              [styles.button__normal]: type === "normal",
              [styles.button__error]: type === "error",
            })}
            onClick={(e) => {
              // Обнулить содержимое попапа, т.е. выключить попап
              dispatch(unsetPopup(null));
              // Если есть страница для перехода, то перейти на неё
              page ? navigate(page) : "";
            }}
          >
            OK
          </button>
        </div>
      </div>
      <div className={styles.backdrop} />
    </>
  );
}
