import { setBEffort, setBIndividual, setBNatureMultiplier, setBRank } from '@/app/defenderSlice';
import { RootState} from '@/app/store';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NumericalTop from '../NumericalTop';
import NatureRank from '../NatureAndRank';

interface BNumericalProps {
  tribeVal: number;
}

const BNumerical: React.FC<BNumericalProps> = ({ tribeVal }) => {
  const dispatch = useDispatch();

  const charas = ['×1.1', '×1.0', '×0.9'];
  const charaValues = [1.1, 1.0, 0.9];

  const ranks = ['+6', '+5', '+4', '+3', '+2', '+1', '+-0', '-1', '-2', '-3', '-4', '-5', '-6'];

  const bIndividual = useSelector((state: RootState) => state.defender.bIndividual);
  const bEffort = useSelector((state: RootState) => state.defender.bEffort);
  const bNatureMultiplier = useSelector((state: RootState) => state.defender.bNatureMultiplier);
  const bRank = useSelector((state: RootState) => state.defender.bRank);

  const [seekBarValue, setSeekBarValue] = useState(0);

  const [charaValue, setCharaValue] = useState(charas[1]);

  const actualValue = Math.floor(
    Math.floor(((tribeVal * 2 + bIndividual + bEffort / 4) * 50) / 100 + 5) * bNatureMultiplier,
  );

  useEffect(() => {
    bEffort === 0 ? setSeekBarValue(0) : setSeekBarValue((bEffort + 4) / 8);
  }, [bEffort]);

  function effortCalc(val: number): number {
    if (val === 0) {
      return 0;
    }
    return val * 8 - 4;
  }

  function effortMinMax(max: boolean) {
    if (max) {
      setSeekBarValue(32);
      dispatch(setBEffort(252));
    } else {
      setSeekBarValue(0);
      dispatch(setBEffort(0));
    }
  }

  function effortButtonClicked(plus: boolean) {
    if (plus && bEffort < 252) {
      if (bEffort === 0) {
        setSeekBarValue(1);
        dispatch(setBEffort(4));
      } else {
        setSeekBarValue(seekBarValue + 1);
        dispatch(setBEffort(bEffort + 8));
      }
    } else {
      if (!plus && bEffort > 4) {
        dispatch(setBEffort(bEffort - 8));
        setSeekBarValue(seekBarValue - 1);
      } else if (!plus && bEffort == 4) {
        dispatch(setBEffort(0));
        setSeekBarValue(0);
      }
    }
  }

  function rankChanged(plus: boolean, current: string) {
    if (plus && current != '+6') {
      dispatch(setBRank(ranks.indexOf(current) - 1));
    } else if (!plus && current != '-6') {
      dispatch(setBRank(ranks.indexOf(current) + 1));
    }
  }

  function handleCharaSelect(index: number) {
    setCharaValue(charas[index]);
    dispatch(setBNatureMultiplier(charaValues[index]));
  }

  function individualSelect(index: number) {
    dispatch(setBIndividual(index));
  }

  return (
    <div className="my-3">
      <NumericalTop
        tag="防御"
        effortVal={bEffort}
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
        individualVal={bIndividual}
        effortMax={() => effortMinMax(true)}
        effortZero={() => effortMinMax(false)}
        effortPlus={() => effortButtonClicked(true)}
        effortMinus={() => effortButtonClicked(false)}
        setIndividual={(val: number) => individualSelect(val)}
        seekBarChange={(value: number) => {
          setSeekBarValue(value), dispatch(setBEffort(effortCalc(value)));
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
        rankSelect={ranks[bRank]}
        natureHandle={(index) => handleCharaSelect(index)}
        rankHandle={(selected: string) => dispatch(setBRank(ranks.indexOf(selected)))}
        rankButtonClicked={(plus: boolean, selected: string) => rankChanged(plus, selected)}
      />
    </div>
  );
};

export default BNumerical;
