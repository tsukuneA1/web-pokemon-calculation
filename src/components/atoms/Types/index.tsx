import React from 'react';
import TypeImage from '../TypeImage';
import { Type, typeInterface } from '@/interfaces';
import AutoTypeImage from '../AutoTypeImage';

interface TypeProps {
  type1: Type;
  type2: Type;
}

const Types: React.FC<TypeProps> = ({ type1, type2 }) => {
  return (
    <div>
      <div style={{ ...styles.type }} className="text-base sm:text-lg md:text-xl relative">
        <AutoTypeImage type={type1} />
        {typeInterface.includes(type2) ? <AutoTypeImage type={type2} /> : <></>}
      </div>
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
