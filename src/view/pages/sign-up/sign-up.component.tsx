import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import axios, { AxiosError } from "axios";

import styles from "./sign-up.style.scss";

import { LOGIN_ROUTE } from "~/utils/consts";

type CreateUserResponse = {
  phone: string;
  username: string;
  fullName: string;
  organisation: string;
  password: string;
};

export default function SingUp() {
  const [phone, setPhone] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const [organisation, setOrganisation] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post<CreateUserResponse>("http://localhost:8080/register", {
        phone,
        username,
        fullname: fullName,
        organisation,
        password,
      });
      navigate(LOGIN_ROUTE);
    } catch (error) {
      if (error instanceof AxiosError) {
        // eslint-disable-next-line no-console
        console.log(error.response?.data.message);
      } else {
        console.log("Unexpected error", error);
      }
    }
  };

  return (
    <form className={styles.sign_form} onSubmit={onSubmit}>
      <div className={styles.sign_form__header}>
        <h1>
          <FormattedMessage id="signInLabel" />
        </h1>
        <div className={styles.sign_form__input}>
          <label htmlFor="phone">
            <FormattedMessage id="phone" />
          </label>
          <input
            type="tel"
            name="phone"
            pattern="^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className={styles.sign_form__input}>
          <label htmlFor="username">
            <FormattedMessage id="username" />
          </label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles.sign_form__input}>
          <label htmlFor="fullName">
            <FormattedMessage id="fullName" />
          </label>
          <input
            type="text"
            name="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </div>
        <div className={styles.sign_form__input}>
          <label htmlFor="organisation">
            <FormattedMessage id="organisation" />
          </label>
          <input
            type="text"
            name="organisation"
            value={organisation}
            onChange={(e) => setOrganisation(e.target.value)}
          />
        </div>
        <div className={styles.sign_form__input}>
          <label htmlFor="password">
            <FormattedMessage id="password" />
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={styles.sign_form__input}>
          <label htmlFor="repeatPassword">
            <FormattedMessage id="repeatPassword" />
          </label>
          <input
            type="password"
            name="repeatPassword"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
      </div>
      <div className={styles.sign_form__buttons}>
        <button className="btn" onClick={onSubmit}>
          <FormattedMessage id="signIn" />
        </button>
        <Link to={LOGIN_ROUTE}>
          <FormattedMessage id="haveAnAccount" />
        </Link>
      </div>
    </form>
  );
}
