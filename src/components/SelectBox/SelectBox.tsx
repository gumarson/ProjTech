"use client";
import React from "react";
import Select, { SingleValue } from "react-select";
import HelperTooltip from "../Helper/HelperTooltip";
interface OptionType {
  value: string | number | boolean;
  label: string;
}

interface SelectBoxProps {
  options?: OptionType[];
  placeholder?: string;
  value?: string | number | boolean;
  onChange: (value: string | number | boolean) => void;
  disabled?: boolean;
  helperText?: string;
  helperId?: string;
  label?: string;
}

const SelectBox: React.FC<SelectBoxProps> = ({
  options = [],
  placeholder = "",
  value,
  onChange,
  disabled = false,
  helperText,
  helperId,
  label
}) => {
  const handleChange = (selectedOption: SingleValue<OptionType>) => {
    onChange(selectedOption ? selectedOption.value : "");
  };

  return (
    <div className="mb-4">
        {label && (
            <label className="block text-sky-900 font-bold mb-2">
              {label}
                {helperText && helperId && (
                    <HelperTooltip id={helperId} text={helperText} />
                  )}
              </label>
        )}
        <Select
          options={options}
          placeholder={placeholder}
          value={options.find((option) => option.value === value)}
          onChange={handleChange}
          isClearable
          isSearchable
          isDisabled={disabled}
          className="w-64 text-black"
    
        />
    </div>
  );
};

export default SelectBox;
