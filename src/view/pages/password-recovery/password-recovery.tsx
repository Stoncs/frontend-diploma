import { AxiosError } from "axios";
import React, { FormEvent } from "react";
import { useIntl } from "react-intl";
import { useNavigate } from "react-router";

import { sendEmail } from "../../../http/api";
import { setPopup } from "../../../redux/actions/popup";
import { useAppDispatch } from "../../../redux/hooks";
import { LOGIN_ROUTE } from "../../../utils/consts";

import styles from "./password-recovery.scss";

export const PasswordRecovery = () => {
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const intl = useIntl();
  // Если успешно, выводить, что сообщение отправлено
  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await sendEmail(email);
      dispatch(
        setPopup({
          header: "Успешно!",
          message: "Для восстановления пароля проверьте почу.",
          type: "normal",
          page: LOGIN_ROUTE,
        })
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        if (
          error.response?.data.message.includes("User not found with email")
        ) {
          dispatch(
            setPopup({
              header: intl.formatMessage({ id: "error" }),
              message: intl.formatMessage({ id: "errEmailNotFound" }),
              type: "error",
            })
          );
        }
      } else {
        dispatch(
          setPopup({
            header: intl.formatMessage({ id: "error" }),
            message: intl.formatMessage({ id: "errUnexpected" }),
            type: "error",
          })
        );
      }
    }
  };

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        method="post"
        onSubmit={(e) => onFormSubmit(e)}
      >
        <div className={styles.form__header}>
          <h1>{intl.formatMessage({ id: "recoveryPasswordHeader" })}</h1>
        </div>

        <div className={styles.form__input}>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={intl.formatMessage({ id: "enterEmail" })}
            autoFocus
          />
        </div>

        <div className={styles.form__buttons}>
          <button type="submit">
            {intl.formatMessage({ id: "recoveryPasswordButton" })}
          </button>
        </div>

        <button
          onClick={() => navigate(LOGIN_ROUTE)}
          className={styles.button__back}
        >
          {"<-"}
        </button>
      </form>
    </div>
  );
};
