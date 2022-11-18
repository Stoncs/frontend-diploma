import React from "react";
import { Link, useNavigate } from "react-router-dom";

import styles from "./sign-in.style.scss";

export default function SignIn() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Получение логина
      let username_ls, password_ls;
      username_ls = localStorage.getItem("username");
      // Получение пароля
      password_ls = localStorage.getItem("password");

      // Авторизация
      if (username_ls == username && password_ls == password) {
        // Переход на главную страницу
        navigate("/");
      } else {
        throw new Error("Неверный логин или пароль");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form className={styles.sign_form} onSubmit={onSubmit}>
      <div className={styles.sign_form__header}>
        <h1>Войти</h1>
        <div className={styles.sign_form__input}>
          <label htmlFor="nickname">Никнейм</label>
          <input
            type="text"
            name="nickname"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
          Войти
        </button>
        <Link to={"/password-recovery"}>Восстановить пароль</Link>
        <Link to={"/sign-up"}>Создать новый аккаунт</Link>
      </div>
    </form>
  );
}
