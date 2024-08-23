import React, { useEffect, useState } from 'react';
import { DropDownIcon, MiniDropDownIcon } from '@/components/icons/Icons';
import { useWindowSize } from '@/function/GetWindowSize';

interface DropdownProps {
  title: string;
  initialPos: number;
  options: string[];
  selected: string;
  onSelect: (selectOption: string, index: number) => void;
}

const Dropdown: React.FC<DropdownProps> = ({ title, initialPos = 0, options, onSelect, selected }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options[initialPos]);

  useEffect(() => {
    setSelectedOption(selected);
  }, [selected]);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    onSelect(option, options.indexOf(option));
    setIsOpen(false);
  };

  const windowSize = useWindowSize();

  return (
    <div style={{ ...styles.container }} className="w-20 sm:w-28 md:w-32">
      <h4 style={{ ...styles.title, textAlign: 'left' }} className="text-base sm:text-lg">
        {title}
      </h4>
      <button onClick={toggleDropDown} style={{ ...styles.button }} className="w-20 sm:w-28 md:w-32">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p className="text-sm sm:text-base m-0">{selected}</p>
          <p className="text-center">{windowSize.width < 640 ? <MiniDropDownIcon /> : <DropDownIcon />}</p>
        </div>
      </button>
      {isOpen && (
        <ul style={{ ...styles.menu, overflowY: 'scroll', maxHeight: '300px', width: '200px', minHeight: '150px' }}>
          {options.map((option) => (
            <li
              key={option}
              style={{ ...styles.menuItem, textAlign: 'left' }}
              onClick={() => {
                handleSelect(option);
              }}
              className="text-sm sm:text-base"
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

export default Dropdown;
