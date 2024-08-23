import { setDEffort, setDIndividual, setDNatureMultiplier, setDRank } from '@/app/defenderSlice';
import { RootState } from '@/app/store';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NumericalTop from '../NumericalTop';
import NatureRank from '../NatureAndRank';

interface DNumericalProps {
  tribeVal: number;
}

const DNumerical: React.FC<DNumericalProps> = ({ tribeVal }) => {
  const dispatch = useDispatch();

  const charas = ['×1.1', '×1.0', '×0.9'];
  const charaValues = [1.1, 1.0, 0.9];

  const ranks = ['+6', '+5', '+4', '+3', '+2', '+1', '+-0', '-1', '-2', '-3', '-4', '-5', '-6'];

  const dIndividual = useSelector((state: RootState) => state.defender.dIndividual);
  const dEffort = useSelector((state: RootState) => state.defender.dEffort);
  const dNatureMultiplier = useSelector((state: RootState) => state.defender.dNatureMultiplier);
  const dRank = useSelector((state: RootState) => state.defender.dRank);

  const [seekBarValue, setSeekBarValue] = useState(0);

  const [charaValue, setCharaValue] = useState(charas[1]);

  const actualValue = Math.floor(
    Math.floor(((tribeVal * 2 + dIndividual + dEffort / 4) * 50) / 100 + 5) * dNatureMultiplier,
  );

  useEffect(() => {
    dEffort === 0 ? setSeekBarValue(0) : setSeekBarValue((dEffort + 4) / 8);
  }, [dEffort]);

  function effortCalc(val: number): number {
    if (val === 0) {
      return 0;
    }
    return val * 8 - 4;
  }

  function effortMinMax(max: boolean) {
    if (max) {
      setSeekBarValue(32);
      dispatch(setDEffort(252));
    } else {
      setSeekBarValue(0);
      dispatch(setDEffort(0));
    }
  }

  function effortButtonClicked(plus: boolean) {
    if (plus && dEffort < 252) {
      if (dEffort === 0) {
        setSeekBarValue(1);
        dispatch(setDEffort(4));
      } else {
        setSeekBarValue(seekBarValue + 1);
        dispatch(setDEffort(dEffort + 8));
      }
    } else {
      if (!plus && dEffort > 4) {
        dispatch(setDEffort(dEffort - 8));
        setSeekBarValue(seekBarValue - 1);
      } else if (!plus && dEffort == 4) {
        dispatch(setDEffort(0));
        setSeekBarValue(0);
      }
    }
  }

  function rankChanged(plus: boolean, current: string) {
    if (plus && current != '+6') {
      dispatch(setDRank(ranks.indexOf(current) - 1));
    } else if (!plus && current != '-6') {
      dispatch(setDRank(ranks.indexOf(current) + 1));
    }
  }

  function handleCharaSelect(index: number) {
    setCharaValue(charas[index]);
    dispatch(setDNatureMultiplier(charaValues[index]));
  }

  function individualSelect(index: number) {
    dispatch(setDIndividual(index));
  }

  return (
    <div className="my-3">
      <NumericalTop
        tag="特防"
        effortVal={dEffort}
        actualVal={actualValue}
        seekBarPos={seekBarValue}
        tagFontSize={20}
        valFontSize={15}
        buttonWidth="60px"
        buttonHeight="35px"
        buttonColor="#6652b5"
        buttonBackground="#ece9fb"
        buttonRadius="20px"
        buttonFontSize={16}
        seekBarWidth="300px"
        individualVal={dIndividual}
        effortMax={() => effortMinMax(true)}
        effortZero={() => effortMinMax(false)}
        effortPlus={() => effortButtonClicked(true)}
        effortMinus={() => effortButtonClicked(false)}
        setIndividual={(val: number) => individualSelect(val)}
        seekBarChange={(value: number) => {
          setSeekBarValue(value), dispatch(setDEffort(effortCalc(value)));
        }}
      />
      <NatureRank
        buttonWidth="60px"
        buttonHeight="35px"
        buttonColor="#6652b5"
        buttonBackground="#ece9fb"
        buttonRadius="20px"
        buttonFontSize={16}
        natureSelect={charaValue}
        rankSelect={ranks[dRank]}
        natureHandle={(index) => handleCharaSelect(index)}
        rankHandle={(selected: string) => dispatch(setDRank(ranks.indexOf(selected)))}
        rankButtonClicked={(plus: boolean, selected: string) => rankChanged(plus, selected)}
      />
    </div>
  );
};

export default DNumerical;
