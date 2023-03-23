import classNames from "classnames";
import React from "react";
import { unsetPopup } from "~/redux/actions/popup";
import { useAppDispatch } from "~/redux/hooks";
import { PopupDetails } from "~/redux/types";

import styles from "./popup.scss";

export default function Popup({ header, message, type }: PopupDetails) {
  const dispatch = useAppDispatch();
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
            onClick={(e) => dispatch(unsetPopup(null))}
          >
            OK
          </button>
        </div>
      </div>
      <div className={styles.backdrop} />
    </>
  );
}
