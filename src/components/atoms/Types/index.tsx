import React from 'react';
import Image from 'next/image';
import TypeImage from '../TypeImage';

interface TypeProps {
  src1: string;
  src2: string;
  fontSize: string;
}

const Types: React.FC<TypeProps> = ({ src1, src2, fontSize = '20' }) => {
  return (
    <div style={{ ...styles.type }} className="text-base sm:text-lg md:text-xl relative">
      <p style={{ margin: '0px' }} className='text-sm sm:text-base md:text-lg'>タイプ:</p>
      <TypeImage src={src1} />
      <TypeImage src={src2} />
    </div>
  );
};

const styles = {
  type: {
    display: 'flex',
    alignItems: 'center',
  },
  image: {
    marginLeft: '10px',
  },
};

export default Types;
