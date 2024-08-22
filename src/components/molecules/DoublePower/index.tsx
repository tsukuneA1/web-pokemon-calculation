import CheckBox from '@/components/atoms/CheckBox';
import { RootState, setDoublePower, setSkill } from '@/pages/app/store';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const doubleSkills = [
  'アクロバット',
  'からげんき',
  'しおみず',
  'ベノムショック',
  'クロスフレイム',
  'クロスサンダー',
  'かたきうち',
  'たたりめ',
  'きまぐレーザー',
];

const DoublePowerComponent: React.FC = () => {
  const dispatch = useDispatch();
  const skill = useSelector((state: RootState) => state.stats.selectedSkill);
  const flag = useSelector((state: RootState) => state.stats.doublePower);

  if (doubleSkills.includes(skill.name)) {

    return <CheckBox content="技威力2倍" checked={flag} handleChange={() => dispatch(setDoublePower(!flag))} />;
  }
};

export default DoublePowerComponent;
