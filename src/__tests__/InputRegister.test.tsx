import React from "react";
import { render, screen } from "@testing-library/react";
import InputRegister from "../view/components/inputRegister/inputRegister.component";
import { IntlProvider } from "react-intl";
import { LOCALES } from "../i18n/locales";
import Locales from "../view/components/locales/locales.component";
import { messages } from "../i18n/messages";
import "@testing-library/jest-dom";

// Custom mock of useState hook
const useStateMock = (initialState) => {
  let state = initialState;
  const setState = (newState) => {
    state = { ...state, ...newState };
  };
  return [state, setState];
};

const CustomIntlProvider = ({ locale, messages, children }) => {
  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
};

describe("InputRegister Component", () => {
  const [currentLocale, setCurrentLocale] = useStateMock(LOCALES.RUSSIAN);
  const mockRegister = jest.fn();

  it("renders input with provided placeholder", () => {
    const placeholder = "Enter your name";
    render(
      <CustomIntlProvider
        locale={currentLocale}
        messages={messages[currentLocale]}
      >
        <Locales
          setCurrentLocale={setCurrentLocale}
          currentLocale={currentLocale}
        />
        <InputRegister
          id="name"
          placeholder={placeholder}
          type="text"
          register={mockRegister}
          errorMessageId={undefined}
        />
      </CustomIntlProvider>
    );
    const inputElement = screen.getByPlaceholderText(placeholder);
    expect(inputElement).toBeInTheDocument();
  });

  it("renders required text when 'required' prop is true", () => {
    render(
      <CustomIntlProvider
        locale={currentLocale}
        messages={messages[currentLocale]}
      >
        <Locales
          setCurrentLocale={setCurrentLocale}
          currentLocale={currentLocale}
        />
        <InputRegister
          id="email"
          placeholder="Enter your email"
          type="email"
          register={mockRegister}
          required={true}
          errorMessageId={undefined}
        />
      </CustomIntlProvider>
    );
    const requiredText = screen.getByText("Поле обязательное для заполнения");
    expect(requiredText).toBeInTheDocument();
  });

  it("renders error message when 'errorMessageId' prop is provided", () => {
    const errorMessageId = "invalidEmail";
    render(
      <CustomIntlProvider
        locale={currentLocale}
        messages={messages[currentLocale]}
      >
        <Locales
          setCurrentLocale={setCurrentLocale}
          currentLocale={currentLocale}
        />
        <InputRegister
          id="email"
          placeholder="Enter your email"
          type="email"
          register={mockRegister}
          errorMessageId={errorMessageId}
        />
      </CustomIntlProvider>
    );
    const errorMessage = screen.getByText(errorMessageId);
    expect(errorMessage).toBeInTheDocument();
  });
});
