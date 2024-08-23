import React from 'react';

interface SwitchButtonProps {
  isOn: boolean;
  handleChange: () => void;
}

const SwitchButton: React.FC<SwitchButtonProps> = ({ isOn, handleChange }: SwitchButtonProps) => {
  return (
    <div
      className={`w-9 h-5 sm:w-14 sm:h-7 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
        isOn ? 'bg-indigo-600' : ''
      }`}
      onClick={handleChange}
    >
      <div
        className={`bg-white w-4 h-4 sm:w-6 sm:h-6 rounded-full shadow-md transform transition-transform duration-300 ${
          isOn ? 'translate-x-3 sm:translate-x-6' : ''
        }`}
      ></div>
    </div>
  );
};

export default SwitchButton;
