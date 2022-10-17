import React from "react";
import Styles from "./ReactSelectControlList.module.css";
export var ReactSelectControlList = function ReactSelectControlList(_ref) {
  var options = _ref.options,
    handleSelectOption = _ref.handleSelectOption,
    isSearchable = _ref.isSearchable,
    handleSearchOption = _ref.handleSearchOption;
  return /*#__PURE__*/React.createElement("div", {
    className: Styles.wrapper,
    "data-testid": "options"
  }, isSearchable && options.length ? /*#__PURE__*/React.createElement("input", {
    type: "text",
    "data-testid": "input",
    className: Styles.input,
    placeholder: "Search",
    onChange: function onChange(e) {
      return handleSearchOption(e.target.value);
    }
  }) : null, /*#__PURE__*/React.createElement("ul", {
    className: Styles.list
  }, options && options.length ? options.map(function (option) {
    return /*#__PURE__*/React.createElement("li", {
      key: option.value,
      "data-testid": option.value,
      onClick: function onClick() {
        return handleSelectOption(option);
      },
      className: Styles.listItem
    }, option.label);
  }) : /*#__PURE__*/React.createElement("p", {
    "data-testid": "no-text"
  }, "No options to display")));
};