import React from 'react';

interface TribeProps {
  tribe: string;
}

const TribeComponent: React.FC<TribeProps> = ({ tribe }) => {
  return (
    <div style={{ marginLeft: 0 }} className="flex my-1">
      <p style={{ margin: '0px', textAlign: 'left' }} className="text-sm sm:text-base md:text-lg flex">
        種族値:
      </p>
      <div className="text-sm sm:text-base md:text-lg items-center flex">{tribe}</div>
    </div>
  );
};

export default TribeComponent;
