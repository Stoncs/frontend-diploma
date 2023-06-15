import React from "react";
import "@testing-library/jest-dom";
import "jest-canvas-mock";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
  cleanup,
} from "@testing-library/react";
import { MemoryRouter, useNavigate, useParams } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import userEvent from "@testing-library/user-event";
import { Devices } from "../view/pages/devices/devices.component";
import { getDevicesForUser, addNewDevice, getDevicesAll } from "../http/api";
import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { LOCALES } from "../i18n/locales";
import { messages } from "../i18n/messages";
import Locales from "../view/components/locales/locales.component";
import MessagePopup from "../view/components/messagePopup/MessagePopup.component";
import rootReducer from "../redux/reducers";
jest.mock("../http/api"); // Мокируем модуль http/api

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

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

describe("Devices", () => {
  const [currentLocale, setCurrentLocale] = useStateMock(LOCALES.RUSSIAN);
  const navigate = jest.fn();

  beforeEach(() => {
    localStorage.setItem("email", "test@example.com");
    localStorage.setItem("id", "1");
    localStorage.setItem("roles", "user");
    useNavigate.mockReturnValue(navigate);
    const mockDevices = [
      {
        id: 1,
        key: "key1",
        name: "Device 1",
        mode: "mode1",
        signal: "signal1",
        view: "view1",
        address: "address1",
      },
      {
        id: 2,
        key: "key2",
        name: "Device 2",
        mode: "mode2",
        signal: "signal2",
        view: "view2",
        address: "address2",
      },
    ];

    getDevicesAll.mockResolvedValue(mockDevices);
    getDevicesForUser.mockResolvedValue(mockDevices);
    addNewDevice.mockResolvedValue();
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("renders devices page", async () => {
    const store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
    });
    const popupInfo = store.getState();
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
            <Devices />
            {popupInfo.popup?.header ? (
              <MessagePopup {...popupInfo.popup} />
            ) : (
              ""
            )}
          </MemoryRouter>
        </CustomIntlProvider>
      </Provider>
    );
    // Проверяем, что заголовок отображается на странице
    expect(screen.getByText("Доступные устройства")).toBeInTheDocument();

    // Проверяем, что все камеры отображаются на странице
    await waitFor(() => {
      expect(screen.getByText("Device 1")).toBeInTheDocument();
      expect(screen.getByText("Device 2")).toBeInTheDocument();
    });
  });

  test("adds a new device", async () => {
    const store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
    });
    const popupInfo = store.getState();
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
            <Devices />
            {popupInfo.popup?.header ? (
              <MessagePopup {...popupInfo.popup} />
            ) : (
              ""
            )}
          </MemoryRouter>
        </CustomIntlProvider>
      </Provider>
    );
    // Вводим значение в поле для добавления нового устройства
    const keyInput = screen.getByLabelText("key");
    fireEvent.change(keyInput, { target: { value: "newKey" } });

    // Нажимаем кнопку для добавления нового устройства
    await act(() => userEvent.click(screen.getByText("Добавить")));

    // Проверяем, что запрос на добавление нового устройства был выполнен
    await waitFor(() => {
      expect(addNewDevice).toHaveBeenCalledWith("1", "newKey");
    });

    // Проверяем, что попап успешно выводится
    const updatedState = store.getState();
    expect(updatedState.popup?.header).toBe("Успешно!");
  });

  test("displays error message when adding a device with an invalid key", async () => {
    const store = configureStore({
      reducer: rootReducer,
      middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
    });
    const popupInfo = store.getState();
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
            <Devices />
            {popupInfo.popup?.header ? (
              <MessagePopup {...popupInfo.popup} />
            ) : (
              ""
            )}
          </MemoryRouter>
        </CustomIntlProvider>
      </Provider>
    );
    addNewDevice.mockRejectedValue({
      response: {
        data: {
          message: "Key not found",
        },
      },
    });
    // Вводим значение в поле для добавления нового устройства
    const keyInput = screen.getByLabelText("key");
    fireEvent.change(keyInput, { target: { value: "invalidKey" } });

    // Нажимаем кнопку для добавления нового устройства
    await act(() => userEvent.click(screen.getByText("Добавить")));

    // Проверяем, что запрос на добавление нового устройства был выполнен
    await waitFor(() => {
      expect(addNewDevice).toHaveBeenCalledWith("1", "invalidKey");
    });

    // Проверяем, что попап ошибка появится
    const updatedState = store.getState();
    expect(updatedState.popup?.header).toBe("Ошибка!");
  });
});
