import React from "react";
import { AxiosError, isAxiosError } from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FormattedMessage, useIntl } from "react-intl";
import { DEVICES_ROUTE, REGISTRATION_ROUTE } from "~/utils/consts";
import { logIn } from "~/http/api";
import styles from "./sign-in.style.scss";
import { useAppDispatch } from "~/redux/hooks";
import { setUser } from "~/redux/actions/user";

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
          username: data.username,
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
        if (axiosError.response?.status == 400) {
          setError(true);
        }
      } else {
        alert(error);
      }
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.sign_form} onSubmit={onSubmit}>
        <div className={styles.sign_form__header}>
          <h1>
            <FormattedMessage id="signIn" />
          </h1>
          <div className={styles.sign_form__input}>
            <input
              type="text"
              name="email"
              value={email}
              placeholder={emailString}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.sign_form__input}>
            <input
              type="password"
              name="password"
              value={password}
              placeholder={passwordString}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.recovery_link}>
            <Link to={"/password-recovery"}>
              <FormattedMessage id="recoverPassword" />
            </Link>
          </div>
        </div>
        {error ? (
          <div className={styles.error}>
            Неверный логин или пароль, попробуйте заново.
          </div>
        ) : (
          ""
        )}
        <div className={styles.sign_form__buttons}>
          <button className="btn" onClick={onSubmit}>
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
