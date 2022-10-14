import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dropdown } from "../../components/dropdown/Dropdown";

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

test("it displays a single selection if the isMulti prop is not passed", () => {
  const mockedOptions = [
    { value: 1, label: "Hello World" },
    { value: 2, label: "It worked" },
    { value: 3, label: "More tests" },
  ];
  render(<Dropdown options={mockedOptions} />);
  const arrowUpIconEl = screen.getByTestId(/keyboardarrowupicon/i);
  userEvent.click(arrowUpIconEl);
  const selection = screen.getByText(/it worked/i);
  userEvent.click(selection);
  const displayedValues = screen.getByTestId(/data/i);
  expect(displayedValues).toHaveTextContent(/it worked/i);
});

test("it displays multiple selections if the isMulti prop is passed", () => {
  const mockedOptions = [
    { value: 1, label: "Hello World" },
    { value: 2, label: "It worked" },
    { value: 3, label: "More tests" },
  ];
  render(<Dropdown options={mockedOptions} isMulti />);
  const arrowUpIconEl = screen.getByTestId(/keyboardarrowupicon/i);
  userEvent.click(arrowUpIconEl);
  const firstSelection = screen.getByText(/hello world/i);
  const secondSelection = screen.getByText(/it worked/i);
  const thirdSelection = screen.getByText(/more tests/i);
  userEvent.click(firstSelection);
  userEvent.click(secondSelection);
  userEvent.click(thirdSelection);
  const displayedValues = screen.getByTestId(/data/i);
  expect(displayedValues).toHaveTextContent(/hello worldit workedmore tests/i);
});
