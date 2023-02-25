import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import App from "../../App";
import { ConnectingAirportsOutlined } from "@mui/icons-material";

describe("Navbar", () => {
  beforeEach(() => {
    render(<App />);
  });
  test('renders title "Kanban Board"', () => {
    expect(screen.getByText("Kanban Board")).toBeInTheDocument();
  });

  test("changes language when language button is clicked", () => {
    const languageButton = screen.getByTitle("Change Language");
    fireEvent.click(languageButton);
    const russianButton = screen.getByText("Русский");
    fireEvent.click(russianButton);
    expect(screen.getByText("Бэклог")).toBeInTheDocument(); // expected text in Russian
  });

  test("changes theme when theme button is clicked", () => {
    const themeButton = screen.getByTitle("Change Theme");
    fireEvent.click(themeButton);
    const container = themeButton.parentElement;
    const lightThemeButton = screen.getByText("Light", { container });
    fireEvent.click(lightThemeButton);
    expect(document.documentElement.getAttribute("data-theme")).toEqual(
      "light"
    );
  });
});
