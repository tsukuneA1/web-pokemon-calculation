import TypeImage from '@/components/atoms/TypeImage';
import { useWindowSize } from '@/function/GetWindowSize';
import { Type, typeInterface } from '@/interfaces';
import React, { useEffect } from 'react';

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const dialogBoxStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
};

const buttonStyle: React.CSSProperties = {
  marginTop: '10px',
};

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  radioSelected: (selected: Type) => void;
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, radioSelected }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  function radioClicked(type: Type) {
    radioSelected(type);
    onClose();
  }

  return (
    <div style={overlayStyle} onClick={onClose} className="z-50">
      <div style={dialogBoxStyle} onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}>
        <h2>テラスタイプを選択してください</h2>
        <div style={styles.flexStyle}>
          <input style={styles.margin} type="radio" value="非選択" onClick={() => radioClicked(typeInterface[0])} />
          <TypeImage type={typeInterface[0]} />
        </div>
        <div style={styles.flexStyle}>
          <input style={styles.margin} type="radio" value="ノーマル" onClick={() => radioClicked(typeInterface[1])} />
          <TypeImage type={typeInterface[1]} />
        </div>
        <div style={styles.flexStyle}>
          <input style={styles.margin} type="radio" value="みず" onClick={() => radioClicked(typeInterface[2])} />
          <TypeImage type={typeInterface[2]} />
        </div>
        <div style={styles.flexStyle}>
          <input
            style={styles.margin}
            type="radio"
            value={typeInterface[3].name}
            onClick={() => radioClicked(typeInterface[3])}
          />
          <TypeImage type={typeInterface[3]} />
        </div>
        <div style={styles.flexStyle}>
          <input
            style={styles.margin}
            type="radio"
            value={typeInterface[4].name}
            onClick={() => radioClicked(typeInterface[4])}
          />
          <TypeImage type={typeInterface[4]} />
        </div>
        <div style={styles.flexStyle}>
          <input
            style={styles.margin}
            type="radio"
            value={typeInterface[5].name}
            onClick={() => radioClicked(typeInterface[5])}
          />
          <TypeImage type={typeInterface[5]} />
        </div>
        <div style={styles.flexStyle}>
          <input
            style={styles.margin}
            type="radio"
            value={typeInterface[6].name}
            onClick={() => radioClicked(typeInterface[6])}
          />
          <TypeImage type={typeInterface[6]} />
        </div>
        <div style={styles.flexStyle}>
          <input
            style={styles.margin}
            type="radio"
            value={typeInterface[7].name}
            onClick={() => radioClicked(typeInterface[7])}
          />
          <TypeImage type={typeInterface[7]} />
        </div>
        <div style={styles.flexStyle}>
          <input
            style={styles.margin}
            type="radio"
            value={typeInterface[8].name}
            onClick={() => radioClicked(typeInterface[8])}
          />
          <TypeImage type={typeInterface[8]} />
        </div>
        <div style={styles.flexStyle}>
          <input
            style={styles.margin}
            type="radio"
            value={typeInterface[9].name}
            onClick={() => radioClicked(typeInterface[9])}
          />
          <TypeImage type={typeInterface[9]} />
        </div>
        <div style={styles.flexStyle}>
          <input
            style={styles.margin}
            type="radio"
            value={typeInterface[10].name}
            onClick={() => radioClicked(typeInterface[10])}
          />
          <TypeImage type={typeInterface[10]} />
        </div>
        <div style={styles.flexStyle}>
          <input
            style={styles.margin}
            type="radio"
            value={typeInterface[11].name}
            onClick={() => radioClicked(typeInterface[11])}
          />
          <TypeImage type={typeInterface[11]} />
        </div>
        <div style={styles.flexStyle}>
          <input
            style={styles.margin}
            type="radio"
            value={typeInterface[12].name}
            onClick={() => radioClicked(typeInterface[12])}
          />
          <TypeImage type={typeInterface[12]} />
        </div>
        <div style={styles.flexStyle}>
          <input
            style={styles.margin}
            type="radio"
            value={typeInterface[13].name}
            onClick={() => radioClicked(typeInterface[13])}
          />
          <TypeImage type={typeInterface[13]} />
        </div>
        <div style={styles.flexStyle}>
          <input
            style={styles.margin}
            type="radio"
            value={typeInterface[14].name}
            onClick={() => radioClicked(typeInterface[14])}
          />
          <TypeImage type={typeInterface[14]} />
        </div>
        <div style={styles.flexStyle}>
          <input
            style={styles.margin}
            type="radio"
            value={typeInterface[15].name}
            onClick={() => radioClicked(typeInterface[15])}
          />
          <TypeImage type={typeInterface[15]} />
        </div>
        <div style={styles.flexStyle}>
          <input
            style={styles.margin}
            type="radio"
            value={typeInterface[16].name}
            onClick={() => radioClicked(typeInterface[16])}
          />
          <TypeImage type={typeInterface[16]} />
        </div>
        <div style={styles.flexStyle}>
          <input
            style={styles.margin}
            type="radio"
            value={typeInterface[17].name}
            onClick={() => radioClicked(typeInterface[17])}
          />
          <TypeImage type={typeInterface[17]} />
        </div>
        <div style={styles.flexStyle}>
          <input
            style={styles.margin}
            type="radio"
            value={typeInterface[18].name}
            onClick={() => radioClicked(typeInterface[18])}
          />
          <TypeImage type={typeInterface[18]} />
        </div>
        <div style={styles.flexStyle}>
          <input
            style={styles.margin}
            type="radio"
            value={typeInterface[19].name}
            onClick={() => radioClicked(typeInterface[19])}
          />
          <TypeImage type={typeInterface[19]} />
        </div>
      </div>
      <button style={buttonStyle} onClick={onClose}></button>
    </div>
  );
};

const styles = {
  flexStyle: {
    display: 'flex',
    justifyItems: 'center',
    alignItems: 'center',
    paddingLeft: '20%',
    marginBottom: '3px',
  },
  margin: {
    marginRight: '10px',
  },
};

export default Dialog;
