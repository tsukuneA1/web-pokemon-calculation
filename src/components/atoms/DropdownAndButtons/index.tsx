import React, { useState } from 'react';
import TextButton from '../TextButton';
import { DropDownIcon, MiniDropDownIcon } from '@/components/icons/Icons';
import { useWindowSize } from '@/function/GetWindowSize';

export const ranks = ['+6', '+5', '+4', '+3', '+2', '+1', '+-0', '-1', '-2', '-3', '-4', '-5', '-6'];

interface DropdownProps {
  title: string;
  width: string;
  initialPos: number;
  options: string[];
  selected: string;
  onSelect: (selectOption: string) => void;
  buttonClicked: (plus: boolean, selected: string) => void;
  buttonWidth: string;
  buttonHeight: string;
  buttonColor: string;
  buttonBackground: string;
  buttonRadius: string;
  buttonFontSize: number;
}

const DropdownButtons: React.FC<DropdownProps> = ({
  title,
  width = '180px',
  initialPos = 0,
  options,
  onSelect,
  buttonClicked,
  selected,
  buttonWidth,
  buttonHeight,
  buttonColor,
  buttonBackground,
  buttonRadius,
  buttonFontSize,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  function rankChanged(plus: boolean, current: string) {
    if (plus && current != '+6') {
      onSelect(ranks[ranks.indexOf(current) - 1]);
    } else if (!plus && current != '-6') {
      onSelect(ranks[ranks.indexOf(current) + 1]);
    }
  }

  const windowSize = useWindowSize();

  return (
    <div style={styles.effortAndActual}>
      <div style={{ ...styles.container }} className="w-20 sm:w-28 md:w-32">
        <h4 style={{ ...styles.title, textAlign: 'left' }}>{title}</h4>
        <button onClick={toggleDropDown} style={{ ...styles.button}} className="w-20 sm:w-28 md:w-32">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <p className='text-sm sm:text-base m-0'>{selected}</p>
            <p>
              {windowSize.width < 640
                ? <MiniDropDownIcon/>
                : <DropDownIcon />
              }
            </p>
          </div>
        </button>
        {isOpen && (
          <ul style={{ ...styles.menu, maxHeight: '200px', overflowY: 'scroll' }}>
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
      <div style={styles.effortButton} className="ml-4 items-center">
        <TextButton
          text="+"
          width={buttonWidth}
          height={buttonHeight}
          color={buttonColor}
          backgroundColor={buttonBackground}
          fontSize={buttonFontSize}
          borderRadius={buttonRadius}
          onClick={() => buttonClicked(true, selected)}
        />
        <div style={styles.buttonMargins}>
          <TextButton
            text="-"
            width={buttonWidth}
            height={buttonHeight}
            color={buttonColor}
            backgroundColor={buttonBackground}
            fontSize={buttonFontSize}
            borderRadius={buttonRadius}
            onClick={() => buttonClicked(false, selected)}
          />
        </div>
      </div>
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
  effortAndActual: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
  },
  effortButton: {
    display: 'flex',
    marginTop: 'auto',
    marginBottom: '15px',
    alignItems: 'bottom',
  },
  margins: {
    margin: '0 20px',
  },
  buttonMargins: {
    margin: '0 10px',
  },
};

export default DropdownButtons;
