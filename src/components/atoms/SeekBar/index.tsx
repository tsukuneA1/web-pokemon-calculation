import React, { useState } from 'react';

interface SeekBarProps {
  width?: string;
  backgroundColor?: string;
  min: number;
  max: number;
  step: number;
  initialValue: number;
  currentVal: number;
  onChange: (value: number) => void;
}

const SeekBar: React.FC<SeekBarProps> = ({ width = '100%', min, max, step, initialValue, onChange, currentVal }) => {
  const [value, setValue] = useState(initialValue);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(event.target.value);
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <div style={{ ...styles.container }} className="w-2/3">
      <input
        className="
          w-full
          h-1
          bg-gray-200
          rounded-lg
          appearance-none
          cursor-pointer
          accent-indigo-500
        "
        type="range"
        min={min}
        max={max}
        step={step}
        value={currentVal}
        onChange={handleChange}
        style={{
          ...styles.slider,
          width,
          accentColor: 'transparent',
          background: `linear-gradient(to right, #6750A4 0%, #6750A4 ${(currentVal / 32) * 100}%, #e5e7eb ${(currentVal / 32) * 100}%, #e5e7eb 100%)`,
        }}
      />
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
  },
  slider: {
    flex: 1,
    marginRight: '10px',
  },
  valueLabel: {},
};

export default SeekBar;
