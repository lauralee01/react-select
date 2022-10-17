import _toConsumableArray from "@babel/runtime/helpers/esm/toConsumableArray";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import React, { useEffect, useState } from "react";
import Styles from "./ReactSelectControl.module.css";
import { KeyboardArrowDown, KeyboardArrowUp, Close } from "@mui/icons-material";
import { ReactSelectControlList } from "../select-control-list/ReactSelectControlList";
export var ReactSelectControl = function ReactSelectControl(_ref) {
  var placeholder = _ref.placeholder,
    options = _ref.options,
    isSearchable = _ref.isSearchable,
    isMulti = _ref.isMulti,
    onChange = _ref.onChange;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    showDropList = _useState2[0],
    setDropdownList = _useState2[1];
  var _useState3 = useState(isMulti ? [] : null),
    _useState4 = _slicedToArray(_useState3, 2),
    selectedOption = _useState4[0],
    setSelectedOption = _useState4[1];
  var _useState5 = useState(""),
    _useState6 = _slicedToArray(_useState5, 2),
    searchItem = _useState6[0],
    setSearchItem = _useState6[1];
  var toggleShow = function toggleShow() {
    setDropdownList(function (prevState) {
      return !prevState;
    });
  };
  var handleSelectOption = function handleSelectOption(option) {
    if (isMulti && selectedOption.filter(function (selectedOption) {
      return selectedOption.label === option.label;
    }).length !== 1) {
      setSelectedOption(function (prevState) {
        return [].concat(_toConsumableArray(prevState), [option]);
      });
      onChange(selectedOption);
    }
    if (!isMulti) {
      setSelectedOption(option);
      onChange(selectedOption);
    }
  };
  var handleSearchOption = function handleSearchOption(text) {
    setSearchItem(text);
  };
  var filteredOptions = options.filter(function (option) {
    return option && option.label.toLowerCase().indexOf(searchItem.toLowerCase()) === 0;
  });
  var removeOption = function removeOption(_ref2) {
    var value = _ref2.value;
    setSelectedOption(selectedOption.filter(function (option) {
      return option.value !== value;
    }));
    onChange(selectedOption);
  };
  var displayedData = function displayedData() {
    if (isMulti && selectedOption.length) {
      return selectedOption.map(function (option, index) {
        return /*#__PURE__*/React.createElement("div", {
          className: Styles.list,
          key: index
        }, option.label, /*#__PURE__*/React.createElement(Close, {
          className: Styles.close,
          onClick: function onClick() {
            return removeOption(option);
          }
        }));
      });
    } else if (!isMulti && selectedOption) {
      return selectedOption.label;
    } else {
      return placeholder;
    }
  };
  useEffect(function () {}, [selectedOption]);
  return /*#__PURE__*/React.createElement("div", {
    className: Styles.control
  }, /*#__PURE__*/React.createElement("div", {
    className: Styles.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: Styles.cover,
    "data-testid": "data"
  }, displayedData()), !showDropList ? /*#__PURE__*/React.createElement(KeyboardArrowUp, {
    onClick: toggleShow,
    className: Styles.icon
  }) : /*#__PURE__*/React.createElement(KeyboardArrowDown, {
    onClick: toggleShow,
    className: Styles.icon
  })), showDropList && /*#__PURE__*/React.createElement(ReactSelectControlList, {
    options: filteredOptions,
    handleSelectOption: handleSelectOption,
    isSearchable: isSearchable,
    handleSearchOption: handleSearchOption
  }));
};
ReactSelectControl.defaultProps = {
  placeholder: "Select...",
  options: [],
  isSearchable: false,
  isMulti: false,
  onChange: function onChange() {}
};