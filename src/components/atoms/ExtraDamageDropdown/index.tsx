import React, { useState } from 'react';
import TextButton from '../TextButton';
import { DropDownIcon, MiniDropDownIcon } from '@/components/icons/Icons';
import { useWindowSize } from '@/function/GetWindowSize';

interface props {
  title: string;
  width: string;
  options: number[];
  selected: number;
  onSelect: (option: number) => void;
  buttonWidth: string;
  buttonHeight: string;
  buttonColor: string;
  buttonBackground: string;
  buttonRadius: string;
  buttonFontSize: number;
}

const ExtraDamageDropdown: React.FC<props> = ({
  title,
  width,
  options,
  selected,
  onSelect,
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

  const handleSelect = (option: number) => {
    onSelect(option);
    setIsOpen(false);
  };

  function buttonClicked(plus: boolean, current: number) {
    if (!plus && current != 0) {
      onSelect(current - 1);
    } else if (plus && current != options.length - 1) {
      onSelect(current + 1);
    }
  }

  const windowSize = useWindowSize();
  return (
    <div className="mr-1 sm:mr-2">
      <h4 style={{ ...styles.title, textAlign: 'left' }}>{title}</h4>
      <div style={styles.effortAndActual}>
        <div style={{ ...styles.container}} >
          
          <button onClick={toggleDropDown} style={{ ...styles.button }} className="w-16 sm:w-24">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ fontSize: '16px', margin: 0 }}>{selected}</p>
              <p>
                {windowSize.width < 640
                  ? <MiniDropDownIcon/>
                  : <DropDownIcon/>
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
        <div style={styles.effortButton} className="ml-1 items-center">
          <div className="mx-1">
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
          </div>
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

export default ExtraDamageDropdown;
