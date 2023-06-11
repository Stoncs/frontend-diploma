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
import configureStore from "redux-mock-store";

import { Statistics } from "../view/pages/statistics/Statistics.component";
import { LOCALES } from "../i18n/locales";
import { messages } from "../i18n/messages";
import Locales from "../view/components/locales/locales.component";
import {
  getAverageSpeedPerHour,
  getTypeOfCarPerHour,
  getTypeOfEventPerHour,
} from "../http/api";

jest.mock("../http/api");

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
  useNavigate: jest.fn(),
}));

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

describe("Events", () => {
  const mockedUseParams = { id: "mocked-id" };
  const navigate = jest.fn();
  const [currentLocale, setCurrentLocale] = useStateMock(LOCALES.RUSSIAN);
  beforeEach(async () => {
    jest.resetAllMocks();
    useParams.mockReturnValue(mockedUseParams);
    useNavigate.mockReturnValue(navigate);
    getAverageSpeedPerHour.mockResolvedValue([
      52.35, 56.81333333333333, 59.675, 62.016, 46.526666666666664,
      59.60857142857143, 35.1, 5.984999999999999, 70.0175, 35.13,
      47.95333333333334, 34.026666666666664, 56.896, 30.6, 59.595000000000006,
      19.689999999999998, 49.43, 50.33555555555555, 65.018, 55.55500000000001,
      58.6975, 44.4075, 42.30000000000001, 45.10333333333333,
    ]);

    getTypeOfCarPerHour.mockResolvedValue([
      {
        "0": 5,
      },
      {
        "0": 4,
        "2": 1,
        "3": 1,
      },
      {
        "0": 3,
        "1": 1,
      },
      {
        "0": 4,
        "1": 1,
      },
      {
        "0": 3,
      },
      {
        "0": 7,
      },
      {
        "0": 3,
      },
      {
        "0": 2,
      },
      {
        "0": 3,
        "1": 1,
      },
      {
        "0": 2,
        "2": 1,
      },
      {
        "0": 3,
      },
      {
        "0": 1,
        "2": 1,
        "3": 1,
      },
      {
        "0": 4,
        "2": 1,
      },
      {
        "0": 1,
        "1": 1,
      },
      {
        "0": 4,
      },
      {
        "0": 1,
        "3": 1,
      },
      {
        "0": 5,
      },
      {
        "0": 4,
        "1": 3,
        "2": 2,
      },
      {
        "0": 3,
        "3": 2,
      },
      {
        "0": 2,
      },
      {
        "0": 3,
        "1": 1,
      },
      {
        "0": 2,
        "1": 1,
        "3": 1,
      },
      {
        "0": 6,
        "3": 1,
      },
      {
        "0": 3,
      },
      ,
    ]);

    getTypeOfEventPerHour.mockResolvedValue([
      {
        "0": 4,
        "1": 1,
      },
      {
        "0": 5,
        "1": 1,
      },
      {
        "0": 2,
        "1": 2,
      },
      {
        "0": 3,
        "1": 2,
      },
      {
        "0": 3,
      },
      {
        "0": 5,
        "1": 2,
      },
      {
        "0": 3,
      },
      {
        "0": 2,
      },
      {
        "0": 3,
        "1": 1,
      },
      {
        "0": 2,
        "1": 1,
      },
      {
        "0": 2,
        "2": 1,
      },
      {
        "0": 3,
      },
      {
        "0": 5,
      },
      {
        "0": 1,
        "1": 1,
      },
      {
        "0": 3,
        "1": 1,
      },
      {
        "0": 2,
      },
      {
        "0": 4,
        "1": 1,
      },
      {
        "0": 7,
        "1": 2,
      },
      {
        "0": 4,
        "1": 1,
      },
      {
        "0": 1,
        "1": 1,
      },
      {
        "0": 2,
        "1": 1,
        "2": 1,
      },
      {
        "0": 3,
        "2": 1,
      },
      {
        "0": 5,
        "1": 2,
      },
      {
        "0": 3,
      },
    ]);
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
            <Statistics />
          </MemoryRouter>
        </CustomIntlProvider>
      </Provider>
    );
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  it("renders the component", async () => {
    expect(screen.getByText("Статистика")).toBeInTheDocument();
  });

  it("displays transport information", async () => {
    expect(screen.getByText(/Всего транспорта/)).toBeInTheDocument();
    expect(screen.getByText(/Количество легковых/)).toBeInTheDocument();
    expect(screen.getByText(/Средняя скорость легковых/)).toBeInTheDocument();
    expect(screen.getByText(/Количество грузовых/)).toBeInTheDocument();
    expect(screen.getByText(/Средняя скорость грузовых/)).toBeInTheDocument();
    expect(screen.getByText(/Количество спец. транспорта/)).toBeInTheDocument();
    expect(
      screen.getByText(/Средняя скорость спец. транспорта/)
    ).toBeInTheDocument();
  });
  it("renders charts", () => {
    // Проверяем, что графики отображены
    expect(screen.getByTestId("barEventTypeChart")).toBeInTheDocument();
    expect(screen.getByTestId("barCarTypeChart")).toBeInTheDocument();
    expect(screen.getByTestId("lineAverageSpeedChart")).toBeInTheDocument();
  });
});
