import React from "react";
import Styles from "./DropdownList.module.css";

export const DropdownList = ({
  options,
  handleSelectOption,
  isSearchable,
  handleSearchOption,
}) => {
  return (
    <div className={Styles.wrapper}>
      {isSearchable && options.length ? (
        <input
          type="text"
          className={Styles.input}
          placeholder="Search"
          onChange={(e) => handleSearchOption(e.target.value)}
        />
      ) : null}
      {options.length
        ? options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelectOption(option)}
              className={Styles.listItem}
            >
              {option.label}
            </li>
          ))
        : "No options to display"}
    </div>
  );
};
