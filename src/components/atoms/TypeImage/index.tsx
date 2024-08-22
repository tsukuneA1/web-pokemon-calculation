import React from 'react';
import Image from 'next/image';
import { useWindowSize } from '@/function/GetWindowSize';

interface TypeImageProps {
  src: string;
}

const TypeImage: React.FC<TypeImageProps> = ({ src }) => {
  const windowSize = useWindowSize();

  if (src != '/images/types/not_selected.png') {
    return (
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
          src={src}
          alt="typeImage"
          width={80}
          height={20}
          layout="responsive"
          objectFit="contain"
        />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default TypeImage;
