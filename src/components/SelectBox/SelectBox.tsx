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
            <label className="block text-white font-bold mb-2">
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
  className="w-64"
  styles={{
    control: (base, state) => ({
      ...base,
      backgroundColor: '#1e293b', // slate-800
      color: '#fff',
      borderColor: state.isFocused ? '#3b82f6' : '#334155', // accent-400 ou slate-700
      boxShadow: state.isFocused ? '0 0 0 2px #3b82f6' : undefined,
      '&:hover': {
        borderColor: '#3b82f6',
      },
    }),
    singleValue: (base) => ({
      ...base,
      color: '#fff',
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: '#1e293b', // slate-800
      color: '#fff',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isSelected
        ? '#334155' // slate-700
        : state.isFocused
        ? '#475569' // slate-600
        : '#1e293b', // slate-800
      color: '#fff',
      cursor: 'pointer',
    }),
    placeholder: (base) => ({
      ...base,
      color: '#94a3b8', // slate-400
    }),
    input: (base) => ({
      ...base,
      color: '#fff',
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: '#fff',
      '&:hover': {
        color: '#3b82f6', // accent-400
      },
    }),
    clearIndicator: (base) => ({
      ...base,
      color: '#fff',
      '&:hover': {
        color: '#ef4444', // red-500
      },
    }),
  }}
/>

    </div>
  );
};

export default SelectBox;
