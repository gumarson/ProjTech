import React from 'react';
import HelperTooltip from '../Helper/HelperTooltip';

interface TechInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean
  helperText?: string;
  helperId?: string;
  error?: boolean | string;
  errorMessage?: string;
}

const TechInput: React.FC<TechInputProps> = ({
  label,
  type,
  value,
  onChange,
  disabled = false,
  placeholder = '',
  helperText = '',
  helperId,
  error,
  errorMessage 
}) => {
  return (
   <div className="mb-4">
  <label className="block text-sky-900 font-bold mb-2">
    {label}
    {helperText && helperId && (
      <HelperTooltip id={helperId} text={helperText} />
    )}
  </label>

  <input
    type={type}
    value={value}
    onChange={onChange}
    placeholder={placeholder}
    disabled={disabled}
    className={`w-full p-2 text-black border rounded focus:outline-none 
      ${error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-sky-400'}`}
  />

  {error && errorMessage && (
    <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
  )}
</div>

  );
};

export default TechInput;
