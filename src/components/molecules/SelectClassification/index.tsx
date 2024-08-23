import Dropdown from '@/components/atoms/DropdownButton';
import { typeInterface } from '@/interfaces';
import { RootState, setBaseStat, setReferAt } from '@/app/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const SelectedClassification: React.FC = () => {
  const dispatch = useDispatch();
  const atPoke = useSelector((state: RootState) => state.stats.atPoke);
  const flag = useSelector((state: RootState) => state.stats.selectClassFlag);
  const referAt = useSelector((state: RootState) => state.stats.referAt);
  const atTera = useSelector((state: RootState) => state.stats.atTera);

  let initialPos = 0;
  if (!referAt) {
    initialPos = 1;
  } else {
    initialPos = 0;
  }

  function onSelect(option: string) {
    if (option === '物理') {
      dispatch(setReferAt(true));
      dispatch(setBaseStat(atPoke.attack));
    } else {
      dispatch(setReferAt(false));
      dispatch(setBaseStat(atPoke.specialAttack));
    }
  }

  if (flag && atTera !== typeInterface[0]) {
    return (
      <div className="flex justify-start items-start my-3">
        <Dropdown
          title="物理/特殊選択"
          initialPos={initialPos}
          options={['物理', '特殊']}
          onSelect={(selectedOption: string) => onSelect(selectedOption)}
          selected={['物理', '特殊'][initialPos]}
        />
      </div>
    );
  }
};

export default SelectedClassification;
