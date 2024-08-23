import React from 'react';

interface TextButtonProps {
  width: string;
  height: string;
  text: string;
  color: string;
  fontSize: number;
  borderRadius: string;
  backgroundColor: string;
  onClick: () => void;
}

const BigButton: React.FC<TextButtonProps> = ({
  text,
  onClick,
  color,
  borderRadius = '50%',
  backgroundColor = '#000000',
}) => {
  return (
    <button
      onClick={onClick}
      style={{ ...styles.button, color, borderRadius, backgroundColor: backgroundColor }}
      className="shadow-md hover:shadow-lg focus:outline-none focus:#6652b5 active:bg-blue-600 transition duration-200 ease-in-out w-12 h-8 sm:w-14 sm:h-9 md:w-20 md:h-12 lg:w-32 text-sm sm:text-base"
    >
      {text}
    </button>
  );
};

const styles = {
  button: {
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default BigButton;
