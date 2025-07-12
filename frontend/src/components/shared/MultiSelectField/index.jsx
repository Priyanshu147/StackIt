import React, { useEffect, useState, useRef } from "react";
import classes from "./index.module.css";

import {
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  TextField,
} from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const MultiSelectField = ({
  name,
  label,
  options = [],
  value: valueKey = "value",
  idKey = "id",
  register,
  setValue,
  error,
  onChange = () => {},
  resetTrigger,
}) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const searchInputRef = useRef(null);
  useEffect(() => {
    setSelectedValues([]);
    setValue(name, []);
  }, [resetTrigger]); // Trigger reset when this changes

  const allOptionIds = options.map((opt) => opt[idKey]);

  const isAllSelected =
    selectedValues.length > 0 && selectedValues.length === allOptionIds.length;

  useEffect(() => {
    register(name, { required: true });
  }, [register, name]);

  const handleChange = (event) => {
    const selected = event.target.value;
    let updatedValues = [];

    if (selected.includes("all")) {
      updatedValues = isAllSelected ? [] : allOptionIds;
    } else {
      updatedValues = selected;
    }

    setSelectedValues(updatedValues);
    setValue(name, updatedValues);
    onChange?.(updatedValues);
  };

  const filteredOptions = options.filter((opt) =>
    opt[valueKey].toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Maintain focus on search input
    searchInputRef.current?.focus();
  };

  return (
    <div className={classes["form-group"]}>
      <label className={classes["label"]}>{label}</label>
      <FormControl fullWidth error={!!error}>
        <Select
          multiple
          value={selectedValues}
          onChange={handleChange}
          renderValue={(selected) =>
            options
              .filter((opt) => selected.includes(opt[idKey]))
              .map((opt) => opt[valueKey])
              .join(", ")
          }
          MenuProps={MenuProps}
          sx={{
            borderRadius: "1rem",
          }}
          // Disable all keyboard interactions that might highlight items
          onKeyDown={(e) => {
            if (e.target.tagName === "INPUT") return;
            e.preventDefault();
          }}
        >
          {/* Search Box - completely isolated from menu navigation */}
          <div
            style={{ padding: "8px 16px" }}
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
              inputRef={searchInputRef}
              sx={{
                "& .MuiOutlinedInput-root": {
                  fontSize: "1.4rem",
                },
              }}
              // Prevent any menu interaction
              onKeyDown={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Select All option */}
          <MenuItem
            value="all"
            sx={{ fontSize: "1.4rem" }}
            // Disable hover/focus styles
            disableGutters
            disableRipple
          >
            <Checkbox
              checked={isAllSelected}
              indeterminate={
                selectedValues.length > 0 &&
                selectedValues.length < allOptionIds.length
              }
            />
            <ListItemText primary="Select All" />
          </MenuItem>

          {/* Filtered options */}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => (
              <MenuItem
                key={opt[idKey]}
                value={opt[idKey]}
                sx={{ fontSize: "1.4rem" }}
                // Disable all hover/focus behaviors
                disableGutters
                disableRipple
                // Prevent keyboard navigation
                onKeyDown={(e) => e.preventDefault()}
              >
                <Checkbox checked={selectedValues.includes(opt[idKey])} />
                <ListItemText primary={opt[valueKey]} />
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled sx={{ fontSize: "1.4rem" }}>
              No options found
            </MenuItem>
          )}
        </Select>
        {error && (
          <p className={classes["validation-msg"]}>
            {error.message || `Please Select ${label}`}
          </p>
        )}
      </FormControl>
    </div>
  );
};

export default MultiSelectField;
