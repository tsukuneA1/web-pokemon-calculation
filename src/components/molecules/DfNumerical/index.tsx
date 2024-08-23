import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import NumericalTop from '../NumericalTop';
import { Poke } from '@/interfaces';
import { RootState } from '@/app/store';
import { setHEffort, setHIndividual } from '@/app/defenderSlice';
import BNumerical from '../BNumerical';
import DNumerical from '../DNumerical';

interface DfNumericalProps {
  poke: Poke;
}

const DfNumerical: React.FC<DfNumericalProps> = ({ poke }) => {
  const dispatch = useDispatch();
  const hVal = useSelector((state: RootState) => state.defender.hActual);
  const [hSeekBarPos, setHSeekBarPos] = useState(0);
  const hEffort = useSelector((state: RootState) => state.defender.hEffort);
  const hIndividual = useSelector((state: RootState) => state.defender.hIndividual);

  useEffect(() => {
    hEffort === 0 ? setHSeekBarPos(0) : setHSeekBarPos((hEffort + 4) / 8);
  }, [hEffort]);

  function effortCalc(val: number): number {
    if (val === 0) {
      return 0;
    }
    return val * 8 - 4;
  }

  function hEffortMinMax(max: boolean) {
    if (max) {
      setHSeekBarPos(32);
      dispatch(setHEffort(252));
    } else {
      setHSeekBarPos(0);
      dispatch(setHEffort(0));
    }
  }

  function HEffortButtonClicked(plus: boolean) {
    if (plus && hEffort < 252) {
      if (hEffort === 0) {
        setHSeekBarPos(1);
        dispatch(setHEffort(4));
      } else {
        setHSeekBarPos(hSeekBarPos + 1);
        dispatch(setHEffort(hEffort + 8));
      }
    } else {
      if (!plus && hEffort > 4) {
        dispatch(setHEffort(hEffort - 8));
        setHSeekBarPos(hSeekBarPos - 1);
      } else if (!plus && hEffort == 4) {
        dispatch(setHEffort(0));
        setHSeekBarPos(0);
      }
    }
  }

  function HIndividualSelect(index: number) {
    dispatch(setHIndividual(index));
  }

  return (
    <div>
      <NumericalTop
        tag="HP"
        effortVal={hEffort}
        actualVal={hVal}
        seekBarPos={hSeekBarPos}
        tagFontSize={20}
        valFontSize={15}
        buttonWidth="60px"
        buttonHeight="35px"
        buttonColor="#6652b5"
        buttonBackground="#ece9fb"
        buttonRadius="20px"
        buttonFontSize={16}
        seekBarWidth="300px"
        individualVal={hIndividual}
        effortMax={() => hEffortMinMax(true)}
        effortZero={() => hEffortMinMax(false)}
        effortPlus={() => HEffortButtonClicked(true)}
        effortMinus={() => HEffortButtonClicked(false)}
        setIndividual={(val: number) => HIndividualSelect(val)}
        seekBarChange={(value: number) => {
          setHSeekBarPos(value), dispatch(setHEffort(effortCalc(value)));
        }}
      />
      <BNumerical tribeVal={poke.defence} />
      <DNumerical tribeVal={poke.specialDefence} />
    </div>
  );
};

export default DfNumerical;
