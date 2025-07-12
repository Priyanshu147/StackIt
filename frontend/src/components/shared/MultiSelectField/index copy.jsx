import React, { useState, useEffect, useMemo } from "react";
import classes from "./index.module.css";

export default function MultiSelectField({
  label,
  name,
  options,
  validation,
  register,
  error,
  idKey = "id",
  value = "name",
  onChange = () => {},
  setValue,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Register the field with react-hook-form
  const { ref, ...rest } = register(name, validation);

  // Memoize filtered options for better performance
  const filteredOptions = useMemo(() => {
    if (!searchTerm) return options;
    return options.filter(option =>
      String(option[value]).toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [options, searchTerm, value]);

  // Check if all filtered options are selected
  const allFilteredSelected = filteredOptions.length > 0 && 
    filteredOptions.every(option => selectedValues.includes(option[idKey]));

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setSearchTerm(""); // Reset search when opening dropdown
    }
  };

  // Handle individual checkbox change
  const handleCheckboxChange = (optionId) => {
    const newSelectedValues = selectedValues.includes(optionId)
      ? selectedValues.filter(id => id !== optionId)
      : [...selectedValues, optionId];
    
    updateSelectedValues(newSelectedValues);
  };

  // Handle "Select All" checkbox change for filtered options
  const handleSelectAllFilteredChange = () => {
    const filteredOptionIds = filteredOptions.map(option => option[idKey]);
    const newSelectedValues = allFilteredSelected
      ? selectedValues.filter(id => !filteredOptionIds.includes(id))
      : Array.from(new Set([...selectedValues, ...filteredOptionIds]));
    
    updateSelectedValues(newSelectedValues);
  };

  // Update selected values and form state
  const updateSelectedValues = (newSelectedValues) => {
    setSelectedValues(newSelectedValues);
    onChange(newSelectedValues);
    
    // Update the form value
    if (setValue) {
      setValue(name, newSelectedValues, { shouldValidate: true });
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(`.${classes["dropdown-container"]}`)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={classes["form-group"]}>
      <label className={classes["label"]}>{label}</label>
      
      <div className={classes["dropdown-container"]} ref={ref}>
        <button 
          type="button"
          className={`${classes["dropdown-button"]} ${error ? classes["input-invalid"] : ""}`}
          onClick={toggleDropdown}
        >
          {selectedValues.length > 0 
            ? selectedValues.length === options.length
              ? `All ${label} selected`
              : `${selectedValues.length} selected` 
            : `Select ${label}`}
          <span className={classes["dropdown-arrow"]}>
            {isOpen ? '▲' : '▼'}
          </span>
        </button>
        
        {isOpen && (
          <div className={classes["dropdown-options"]}>
            {/* Search input */}
            <div className={classes["search-container"]}>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={classes["search-input"]}
                autoFocus
              />
            </div>

            {/* Select All filtered checkbox */}
            {filteredOptions.length > 0 && (
              <>
                <label className={`${classes["dropdown-option"]} ${classes["select-all-option"]}`}>
                  <input
                    type="checkbox"
                    checked={allFilteredSelected}
                    onChange={handleSelectAllFilteredChange}
                    className={classes["checkbox-input"]}
                  />
                  <strong>Select All Filtered</strong>
                </label>
                <div className={classes["divider"]}></div>
              </>
            )}

            {/* Individual options */}
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <label key={option[idKey]} className={classes["dropdown-option"]}>
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(option[idKey])}
                    onChange={() => handleCheckboxChange(option[idKey])}
                    className={classes["checkbox-input"]}
                  />
                  {option[value]}
                </label>
              ))
            ) : (
              <div className={classes["no-results"]}>No options found</div>
            )}
          </div>
        )}
        
        {/* Hidden input to store the actual form value */}
        <input
          type="hidden"
          name={name}
          value={selectedValues.join(',')}
          {...register(name, validation)}
        />
      </div>

      {error && <p className={classes["validation-msg"]}>{error.message}</p>}
    </div>
  );
}