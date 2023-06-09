import React from "react";
import "@testing-library/jest-dom";
import {
  render,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
  screen,
  act,
} from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { IntlProvider } from "react-intl";
import SignIn from "../view/pages/sign-in/sign-in.component";
import SignUp from "../view/pages/sign-up/sign-up.component";
import { registerUser } from "../http/api";
import { messages } from "../i18n/messages";
import Locales from "../view/components/locales/locales.component";
import { LOCALES } from "../i18n/locales";

jest.mock("../http/api");

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
  return (
    <IntlProvider locale={locale} messages={messages}>
      {children}
    </IntlProvider>
  );
};

describe("SignUp component", () => {
  const [currentLocale, setCurrentLocale] = useStateMock(LOCALES.RUSSIAN);
  beforeEach(() => {
    registerUser.mockResolvedValue({
      message: "User registered successfully!",
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
            <Routes>
              <Route path="/" element={<SignUp />} />
              <Route path="/login" element={<SignIn />} />
            </Routes>
          </MemoryRouter>
        </CustomIntlProvider>
      </Provider>
    );
  });

  test("renders form inputs", () => {
    expect(screen.getByLabelText("email")).toBeInTheDocument();
    expect(screen.getByLabelText("phone")).toBeInTheDocument();
    expect(screen.getByLabelText("fullName")).toBeInTheDocument();
    expect(screen.getByLabelText("organisation")).toBeInTheDocument();
    expect(screen.getByLabelText("password")).toBeInTheDocument();
    expect(screen.getByLabelText("repeatPassword")).toBeInTheDocument();
  });

  test("displays validation error when submitting with invalid email", async () => {
    const emailInput = screen.getByLabelText("email");
    const submitButton = screen.getByText("Зарегистрироваться");

    // Неверный формат почты
    fireEvent.change(emailInput, { target: { value: "invalid_email" } });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText("Почта некорректная");

    expect(errorMessage).toBeInTheDocument();
  });

  test("displays validation error when submitting with passwords that do not match", async () => {
    const passwordInput = screen.getByLabelText("password");
    const repeatPasswordInput = screen.getByLabelText("repeatPassword");
    const submitButton = screen.getByText("Зарегистрироваться");

    // Неверное заполнение паролей
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(repeatPasswordInput, {
      target: { value: "different_password" },
    });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText("Пароли не совпадают");

    // Ожидание ошибки
    expect(errorMessage).toBeInTheDocument();
  });

  test("submits the form successfully when all fields are valid", async () => {
    const emailInput = screen.getByLabelText("email");
    const phoneInput = screen.getByLabelText("phone");
    const fullNameInput = screen.getByLabelText("fullName");
    const organisationInput = screen.getByLabelText("organisation");
    const passwordInput = screen.getByLabelText("password");
    const repeatPasswordInput = screen.getByLabelText("repeatPassword");
    const submitButton = screen.getByText("Зарегистрироваться");

    // Заполнение полей
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(phoneInput, { target: { value: "89069159367" } });
    fireEvent.change(fullNameInput, { target: { value: "John Doe" } });
    fireEvent.change(organisationInput, { target: { value: "Company" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.change(repeatPasswordInput, { target: { value: "password123" } });
    // Нажатие кнопки
    await act(() => fireEvent.click(submitButton));

    // Проверка выполнения запроса
    await waitFor(() =>
      expect(registerUser).toHaveBeenCalledWith(
        "test@example.com",
        "89069159367",
        "John Doe",
        "password123",
        "Company"
      )
    );
    // Проверка, что перешли на страницу логина
    expect(screen.getByText("Войти в систему")).toBeInTheDocument();
  });
});
