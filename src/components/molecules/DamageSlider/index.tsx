import React from 'react';

interface CustomSliderProps {
  min: number;
  max: number;
  color1: string;
  color2: string;
  backgroundColor: string;
  position1: number;
  position2: number;
}

const CustomSlider: React.FC<CustomSliderProps> = ({
  min,
  max,
  color1,
  color2,
  backgroundColor,
  position1,
  position2,
}) => {
  var firstRightRadius = '0px';
  var firstLeftRadius = '10px';
  var secondRightRadius = '0px';
  var secondLeftRadius = '0px';
  if (position1 == 0) {
    secondLeftRadius = '10px';
    if (position2 == 0) {
      firstLeftRadius = '10px';
    }
  }
  if (position2 == 100) {
    secondRightRadius = '10px';
    if (position1 == 100) {
      firstRightRadius = '10px';
    }
  }

  return (
    <div
      style={{ width: '100%', position: 'relative', borderRadius: '20px' }}
      className="justify-items-center items-center flex mr-0 h-2.5 md:h-3"
    >
      <div
        className="bg-gray-300"
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          borderRadius: '10px',
        }}
      />
      <div
        className="bg-primary-400"
        style={{
          position: 'absolute',
          width: `${position1}%`,
          height: '100%',
          borderTopLeftRadius: firstLeftRadius,
          borderBottomLeftRadius: firstLeftRadius,
          borderTopRightRadius: firstRightRadius,
          borderBottomRightRadius: firstRightRadius,
        }}
      />
      <div
        className="bg-primary-600"
        style={{
          position: 'absolute',
          left: `${position1}%`,
          width: `${position2 - position1}%`,
          height: '100%',
          borderTopLeftRadius: secondLeftRadius,
          borderBottomLeftRadius: secondLeftRadius,
          borderTopRightRadius: secondRightRadius,
          borderBottomRightRadius: secondRightRadius,
        }}
      />
    </div>
  );
};

export default CustomSlider;
