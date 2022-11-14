import React from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./sign-up.style.scss";

export default function SingUp() {
  const [nickname, setNickname] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await setTimeout(() => {
        localStorage.setItem("username", nickname);
        localStorage.setItem("password", password);
        navigate("/sign-in");
      }, 1000);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form className={styles.sign_form} onSubmit={onSubmit}>
      <div className={styles.sign_form__header}>
        <h1>Регистрация</h1>
        <div className={styles.sign_form__input}>
          <label htmlFor="nickname">Никнейм</label>
          <input
            type="text"
            name="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        </div>
        <div className={styles.sign_form__input}>
          <label htmlFor="password">Пароль</label>
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
          Зарегистрироваться
        </button>
        <Link to={"/log-in"}>Есть аккаунт? Войдите.</Link>
      </div>
    </form>
  );
}
