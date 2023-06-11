import React from "react";
import "@testing-library/jest-dom";
import "jest-localstorage-mock";
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import Locales from "../view/components/locales/locales.component";

describe("Locales Component", () => {
  const mockSetCurrentLocale = jest.fn();

  it("renders correctly with default locale", () => {
    const currentLocale = "en-US";
    render(
      <Locales
        setCurrentLocale={mockSetCurrentLocale}
        currentLocale={currentLocale}
      />
    );
    const ruButton = screen.getByLabelText("ru");
    const enButton = screen.getByLabelText("eng");
    expect(ruButton).toBeInTheDocument();
    expect(enButton).toBeInTheDocument();
    expect(ruButton).not.toHaveClass("btn_active");
    expect(enButton).toHaveClass("btn_active");
  });

  it("calls setCurrentLocale and updates localStorage on button click", async () => {
    const currentLocale = "en";
    render(
      <Locales
        setCurrentLocale={mockSetCurrentLocale}
        currentLocale={currentLocale}
      />
    );
    const ruButton = screen.getByLabelText("ru");
    fireEvent.click(ruButton);
    expect(mockSetCurrentLocale).toHaveBeenCalledWith("ru-RU");
    await waitFor(() => {
      expect(localStorage.getItem("locale")).toBe("ru-RU");
    });
  });
});
