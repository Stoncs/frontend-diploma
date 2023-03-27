import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { IntlProvider } from "react-intl";

import { LOCALES } from "./i18n/locales";
import { messages } from "./i18n/messages";
import store, { Persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Router } from "./router";

import "./scss/normalise.scss";
import "./app.scss";

import Locales from "./view/components/locales/locales.component";
import MessagePopup from "./view/components/messagePopup/MessagePopup.component";
import { useAppSelector } from "./redux/hooks";
import { PopupDetails } from "./redux/types";

export const App = () => {
  function getInitialLocale() {
    // получаем сохраненные данные
    const savedLocale = localStorage.getItem("locale");
    return savedLocale || LOCALES.RUSSIAN;
  }

  const [currentLocale, setCurrentLocale] = React.useState(getInitialLocale());

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={Persistor}>
        <IntlProvider
          messages={messages[currentLocale]}
          locale={currentLocale}
          defaultLocale={LOCALES.RUSSIAN}
        >
          <Locales
            setCurrentLocale={setCurrentLocale}
            currentLocale={currentLocale}
          />

          <BrowserRouter>
            <Router />
          </BrowserRouter>
        </IntlProvider>
      </PersistGate>
    </Provider>
  );
};
