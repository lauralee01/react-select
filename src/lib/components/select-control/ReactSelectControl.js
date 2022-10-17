import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Styles from "./ReactSelectControl.module.css";
import { KeyboardArrowDown, KeyboardArrowUp, Close } from "@mui/icons-material";
import { ReactSelectControlList } from "../select-control-list/ReactSelectControlList";

export const ReactSelectControl = ({
  placeholder,
  options,
  isSearchable,
  isMulti,
  onChange
}) => {
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
      option &&
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

  useEffect(() => {
    onChange(selectedOption)
  }, [selectedOption]);

  return (
    <div className={Styles.control}>
      <div className={Styles.wrapper}>
        <div className={Styles.cover} data-testid="data">
          {displayedData()}
        </div>

        {!showDropList ? (
          <KeyboardArrowUp onClick={toggleShow} className={Styles.icon} />
        ) : (
          <KeyboardArrowDown onClick={toggleShow} className={Styles.icon} />
        )}
      </div>
      {showDropList && (
        <ReactSelectControlList
          options={filteredOptions}
          handleSelectOption={handleSelectOption}
          isSearchable={isSearchable}
          handleSearchOption={handleSearchOption}
        />
      )}
    </div>
  );
};

ReactSelectControl.propTypes = {
  placeholder: PropTypes.string,
  options: PropTypes.array,
  isSearchable: PropTypes.bool,
  isMulti: PropTypes.bool,
  onChange: PropTypes.func,
};

ReactSelectControl.defaultProps = {
  placeholder: "Select...",
  options: [],
  isSearchable: false,
  isMulti: false,
  onChange: () => {},
};
