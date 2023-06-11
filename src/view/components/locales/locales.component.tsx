import React from "react";

import { LOCALES } from "../../../i18n/locales";

import styles from "./locales.scss";

interface LocalesProps {
  setCurrentLocale: Function;
  currentLocale: string;
}

const Locales = ({ setCurrentLocale, currentLocale }: LocalesProps) => {
  const changeLanguage = (lang: string) => {
    setCurrentLocale(lang);
    localStorage.setItem("locale", lang);
  };
  return (
    <div className={styles.container}>
      <button
        aria-label="ru"
        className={
          currentLocale == LOCALES.RUSSIAN ? styles.btn_active : styles.btn
        }
        onClick={() => changeLanguage(LOCALES.RUSSIAN)}
      >
        Ru
      </button>
      <button
        aria-label="eng"
        className={
          currentLocale == LOCALES.ENGLISH ? styles.btn_active : styles.btn
        }
        onClick={() => changeLanguage(LOCALES.ENGLISH)}
      >
        En
      </button>
    </div>
  );
};

export default Locales;
