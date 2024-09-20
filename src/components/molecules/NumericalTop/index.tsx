import DropdownNumber from '@/components/atoms/DropdownNumberButton';
import SeekBar from '@/components/atoms/SeekBar';
import TagAndVal from '@/components/atoms/TagAndValue';
import TextButton from '@/components/atoms/TextButton';
import React from 'react';

interface HNumericalProps {
  tag: string;
  effortVal: number;
  actualVal: number;
  seekBarPos: number;
  individualVal: number;
  effortMax: () => void;
  effortZero: () => void;
  effortPlus: () => void;
  effortMinus: () => void;
  setIndividual: (val: number) => void;
  seekBarChange: (value: number) => void;
}

const NumericalTop: React.FC<HNumericalProps> = ({
  tag,
  effortVal,
  actualVal,
  seekBarPos,
  individualVal,
  effortMax,
  effortZero,
  effortPlus,
  effortMinus,
  setIndividual,
  seekBarChange,
}) => {
  const buttonWidth = '60px';
  const buttonHeight = '35px';
  const buttonColor = '#6652b5';
  const buttonBackground = '#ece9fb';
  const buttonRadius = '20px';
  const buttonFontSize = 16;
  const seekbarWidth = '300px';
  return (
    <div>
      <h3 style={styles.headline} className="text-base sm:text-lg md:text-xl p-1 w-12 sm:w-16 md:w-20">
        {tag}
      </h3>
      <div style={styles.effortAndActual} className="mb-2">
        <TagAndVal tagText="実数値" valText={String(actualVal)} />
        <div style={styles.margins}>
          <TagAndVal tagText="努力値" valText={String(effortVal)} />
        </div>
        <div style={styles.effortButton} className="items-center">
          <TextButton
            text="0"
            width={buttonWidth}
            height={buttonHeight}
            color={buttonColor}
            backgroundColor={buttonBackground}
            fontSize={buttonFontSize}
            borderRadius={buttonRadius}
            onClick={effortZero}
          />
          <div style={styles.buttonMargins} className="items-center">
            <TextButton
              text="252"
              width={buttonWidth}
              height={buttonHeight}
              color={buttonColor}
              backgroundColor={buttonBackground}
              fontSize={buttonFontSize}
              borderRadius={buttonRadius}
              onClick={effortMax}
            />
          </div>
          <div className="mx-3 items-center">
            <DropdownNumber
              title="個体値"
              width="120px"
              initialPos={individualVal}
              selected={individualVal}
              options={[
                0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
                28, 29, 30, 31,
              ]}
              onSelect={(option, index) => {
                setIndividual(index);
              }}
            />
          </div>
        </div>
      </div>
      <div style={styles.effortAndActual}>
        <SeekBar
          min={0}
          max={32}
          step={1}
          width={seekbarWidth}
          initialValue={seekBarPos}
          currentVal={seekBarPos}
          backgroundColor="#dfd8e5"
          onChange={(value) => seekBarChange(value)}
        />
        <TextButton
          text="+"
          width={buttonWidth}
          height={buttonHeight}
          color={buttonColor}
          backgroundColor={buttonBackground}
          fontSize={buttonFontSize}
          borderRadius={buttonRadius}
          onClick={effortPlus}
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
            onClick={effortMinus}
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

export default NumericalTop;
