import React, { useEffect, useState } from "react";
import Styles from "./Dropdown.module.css";
import { KeyboardArrowDown, KeyboardArrowUp, Close } from "@mui/icons-material";
import { DropdownList } from "../dropdownList/DropdownList";

export const Dropdown = ({ placeholder, options, isSearchable, isMulti }) => {
  const [showDropList, setDropdownList] = useState(false);
  const [selectedOption, setSelectedOption] = useState(isMulti ? [] : null);
  const [searchItem, setSearchItem] = useState("");

  const toggleShow = () => {
    setDropdownList((prevState) => !prevState);
  };

  const handleSelectOption = (option) => {
    if (
      isMulti &&
      selectedOption.filter(
        (selectedOption) => selectedOption.label === option.label
      ).length !== 1
    ) {
      setSelectedOption((prevState) => [...prevState, option]);
    }
    if (!isMulti) {
      setSelectedOption(option);
    }
  };

  const handleSearchOption = (text) => {
    setSearchItem(text);
  };

  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().indexOf(searchItem.toLowerCase()) === 0
  );

  const removeOption = ({ value }) => {
    setSelectedOption(
      selectedOption.filter((option) => option.value !== value)
    );
  };

  const displayedData = () => {
    if (isMulti && selectedOption.length) {
      return selectedOption.map((option, index) => (
        <div className={Styles.list} key={index}>
          {option.label}
          <Close
            className={Styles.close}
            onClick={() => removeOption(option)}
          />
        </div>
      ));
    } else if (!isMulti && selectedOption) {
      return selectedOption.label;
    } else {
      return placeholder;
    }
  };

  useEffect(() => {}, [selectedOption]);

  return (
    <div>
      <div className={Styles.wrapper}>
        <div className={Styles.cover}>{displayedData()}</div>

        {!showDropList ? (
          <KeyboardArrowUp onClick={toggleShow} className={Styles.icon} />
        ) : (
          <KeyboardArrowDown onClick={toggleShow} className={Styles.icon} />
        )}
      </div>
      {showDropList && (
        <DropdownList
          options={filteredOptions}
          handleSelectOption={handleSelectOption}
          isSearchable={isSearchable}
          handleSearchOption={handleSearchOption}
        />
      )}
    </div>
  );
};

Dropdown.defaultProps = {
  placeholder: "Select...",
  options: [],
  isSearchable: false,
  isMulti: false,
};
