import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import { REGISTRATION_ROUTE } from "~/utils/consts";

import jwt_decode from "jwt-decode";

import styles from "./sign-in.style.scss";
import axios from "axios";

const $host = axios.create({
  baseURL: "http://localhost:8080/",
});

const logIn = async (username: String, password: String) => {
  const { data } = await $host.post("/api/auth/signin", { username, password });
  localStorage.setItem("token", data.token);
  return jwt_decode(data.token);
};

export default function SignIn() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await logIn(email, password);
      // const user = await getUserById(data.id);
      navigate("/");
      console.log(data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form className={styles.sign_form} onSubmit={onSubmit}>
      <div className={styles.sign_form__header}>
        <h1>
          <FormattedMessage id="signIn" />
        </h1>
        <div className={styles.sign_form__input}>
          <label htmlFor="email">
            <FormattedMessage id="email" />
          </label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
      </div>
      <div className={styles.sign_form__buttons}>
        <button className="btn" onClick={onSubmit}>
          <FormattedMessage id="signIn" />
        </button>
        <Link to={"/password-recovery"}>
          <FormattedMessage id="passwordRecovery" />
        </Link>
        <Link to={REGISTRATION_ROUTE}>
          <FormattedMessage id="registration" />
        </Link>
      </div>
    </form>
  );
}
