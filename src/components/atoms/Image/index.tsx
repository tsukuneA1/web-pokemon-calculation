import React from 'react';
import Image from 'next/image';

interface ImageComponentProps {
  src: string;
  width: number;
  height: number;
  alt: string;
  borderRadius?: string;
  backgroundColor?: string;
}

const ImageComponent: React.FC<ImageComponentProps> = ({
  src,
  width,
  height,
  alt,
  borderRadius = '0',
  backgroundColor = 'transparent',
}) => {
  return (
    <div
      style={{
        ...styles.border,
        borderRadius,
        backgroundColor,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className="w-24 h-24 sm:w-32 sm:h-32 md:w-32 md:h-32"
    >
      <Image src={src} width={200} height={width} alt={alt} layout="responsive" objectFit="cover" />
    </div>
  );
};

const styles = {
  border: {
    border: '2px solid ##540909',
  },
};

export default ImageComponent;
