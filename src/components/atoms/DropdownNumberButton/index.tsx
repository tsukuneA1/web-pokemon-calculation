import React, { useEffect, useState } from 'react';
import { DropDownIcon, MiniDropDownIcon } from '@/components/icons/Icons';
import { useWindowSize } from '@/function/GetWindowSize';

interface DropdownNumberProps {
  title: string;
  width: string;
  initialPos: number;
  options: number[];
  selected: number;
  onSelect: (selectOption: number, index: number) => void;
}

const DropdownNumber: React.FC<DropdownNumberProps> = ({
  title,
  width = '180px',
  initialPos = 0,
  options,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[initialPos]);

  useEffect(() => {
    setSelectedOption(options[initialPos]);
  }, [initialPos, options]);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: number) => {
    setSelectedOption(option);
    onSelect(option, options.indexOf(option));
    setIsOpen(false);
  };

  const windowSize = useWindowSize();
  return (
    <div style={{ ...styles.container, maxWidth: '250px' }} className="w-16 sm:w-24 items-start justify-start">
      <h4 style={{ ...styles.title, textAlign: 'left' }}>{title}</h4>
      <button onClick={toggleDropDown} style={{ ...styles.button}} className='w-16 sm:w-24'>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p className='m-0 text-sm sm:text-base'>{selectedOption}</p>
          <p className="text-center">
            {windowSize.width < 640
              ? <MiniDropDownIcon/>
              : <DropDownIcon />
            }
          </p>
        </div>
      </button>
      {isOpen && (
        <ul style={{ ...styles.menu, overflowY: 'scroll', maxHeight: '150px' }}>
          {options.map((option) => (
            <li
              key={option}
              style={{ ...styles.menuItem, textAlign: 'left' }}
              onClick={() => {
                handleSelect(option);
              }}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const styles = {
  title: {
    margin: '0',
  },
  container: {
    position: 'relative' as 'relative',
    display: 'inline-block',
  },
  button: {
    backgroundColor: '#fff',
    borderBottom: '1px solid #ccc',
    borderTop: 'none',
    borderRight: 'none',
    borderLeft: 'none',
    padding: '6px',
    cusor: 'pointer',
    borderRadius: '4px',
  },
  menu: {
    width: '150px',
    listStyle: 'none',
    margin: 0,
    padding: '0',
    position: 'absolute' as 'absolute',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    zIndex: 1000,
  },
  menuItem: {
    padding: '10px',
    cursor: 'pointer',
    ':last-child': {
      borderBottom: 'none',
    },
  },
};

export default DropdownNumber;
