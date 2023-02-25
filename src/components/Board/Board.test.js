import { render, screen } from "@testing-library/react";
import Board from "./Board";
import "@testing-library/jest-dom";

test("renders board title", () => {
  const board = {
    id: 1,
    title: "To Do",
    items: [],
  };
  render(<Board board={board} />);
  const titleElement = screen.getByText(/to do/i);
  expect(titleElement).toBeInTheDocument();
});
