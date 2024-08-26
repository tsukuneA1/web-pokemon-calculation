import React from 'react';
import Image from 'next/image';

interface TypeImageProps {
  src: string;
}

const TypeImage: React.FC<TypeImageProps> = ({ src }) => {

  if (src != '/images/types/not_selected.png') {
    return (
      <div
        className="h-4 w-16 sm:w-20 sm:h-5 md:h-6 md:w-24 mb-0.5 sm:mb-0"
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
