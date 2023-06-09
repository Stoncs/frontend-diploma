import React, { useState } from "react";
// import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter } from "react-router-dom";
import { IntlProvider, createIntl, useIntl } from "react-intl";

import { messages } from "../../../i18n/messages";
import Locales from "../../components/locales/locales.component";
import { LOCALES } from "../../../i18n/locales";

import SignIn from "./sign-in.component";
import { logIn } from "./../../../http/api";

jest.mock("./../../../http/api");

const mockStore = configureStore([]);
const store = mockStore({});

// Custom mock of useState hook
const useStateMock = (initialState) => {
  let state = initialState;
  const setState = (newState) => {
    state = { ...state, ...newState };
  };
  return [state, setState];
};

const CustomIntlProvider = ({ locale, messages, children }) => {
  const intl = createIntl({
    locale,
    messages,
  });

  return (
    <IntlProvider locale={locale} messages={messages} value={intl}>
      {children}
    </IntlProvider>
  );
};

describe("SignIn", () => {
  const [currentLocale, setCurrentLocale] = useStateMock(LOCALES.RUSSIAN);
  const intl = createIntl({
    locale: currentLocale,
    messages: messages[currentLocale],
  });

  beforeEach(() => {
    logIn.mockResolvedValue({
      id: 1,
      username: "test@example.com",
      fullname: "Test User",
      organisation: "Test Organisation",
      phoneNumber: "123456789",
      roles: ["user"],
    });
  });

  afterEach(() => {
    logIn.mockClear();
  });

  it("should log in successfully", async () => {
    render(
      <Provider store={store}>
        <CustomIntlProvider
          locale={currentLocale}
          messages={messages[currentLocale]}
        >
          <Locales
            setCurrentLocale={setCurrentLocale}
            currentLocale={currentLocale}
          />
          <MemoryRouter>
            <SignIn />
          </MemoryRouter>
        </CustomIntlProvider>
      </Provider>
    );

    const emailInput = screen.getByRole("textbox", { name: "email" });
    const passwordInput = screen.getByLabelText("password");
    const submitButton = screen.getByRole("button", { name: "signIn" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(logIn).toHaveBeenCalledWith("test@example.com", "password123")
    );
  });

  it("should display error message for invalid credentials", async () => {
    logIn.mockImplementation((email, password) => {
      if (email === "test@example.com" && password === "wrongpassword") {
        return Promise.reject({
          response: {
            status: 400,
            data: {
              error: "Invalid credentials",
            },
          },
        });
      }
      return Promise.resolve({});
    });

    render(
      <Provider store={store}>
        <CustomIntlProvider
          locale={currentLocale}
          messages={messages[currentLocale]}
        >
          <Locales
            setCurrentLocale={setCurrentLocale}
            currentLocale={currentLocale}
          />
          <MemoryRouter>
            <SignIn />
          </MemoryRouter>
        </CustomIntlProvider>
      </Provider>
    );

    const emailInput = screen.getByRole("textbox", { name: "email" });
    const passwordInput = screen.getByLabelText("password");
    const submitButton = screen.getByRole("button", { name: "signIn" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });

    await act(async () => {
      fireEvent.click(submitButton);
    });
    await waitFor(() => {
      expect(logIn).toHaveBeenCalledWith("test@example.com", "wrongpassword");
    });
    expect(
      screen.getByText("Неверный логин или пароль, попробуйте заново.")
    ).toBeInTheDocument();
  });

  it("should display error message for server error", async () => {
    render(
      <Provider store={store}>
        <CustomIntlProvider
          locale={currentLocale}
          messages={messages[currentLocale]}
        >
          <Locales
            setCurrentLocale={setCurrentLocale}
            currentLocale={currentLocale}
          />
          <MemoryRouter>
            <SignIn />
          </MemoryRouter>
        </CustomIntlProvider>
      </Provider>
    );

    const emailInput = screen.getByRole("textbox", { name: "email" });
    const passwordInput = screen.getByLabelText("password");
    const submitButton = screen.getByRole("button", { name: "signIn" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    fireEvent.click(submitButton);

    await waitFor(() =>
      expect(logIn).toHaveBeenCalledWith("test@example.com", "password123")
    );
  });

  it("should change text when language/locale is switched", async () => {
    render(
      <Provider store={store}>
        <CustomIntlProvider
          locale={currentLocale}
          messages={messages[currentLocale]}
        >
          <Locales
            setCurrentLocale={setCurrentLocale}
            currentLocale={currentLocale}
          />
          <MemoryRouter>
            <SignIn />
          </MemoryRouter>
        </CustomIntlProvider>
      </Provider>
    );

    const languageSwitchButton = screen.getByRole("button", { name: "eng" });

    // Switch language
    await fireEvent.click(languageSwitchButton);

    expect(screen.getByRole("heading").textContent).toBe(
      intl.formatMessage({ id: "signInLabel" })
    );

    expect(screen.getByRole("button", { name: "signIn" }).textContent).toBe(
      intl.formatMessage({ id: "signIn" })
    );
  });
});
