import { render, screen } from "@testing-library/react";
import Boards from "./Boards";
import "@testing-library/jest-dom";

test("renders all boards", () => {
  const boards = [
    { id: 1, title: "Backlog", items: [] },
    { id: 2, title: "To Do", items: [] },
    { id: 3, title: "Ongoing", items: [] },
    { id: 4, title: "Done", items: [] },
  ];
  render(<Boards />);
  boards.forEach((board) => {
    expect(screen.getByText(board.title)).toBeInTheDocument();
  });
});
