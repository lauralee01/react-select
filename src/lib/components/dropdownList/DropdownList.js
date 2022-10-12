import React from "react";
import Styles from "./DropdownList.module.css";

export const DropdownList = ({
  options,
  handleSelectOption,
  isSearchable,
  handleSearchOption,
}) => {
  return (
    <div className={Styles.wrapper} data-testid="options">
      {isSearchable && options.length ? (
        <input
          type="text"
          data-testid="input"
          className={Styles.input}
          placeholder="Search"
          onChange={(e) => handleSearchOption(e.target.value)}
        />
      ) : null}
      <ul className={Styles.list}>
      {options.length
        ? options.map((option) => (
            <li
              key={option.value}
              data-testid={option.value}
              onClick={() => handleSelectOption(option)}
              className={Styles.listItem}
            >
              {option.label}
            </li>
          ))
        : "No options to display"}
      </ul>
      
    </div>
  );
};
