import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DropdownList } from "../../lib/components/dropdownList/DropdownList";

test("it does not display the search box if the options array is empty and isSearchable prop is passed", () => {
  const mockedOption = [];
  render(<DropdownList options={mockedOption} isSearchable />);
  const searchEl = screen.queryByTestId(/input/i);
  expect(searchEl).not.toBeInTheDocument();
});

test("it displays the search box if the options array is not empty and isSearchable prop is passed", () => {
  const mockedOption = [{ value: 1, label: "Hello World" }];
  render(<DropdownList options={mockedOption} isSearchable />);
  const searchEl = screen.getByTestId(/input/i);
  expect(searchEl).toBeInTheDocument();
});

test("it doesn't display the searchbox if isSearchable prop is not passed", () => {
  const mockedOption = [{ value: 1, label: "Hello World" }];
  render(<DropdownList options={mockedOption} />);
  const searchEl = screen.queryByTestId(/input/i);
  expect(searchEl).not.toBeInTheDocument();
});

test("it calls the selected prop function to display the clicked option", () => {
  const mockedOption = [
    { value: 1, label: "Hello World" },
    { value: 2, label: "It worked" },
  ];
  const handleSelectOption = jest.fn();
  render(
    <DropdownList
      options={mockedOption}
      handleSelectOption={handleSelectOption}
    />
  );
  const selectedValue = screen.getByText(/it worked/i);
  userEvent.click(selectedValue);
  expect(handleSelectOption).toHaveBeenCalledWith({
    value: 2,
    label: "It worked",
  });
});
