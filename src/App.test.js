import App from "./App";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("App component", () => {
  it("renders navbar", () => {
    render(<App />);
    const navbarElement = screen.getByRole("navigation");
    expect(navbarElement).toBeInTheDocument();
  });

  it("renders boards", () => {
    render(<App />);
    const boardsElement = screen.getByRole("region");
    expect(boardsElement).toBeInTheDocument();
  });
});
