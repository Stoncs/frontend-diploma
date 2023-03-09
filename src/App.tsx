import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";

import { LOCALES } from "./i18n/locales";
import { messages } from "./i18n/messages";
import store from "./redux/store";
import { Router } from "./router";

import "./scss/normalise.scss";

export const App = () => {
  function getInitialLocale() {
    // получаем сохраненные данные
    const savedLocale = localStorage.getItem("locale");
    return savedLocale || LOCALES.RUSSIAN;
  }

  const [currentLocale, setCurrentLocale] = React.useState(getInitialLocale());

  return (
    <Provider store={store}>
      <IntlProvider
        messages={messages[currentLocale]}
        locale={currentLocale}
        defaultLocale={LOCALES.RUSSIAN}
      >
        <button onClick={() => setCurrentLocale(LOCALES.RUSSIAN)}>
          Русский
        </button>
        <button onClick={() => setCurrentLocale(LOCALES.ENGLISH)}>
          English
        </button>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </IntlProvider>
    </Provider>
  );
};
