import React from "react";
import "@testing-library/jest-dom";
import {
  render,
  fireEvent,
  waitFor,
  screen,
  act,
} from "@testing-library/react";
import { MemoryRouter, useNavigate, useParams } from "react-router-dom";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import { Events } from "../view/pages/events/Events.component";
import { LOCALES } from "../i18n/locales";
import { messages } from "../i18n/messages";
import Locales from "../view/components/locales/locales.component";
import { getEventsDevice } from "../http/api";

jest.mock("../assets/action_photo.png", () => "mocked-action-photo.png");
jest.mock("../assets/export.png", () => "mocked-export-photo.png");

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
  const mockUseIntl = jest.fn();

  beforeEach(() => {
    const [currentLocale, setCurrentLocale] = useStateMock(LOCALES.RUSSIAN);
    jest.resetAllMocks();
    useParams.mockReturnValue(mockedUseParams);
    useNavigate.mockReturnValue(navigate);
    mockUseIntl.mockReturnValue({ formatMessage: jest.fn() });
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
            <Events />
          </MemoryRouter>
        </CustomIntlProvider>
      </Provider>
    );
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should filter events by event type and render events", async () => {
    getEventsDevice.mockResolvedValue([
      {
        id: 1,
        carId: "ABC123",
        speed: "60",
        time: "2023-06-01 10:00:00",
        typeOfCar: "0",
        typeOfEvent: "0",
      },
      {
        id: 2,
        carId: "DEF456",
        speed: "70",
        time: "2023-06-01 11:00:00",
        typeOfCar: "1",
        typeOfEvent: "1",
      },
      // Additional test data...
    ]);
    await waitFor(() => {
      expect(getEventsDevice).toHaveBeenCalledWith("mocked-id", "3", "", "");
    });

    await act(() =>
      fireEvent.change(screen.getByTestId("event-type-filter"), {
        target: { value: "1" },
      })
    );

    await waitFor(() => {
      expect(getEventsDevice).toHaveBeenLastCalledWith(
        "mocked-id",
        "1",
        "1",
        ""
      );
    });
    expect(screen.getByText(/ABC123/)).toBeInTheDocument();
    expect(screen.getByText(/60/)).toBeInTheDocument();
    expect(screen.getByText(/2023-06-01 10:00:00/)).toBeInTheDocument();
  });

  it("should filter events by car type and render events", async () => {
    getEventsDevice.mockResolvedValue([
      {
        id: 1,
        carId: "ABC123",
        speed: "60",
        time: "2023-06-01 10:00:00",
        typeOfCar: "0",
        typeOfEvent: "0",
      },
      {
        id: 2,
        carId: "DEF456",
        speed: "70",
        time: "2023-06-01 11:00:00",
        typeOfCar: "1",
        typeOfEvent: "1",
      },
      // Additional test data...
    ]);
    await waitFor(() => {
      expect(getEventsDevice).toHaveBeenCalledWith("mocked-id", "3", "", "");
    });

    fireEvent.change(screen.getByTestId("car-type-filter"), {
      target: { value: "1" },
    });

    await waitFor(() => {
      expect(getEventsDevice).toHaveBeenLastCalledWith(
        "mocked-id",
        "0",
        "",
        "1"
      );
    });
    expect(screen.getByText(/ABC123/)).toBeInTheDocument();
    expect(screen.getByText(/60/)).toBeInTheDocument();
    expect(screen.getByText(/2023-06-01 10:00:00/)).toBeInTheDocument();
  });

  it("should export events to CSV", async () => {
    getEventsDevice.mockResolvedValue([
      {
        id: 1,
        carId: "ABC123",
        speed: "60",
        time: "2023-06-01 10:00:00",
        typeOfCar: "0",
        typeOfEvent: "0",
      },
      {
        id: 2,
        carId: "DEF456",
        speed: "70",
        time: "2023-06-01 11:00:00",
        typeOfCar: "1",
        typeOfEvent: "1",
      },
      // Additional test data...
    ]);
    global.window.open = jest.fn();

    await waitFor(() => {
      expect(getEventsDevice).toHaveBeenCalledWith("mocked-id", "3", "", "");
    });

    fireEvent.click(screen.getByTestId("export-csv-button"));

    await waitFor(() => {
      expect(global.window.open).toHaveBeenCalledWith(
        "http://localhost:8080/api/event/export?id=mocked-id&typeOfFiltration=3",
        "_blank",
        "noopener,noreferrer"
      );
    });
  });

  it("should handle error and navigate to login page", async () => {
    const mockError = new Error("API Error");
    getEventsDevice.mockRejectedValue(mockError);

    await waitFor(() => {
      expect(getEventsDevice).toHaveBeenCalledWith("mocked-id", "3", "", "");
    });

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith("/login");
    });
  });
});
