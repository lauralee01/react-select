import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Dropdown } from "../../components/dropdown/Dropdown";
test("it displays the placeholder Select on mounted", function () {
  render( /*#__PURE__*/React.createElement(Dropdown, null));
  var placeholderEl = screen.getByText(/select/i);
  expect(placeholderEl).toBeInTheDocument();
});
test("child component should not be rendered", function () {
  render( /*#__PURE__*/React.createElement(Dropdown, null));
  var optionsEl = screen.queryByTestId(/options/i);
  expect(optionsEl).not.toBeInTheDocument();
});
test("child component is rendered when dropdown arrow is clicked on", function () {
  render( /*#__PURE__*/React.createElement(Dropdown, null));
  var arrowUpIconEl = screen.getByTestId(/keyboardarrowupicon/i);
  userEvent.click(arrowUpIconEl);
  var optionsEl = screen.getByTestId(/options/i);
  expect(optionsEl).toBeInTheDocument();
});
test("child component is hidden when arrow down icon is clicked on", function () {
  render( /*#__PURE__*/React.createElement(Dropdown, null));
  var arrowUpIconEl = screen.getByTestId(/keyboardarrowupicon/i);
  userEvent.click(arrowUpIconEl);
  var arrowDownIconEl = screen.getByTestId(/keyboardarrowdownicon/i);
  userEvent.click(arrowDownIconEl);
  var optionsEl = screen.queryByTestId(/options/i);
  expect(optionsEl).not.toBeInTheDocument();
});
test("it displays a single selection if the isMulti prop is not passed", function () {
  var mockedOptions = [{
    value: 1,
    label: "Hello World"
  }, {
    value: 2,
    label: "It worked"
  }, {
    value: 3,
    label: "More tests"
  }];
  render( /*#__PURE__*/React.createElement(Dropdown, {
    options: mockedOptions
  }));
  var arrowUpIconEl = screen.getByTestId(/keyboardarrowupicon/i);
  userEvent.click(arrowUpIconEl);
  var selection = screen.getByText(/it worked/i);
  userEvent.click(selection);
  var displayedValues = screen.getByTestId(/data/i);
  expect(displayedValues).toHaveTextContent(/it worked/i);
});
test("it displays multiple selections if the isMulti prop is passed", function () {
  var mockedOptions = [{
    value: 1,
    label: "Hello World"
  }, {
    value: 2,
    label: "It worked"
  }, {
    value: 3,
    label: "More tests"
  }];
  render( /*#__PURE__*/React.createElement(Dropdown, {
    options: mockedOptions,
    isMulti: true
  }));
  var arrowUpIconEl = screen.getByTestId(/keyboardarrowupicon/i);
  userEvent.click(arrowUpIconEl);
  var firstSelection = screen.getByText(/hello world/i);
  var secondSelection = screen.getByText(/it worked/i);
  var thirdSelection = screen.getByText(/more tests/i);
  userEvent.click(firstSelection);
  userEvent.click(secondSelection);
  userEvent.click(thirdSelection);
  var displayedValues = screen.getByTestId(/data/i);
  expect(displayedValues).toHaveTextContent(/hello worldit workedmore tests/i);
});