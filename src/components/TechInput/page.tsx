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
  maxLength?: number; // Adicionado para permitir limitar o tamanho do input
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
  errorMessage,
  maxLength,
}) => {
  return (
   <div className="mb-4">
  <label className="block text-white font-bold mb-2">
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
    maxLength={maxLength}
    className={`w-full p-3 rounded-lg bg-primary-700 border border-primary-600 
      text-white placeholder-primary-400 focus:outline-none focus:ring-2 
      focus:ring-accent-400 transition-all duration-300
      ${error ? 'border-red-500 focus:ring-red-500' : ''}`}
  />

  {error && errorMessage && (
    <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
  )}
</div>

  );
};

export default TechInput;
