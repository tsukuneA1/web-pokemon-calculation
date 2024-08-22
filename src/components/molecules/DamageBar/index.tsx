import React from 'react';
import CustomSlider from '../DamageSlider';

export interface DamageBarProps {
  pos1: number;
  pos2: number;
  damageText: string;
}

const DamageBar: React.FC<DamageBarProps> = ({ pos1, pos2, damageText }) => {
  return (
    <div className="pt-5 pl-5 my-2">
      <CustomSlider
        min={0}
        max={0}
        color1="#4caf50"
        color2="#ff5722"
        backgroundColor="#e0e0e0"
        position1={pos1}
        position2={pos2}
      />
      <div className="text-base mt-2 md:text-lg lg:mt-3">{damageText}</div>
    </div>
  );
};

export default DamageBar;
