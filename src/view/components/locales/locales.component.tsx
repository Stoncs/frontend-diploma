import React from "react";
import { LOCALES } from "../../../i18n/locales";
import styles from "./locales.scss";

interface LocalesProps {
  setCurrentLocale: Function;
  currentLocale: String;
}

const Locales = ({ setCurrentLocale, currentLocale }: LocalesProps) => {
  return (
    <div className={styles.container}>
      <button
        className={
          currentLocale == LOCALES.RUSSIAN ? styles.btn_active : styles.btn
        }
        onClick={() => setCurrentLocale(LOCALES.RUSSIAN)}
      >
        Ru
      </button>
      <button
        className={
          currentLocale == LOCALES.ENGLISH ? styles.btn_active : styles.btn
        }
        onClick={() => setCurrentLocale(LOCALES.ENGLISH)}
      >
        En
      </button>
    </div>
  );
};

export default Locales;
