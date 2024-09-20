import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setAtRank, setEffortValue, setIndividualValue, setNatureMultiplier } from '@/app/store';
import NumericalTop from '../NumericalTop';
import NatureRank from '../NatureAndRank';

interface NumericalProps {
  AtOrSpe: string;
  effortVal: number;
}

const Numerical: React.FC<NumericalProps> = ({ AtOrSpe }) => {
  const dispatch = useDispatch();

  const charas = useMemo(() => ['×1.1', '×1.0', '×0.9'], []);
  const charaValues = useMemo(() => [1.1, 1.0, 0.9], []);
  const ranks = useMemo(() => ['+6', '+5', '+4', '+3', '+2', '+1', '+-0', '-1', '-2', '-3', '-4', '-5', '-6'], []);

  const baseStat = useSelector((state: RootState) => state.stats.baseStat);
  const individualValue = useSelector((state: RootState) => state.stats.individualValue);
  const effortValue = useSelector((state: RootState) => state.stats.effortValue);
  const natureMultiplier = useSelector((state: RootState) => state.stats.natureMultiplier);
  const atRank = useSelector((state: RootState) => state.stats.atRank);

  const [seekBarValue, setSeekBarValue] = useState(0);
  const [charaValue, setCharaValue] = useState(charas[1]);

  useEffect(() => {
    if (effortValue === 0) {
      setSeekBarValue(0);
    } else if (effortValue === 4) {
      setSeekBarValue(1);
    } else {
      setSeekBarValue((effortValue + 4) / 8);
    }
  }, [effortValue]);

  useEffect(() => {
    if (natureMultiplier === 1) {
      setCharaValue(charas[1]);
    } else if (natureMultiplier === 1.1) {
      setCharaValue(charas[0]);
    } else {
      setCharaValue(charas[2]);
    }
  }, [natureMultiplier, charas]);

  const actualValue = Math.floor(
    Math.floor(((baseStat * 2 + individualValue + effortValue / 4) * 50) / 100 + 5) * natureMultiplier,
  );

  function effortCalc(val: number): number {
    if (val === 0) {
      return 0;
    }
    return val * 8 - 4;
  }

  function effortMinMax(max: boolean) {
    if (max) {
      setSeekBarValue(32);
      dispatch(setEffortValue(252));
    } else {
      setSeekBarValue(0);
      dispatch(setEffortValue(0));
    }
  }

  function effortButtonClicked(plus: boolean) {
    if (plus && effortValue < 252) {
      if (effortValue === 0) {
        setSeekBarValue(seekBarValue + 1);
        dispatch(setEffortValue(effortValue + 4));
      } else {
        setSeekBarValue(seekBarValue + 1);
        dispatch(setEffortValue(effortValue + 8));
      }
    } else {
      if (!plus && effortValue > 4) {
        dispatch(setEffortValue(effortValue - 8));
        setSeekBarValue(seekBarValue - 1);
      } else if (!plus && effortValue == 4) {
        dispatch(setEffortValue(0));
        setSeekBarValue(0);
      }
    }
  }

  function rankChanged(plus: boolean, current: string) {
    if (plus && current !== '+6') {
      dispatch(setAtRank(ranks.indexOf(current) - 1));
    } else if (!plus && current !== '-6') {
      dispatch(setAtRank(ranks.indexOf(current) + 1));
    }
  }

  function handleCharaSelect(index: number) {
    setCharaValue(charas[index]);
    dispatch(setNatureMultiplier(charaValues[index]));
  }

  function individualSelect(index: number) {
    dispatch(setIndividualValue(index));
  }

  return (
    <div className="my-3">
      <NumericalTop
        tag={AtOrSpe}
        effortVal={effortValue}
        actualVal={actualValue}
        seekBarPos={seekBarValue}
        individualVal={individualValue}
        effortMax={() => effortMinMax(true)}
        effortZero={() => effortMinMax(false)}
        effortPlus={() => effortButtonClicked(true)}
        effortMinus={() => effortButtonClicked(false)}
        setIndividual={(val: number) => individualSelect(val)}
        seekBarChange={(value: number) => {
          setSeekBarValue(value), dispatch(setEffortValue(effortCalc(value)));
        }}
      />
      <NatureRank
        natureSelect={charaValue}
        rankSelect={ranks[atRank]}
        natureHandle={(index) => handleCharaSelect(index)}
        rankHandle={(selected: string) => dispatch(setAtRank(ranks.indexOf(selected)))}
        rankButtonClicked={(plus: boolean, selected: string) => rankChanged(plus, selected)}
      />
    </div>
  );
};

export default Numerical;
