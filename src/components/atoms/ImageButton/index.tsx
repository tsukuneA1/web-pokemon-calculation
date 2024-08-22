import React from 'react';
import Image from 'next/image';

interface ImageButtonProps {
  src: string;
  onClick: () => void;
  width: number;
  ariaLabel: string;
}

const ImageButton: React.FC<ImageButtonProps> = ({ src, onClick}) => {
  return (
    <button onClick={onClick} style={{ borderRadius: '50%', backgroundColor: '#fff', border: 'none' }}>
      <div
        style={{
          borderRadius: '50%',
          backgroundColor: '#fff',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className="w-10 h-10 sm:w-12 sm:h-12"
      >
        <Image src={src} width={100} height={100} layout="responsive" alt="alt" objectFit="cover" />
      </div>
    </button>
  );
};

export default ImageButton;
