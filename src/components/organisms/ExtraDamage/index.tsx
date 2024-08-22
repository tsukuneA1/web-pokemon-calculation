import SavedDamageComponent from '@/components/molecules/SavedDamage';
import { subStats } from '@/pages/app/damageSlice';
import { RootState } from '@/pages/app/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ExtraDamageComponent: React.FC = () => {
  const dispatch = useDispatch();
  const extras = useSelector((state: RootState) => state.saved.stats);

  return (
    <div style={{width: '95%'}}>
      {extras.map((extra, index) => (      
        <div key={index}>
          <SavedDamageComponent stat={extra} del={() => dispatch(subStats(index))}/>
        </div>
      ))}
    </div>
  );
};

export default ExtraDamageComponent;
