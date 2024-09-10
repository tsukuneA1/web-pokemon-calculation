import React from 'react';
import Image from 'next/image';
import { Type, typeInterface } from '@/interfaces';
import { useWindowSize } from '@/function/GetWindowSize';

interface TypeImageProps {
  type: Type
}

const TypeImage: React.FC<TypeImageProps> = ({ type }) => {
    const windowSize = useWindowSize();
    const iconSize = (windowSize.width < 640) ? 15 : (windowSize.width < 1080) ? 20 : 25;
    return (
      <div
        className="w-24 md:w-32 mb-0.5 sm:mb-0 mr-2 bg-zinc-400 p-1 md:px-2 rounded-2xl"
        style={{
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'start',
        }}
      >
        <Image
          src={type.typeIconSrc}
          alt="typeImage"
          width={iconSize}
          height={iconSize}
        />
        <div className='text-xs sm:text-sm mx-1 md:mx-2 text-white'>
        {type.name}
        </div>
      </div>
    );
  
};

export default TypeImage;
