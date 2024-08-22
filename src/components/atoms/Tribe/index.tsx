import React from 'react';

interface TribeProps {
  tribe: string;
}

const TribeComponent: React.FC<TribeProps> = ({ tribe }) => {
  return (
    <div style={{ marginLeft: 0 }} className='flex'>
      <p style={{ margin: '0px', textAlign: 'left' }} className="text-sm sm:text-base md:text-lg xl:text-xl flex">
        種族値: 
      </p>
      <div className="text-xs sm:text-base xl:text-lg items-center flex">{tribe}</div>
    </div>
  );
};

export default TribeComponent;
