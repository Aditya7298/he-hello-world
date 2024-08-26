import App from "../App";
import {render, screen, fireEvent} from "@testing-library/react";
import "@testing-library/jest-dom";


test("should add a row with correct roll number and marks in order of insertion", () => {
  render(<App />);

  fireEvent.change(screen.getByPlaceholderText("Enter roll number"), {
    target: { value: "101" },
  });
  fireEvent.change(screen.getByPlaceholderText("Enter marks"), {
    target: { value: "85" },
  });
  fireEvent.click(screen.getByText("Add Student"));

  fireEvent.change(screen.getByPlaceholderText("Enter roll number"), {
    target: { value: "34" },
  });
  fireEvent.change(screen.getByPlaceholderText("Enter marks"), {
    target: { value: "90" },
  });
  fireEvent.click(screen.getByText("Add Student"));

  const rows = screen.getAllByRole("row");
  expect(rows[1].textContent).toBe("10185");
  expect(rows[2].textContent).toBe("3490");
});