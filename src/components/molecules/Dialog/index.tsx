import TypeImage from '@/components/atoms/TypeImage';
import { Type, typeInterface } from '@/interfaces';
import Image from 'next/image';
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
        <div style={styles.flexStyle} className="mb-0.5 sm:mb-0">
          <input type="radio" value="非テラスタル" onClick={() => radioClicked(typeInterface[0])} />
          <div
            className="h-4 w-16 sm:w-20 sm:h-5 md:h-6 md:w-24"
            style={{
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              style={{ marginLeft: '10px' }}
              src={typeInterface[0].typeTagSrc}
              alt="typeImage"
              width={80}
              height={16}
              layout="responsive"
              objectFit="cover"
            />
          </div>
        </div>
        <div style={styles.flexStyle}>
          <input type="radio" value="ノーマル" onClick={() => radioClicked(typeInterface[1])} />
          <TypeImage src={typeInterface[1].typeTagSrc} />
        </div>
        <div style={styles.flexStyle}>
          <input type="radio" value="みず" onClick={() => radioClicked(typeInterface[2])} />
          <TypeImage src={typeInterface[2].typeTagSrc} />
        </div>
        <div style={styles.flexStyle}>
          <input type="radio" value={typeInterface[3].name} onClick={() => radioClicked(typeInterface[3])} />
          <TypeImage src={typeInterface[3].typeTagSrc} />
        </div>
        <div style={styles.flexStyle}>
          <input type="radio" value={typeInterface[4].name} onClick={() => radioClicked(typeInterface[4])} />
          <TypeImage src={typeInterface[4].typeTagSrc} />
        </div>
        <div style={styles.flexStyle}>
          <input type="radio" value={typeInterface[5].name} onClick={() => radioClicked(typeInterface[5])} />
          <TypeImage src={typeInterface[5].typeTagSrc} />
        </div>
        <div style={styles.flexStyle}>
          <input type="radio" value={typeInterface[6].name} onClick={() => radioClicked(typeInterface[6])} />
          <TypeImage src={typeInterface[6].typeTagSrc} />
        </div>
        <div style={styles.flexStyle}>
          <input type="radio" value={typeInterface[7].name} onClick={() => radioClicked(typeInterface[7])} />
          <TypeImage src={typeInterface[7].typeTagSrc} />
        </div>
        <div style={styles.flexStyle}>
          <input type="radio" value={typeInterface[8].name} onClick={() => radioClicked(typeInterface[8])} />
          <TypeImage src={typeInterface[8].typeTagSrc} />
        </div>
        <div style={styles.flexStyle}>
          <input type="radio" value={typeInterface[9].name} onClick={() => radioClicked(typeInterface[9])} />
          <TypeImage src={typeInterface[9].typeTagSrc} />
        </div>
        <div style={styles.flexStyle}>
          <input type="radio" value={typeInterface[10].name} onClick={() => radioClicked(typeInterface[10])} />
          <TypeImage src={typeInterface[10].typeTagSrc} />
        </div>
        <div style={styles.flexStyle}>
          <input type="radio" value={typeInterface[11].name} onClick={() => radioClicked(typeInterface[11])} />
          <TypeImage src={typeInterface[11].typeTagSrc} />
        </div>
        <div style={styles.flexStyle}>
          <input type="radio" value={typeInterface[12].name} onClick={() => radioClicked(typeInterface[12])} />
          <TypeImage src={typeInterface[12].typeTagSrc} />
        </div>
        <div style={styles.flexStyle}>
          <input type="radio" value={typeInterface[13].name} onClick={() => radioClicked(typeInterface[13])} />
          <TypeImage src={typeInterface[13].typeTagSrc} />
        </div>
        <div style={styles.flexStyle}>
          <input type="radio" value={typeInterface[14].name} onClick={() => radioClicked(typeInterface[14])} />
          <TypeImage src={typeInterface[14].typeTagSrc} />
        </div>
        <div style={styles.flexStyle}>
          <input type="radio" value={typeInterface[15].name} onClick={() => radioClicked(typeInterface[15])} />
          <TypeImage src={typeInterface[15].typeTagSrc} />
        </div>
        <div style={styles.flexStyle}>
          <input type="radio" value={typeInterface[16].name} onClick={() => radioClicked(typeInterface[16])} />
          <TypeImage src={typeInterface[16].typeTagSrc} />
        </div>
        <div style={styles.flexStyle}>
          <input type="radio" value={typeInterface[17].name} onClick={() => radioClicked(typeInterface[17])} />
          <TypeImage src={typeInterface[17].typeTagSrc} />
        </div>
        <div style={styles.flexStyle}>
          <input type="radio" value={typeInterface[18].name} onClick={() => radioClicked(typeInterface[18])} />
          <TypeImage src={typeInterface[18].typeTagSrc} />
        </div>
        <div style={styles.flexStyle}>
          <input type="radio" value={typeInterface[19].name} onClick={() => radioClicked(typeInterface[19])} />
          <TypeImage src={typeInterface[19].typeTagSrc} />
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
  },
};

export default Dialog;
