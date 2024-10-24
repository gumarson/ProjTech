import React from 'react';

interface TechInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const TechInput: React.FC<TechInputProps> = ({
  label,
  type,
  value,
  onChange,
  placeholder = '',
}) => {
  return (
    <div className="mb-4">
      <label className="block text-green-900 font-bold mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
      />
    </div>
  );
};

export default TechInput;
