import React from "react";
import { AxiosError, isAxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";

import { logIn } from "../../../http/api";
import { useAppDispatch } from "../../../redux/hooks";
import { setUser } from "../../../redux/actions/user";
import { DEVICES_ROUTE, REGISTRATION_ROUTE } from "../../../utils/consts";

import styles from "./sign-in.style.scss";

export default function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Локализация
  const intl = useIntl();
  const emailString = intl.formatMessage({ id: "email" });
  const passwordString = intl.formatMessage({ id: "password" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await logIn(email, password);

      dispatch(
        setUser({
          id: data.id,
          email: data.username,
          fullname: data.fullname,
          organisation: data.organisation,
          phoneNumber: data.phoneNumber,
          roles: data.roles,
          isAuth: true,
        })
      );
      setError(false);

      navigate(DEVICES_ROUTE);
    } catch (error) {
      if (isAxiosError(error)) {
        const axiosError = error as AxiosError;
        if (
          axiosError.response?.status == 400 ||
          axiosError.response?.status == 401
        ) {
          setError(true);
        }
      } else {
        alert(error);
        setError(true);
      }
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.sign_form} onSubmit={onSubmit}>
        <div className={styles.sign_form__header}>
          <h1>
            <FormattedMessage id="signInLabel" />
          </h1>
          <div className={styles.sign_form__input}>
            <label htmlFor="email">email</label>
            <input
              type="text"
              name="email"
              value={email}
              placeholder={emailString}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="email"
            />
          </div>
          <div className={styles.sign_form__input}>
            <label htmlFor="password">password</label>
            <input
              type="password"
              name="password"
              value={password}
              placeholder={passwordString}
              onChange={(e) => setPassword(e.target.value)}
              aria-label="password"
            />
          </div>
          <div className={styles.recovery_link}>
            <Link to={"/password-recovery"}>
              <FormattedMessage id="recoverPassword" />
            </Link>
          </div>
        </div>
        {error ? (
          <div className={styles.error} role="errorMessage">
            Неверный логин или пароль, попробуйте заново.
          </div>
        ) : (
          ""
        )}
        <div className={styles.sign_form__buttons}>
          <button className="btn" onClick={onSubmit} aria-label="signIn">
            <FormattedMessage id="signIn" />
          </button>

          <Link to={REGISTRATION_ROUTE}>
            <FormattedMessage id="registration" />
          </Link>
        </div>
      </form>
    </div>
  );
}
