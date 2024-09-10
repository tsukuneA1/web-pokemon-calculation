import DropdownButtons from '@/components/atoms/DropdownAndButtons';
import Dropdown from '@/components/atoms/DropdownButton';
import React from 'react';

interface natureRankProps {
  buttonWidth: string;
  buttonHeight: string;
  buttonColor: string;
  buttonBackground: string;
  buttonRadius: string;
  buttonFontSize: number;
  natureSelect: string;
  rankSelect: string;
  natureHandle: (index: number) => void;
  rankHandle: (rankVal: string) => void;
  rankButtonClicked: (plus: boolean, rankVal: string) => void;
}

const NatureRank: React.FC<natureRankProps> = ({
  buttonWidth,
  buttonHeight,
  buttonColor,
  buttonBackground,
  buttonRadius,
  buttonFontSize,
  natureSelect,
  rankSelect,
  natureHandle,
  rankHandle,
  rankButtonClicked,
}) => {
  const charas = ['×1.1', '×1.0', '×0.9'];
  const ranks = ['+6', '+5', '+4', '+3', '+2', '+1', '+-0', '-1', '-2', '-3', '-4', '-5', '-6'];
  return (
    <div>
      <div style={styles.effortAndActual}>
      <Dropdown
        title="性格補正"
        options={charas}
        initialPos={charas.indexOf(natureSelect)}
        selected={natureSelect}
        onSelect={(option, index) => natureHandle(index)}
      />
      <div className="ml-4">
        <DropdownButtons
          title="ランク補正"
          width="120px"
          options={ranks}
          selected={rankSelect}
          initialPos={6}
          buttonWidth={buttonWidth}
          buttonHeight={buttonHeight}
          buttonColor={buttonColor}
          buttonBackground={buttonBackground}
          buttonRadius={buttonRadius}
          buttonFontSize={buttonFontSize}
          onSelect={(selected: string) => rankHandle(selected)}
          buttonClicked={(plus: boolean, selected: string) => rankButtonClicked(plus, selected)}
        />
      </div>
      
    </div>
    </div>
    
  );
};

const styles = {
  headline: {
    justifyContent: 'center',
    border: '2px solid #000',
    borderRadius: '7px',
    alignItems: 'center',
  },
  effortAndActual: {
    display: 'flex',
    justifyContent: 'left',
    alignItems: 'center',
  },
  effortButton: {
    display: 'flex',
    marginTop: 'auto',
    alignItems: 'bottom',
  },
  margins: {
    margin: '0 20px',
  },
  buttonMargins: {
    margin: '0 10px',
  },
};

export default NatureRank;
