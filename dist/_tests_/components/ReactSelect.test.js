import * as React from 'react';
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ReactSelectControlList } from '../../components/select-control-list/ReactSelectControlList';
test("it does not display the search box if the options array is empty and isSearchable prop is passed", function () {
  var mockedOption = [];
  render( /*#__PURE__*/React.createElement(ReactSelectControlList, {
    options: mockedOption,
    isSearchable: true
  }));
  var searchEl = screen.queryByTestId(/input/i);
  expect(searchEl).not.toBeInTheDocument();
});
test("it displays the search box if the options array is not empty and isSearchable prop is passed", function () {
  var mockedOption = [{
    value: 1,
    label: "Hello World"
  }];
  render( /*#__PURE__*/React.createElement(ReactSelectControlList, {
    options: mockedOption,
    isSearchable: true
  }));
  var searchEl = screen.getByTestId(/input/i);
  expect(searchEl).toBeInTheDocument();
});
test("it doesn't display the searchbox if isSearchable prop is not passed", function () {
  var mockedOption = [{
    value: 1,
    label: "Hello World"
  }];
  render( /*#__PURE__*/React.createElement(ReactSelectControlList, {
    options: mockedOption
  }));
  var searchEl = screen.queryByTestId(/input/i);
  expect(searchEl).not.toBeInTheDocument();
});
test("it calls the selected prop function to display the clicked option", function () {
  var mockedOptions = [{
    value: 1,
    label: "Hello World"
  }, {
    value: 2,
    label: "It worked"
  }];
  var handleSelectOption = jest.fn();
  render( /*#__PURE__*/React.createElement(ReactSelectControlList, {
    options: mockedOptions,
    handleSelectOption: handleSelectOption
  }));
  var selectedValue = screen.getByText(/it worked/i);
  userEvent.click(selectedValue);
  expect(handleSelectOption).toHaveBeenCalledWith({
    value: 2,
    label: "It worked"
  });
});
test("it searches for the typed option in the dropdownlist", function () {
  var mockedOptions = [{
    value: 1,
    label: "Hello World"
  }, {
    value: 2,
    label: "It worked"
  }];
  var handleSearchOption = jest.fn();
  render( /*#__PURE__*/React.createElement(ReactSelectControlList, {
    options: mockedOptions,
    handleSearchOption: handleSearchOption,
    isSearchable: true
  }));
  var input = screen.getByTestId(/input/i);
  userEvent.type(input, "world");
  expect(handleSearchOption).toHaveBeenCalledWith("world");
});
test("it displays a text of no options if no options array is passed", function () {
  render( /*#__PURE__*/React.createElement(ReactSelectControlList, null));
  var options = screen.getByTestId(/no-text/i);
  expect(options).toBeInTheDocument();
});