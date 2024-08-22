import React from 'react';

interface InputProps {
  content: string;
  checked: boolean;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox: React.FC<InputProps> = ({ checked, handleChange, content }: InputProps) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        checked={checked}
        style={{ width: '20px', height: '20px', border: '2px solid #000' }}
        onChange={(e) => handleChange(e)}
      />
      <div className='ml-3'>
      {content}
      </div>
      
    </div>
  );
};

export default CheckBox;
