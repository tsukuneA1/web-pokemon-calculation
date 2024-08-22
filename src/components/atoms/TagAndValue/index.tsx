import React from 'react';

interface TagValueProps {
  tagText: string;
  valText: string;
}

const TagAndVal: React.FC<TagValueProps> = ({ tagText, valText }) => {
  return (
    <div style={{ justifyContent: 'left', textAlign: 'center' }}>
      <p className='text-base sm:text-lg md:text-xl'>{tagText}</p>
      <p className='text-sm sm:text-base md:text-lg'>{valText}</p>
    </div>
  );
};

export default TagAndVal;
