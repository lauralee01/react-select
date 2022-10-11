import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dropdown } from "../../lib/components/dropdown/Dropdown";

test("it displays the placeholder Select on mounted", () => {
  render(<Dropdown />);
  const placeholderEl = screen.getByText(/select/i);
  expect(placeholderEl).toBeInTheDocument();
});

test("child component should not be rendered", () => {
  render(<Dropdown />);
  const optionsEl = screen.queryByTestId(/options/i);
  expect(optionsEl).not.toBeInTheDocument();
});

test("child component is rendered when dropdown arrow is clicked on", () => {
  render(<Dropdown />);
  const arrowUpIconEl = screen.getByTestId(/keyboardarrowupicon/i);
  userEvent.click(arrowUpIconEl);
  const optionsEl = screen.getByTestId(/options/i);
  expect(optionsEl).toBeInTheDocument();
});

test("child component is hidden when arrow down icon is clicked on", () => {
  render(<Dropdown />);
  const arrowUpIconEl = screen.getByTestId(/keyboardarrowupicon/i);
  userEvent.click(arrowUpIconEl);
  const arrowDownIconEl = screen.getByTestId(/keyboardarrowdownicon/i);
  userEvent.click(arrowDownIconEl);
  const optionsEl = screen.queryByTestId(/options/i);
  expect(optionsEl).not.toBeInTheDocument();
});
