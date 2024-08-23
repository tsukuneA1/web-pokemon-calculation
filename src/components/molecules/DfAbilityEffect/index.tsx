import DropdownSearchBox from '@/components/atoms/DropdownSearchBox';
import Effect from '@/components/atoms/Effect';
import SwitchButton from '@/components/atoms/SwitchButton';
import { defenceAbilities } from '@/interfaces';
import { setDfEffect, setOnAbility } from '@/app/defenderSlice';
import { RootState } from '@/app/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface DfAbilityEffectProps {
  onAbilitySelect: (select: string) => void;
}

const DfAbilityEffect: React.FC<DfAbilityEffectProps> = ({ onAbilitySelect }) => {
  const dispatch = useDispatch();
  const effect = useSelector((state: RootState) => state.defender.effect);
  const dfPoke = useSelector((state: RootState) => state.defender.poke);
  let pokeAbilities = [];
  for (let i = 0; i < dfPoke.abilities.length; i++) {
    if (dfPoke.abilities[i] !== '') {
      pokeAbilities.push(dfPoke.abilities[i]);
    } else {
      break;
    }
  }

  const effectChanged = (currentEffect: string) => {
    dispatch(setDfEffect(currentEffect));
  };

  const abilityOn = useSelector((state: RootState) => state.defender.onAbility);
  const ability = useSelector((state: RootState) => state.defender.currentAbility);

  const toggleSwitch = () => {
    dispatch(setOnAbility(!abilityOn));
  };

  const effects = ['持ち物なし', 'しんかのきせき', 'とつげきチョッキ', '半減きのみ'];

  function removeDuplicates(array: string[]): string[] {
    const seen = new Set<string>();
    return array.filter((ability) => {
      const duplicate = seen.has(ability);
      seen.add(ability);
      return !duplicate;
    });
  }

  return (
    <div style={{ display: 'flex', marginTop: '10px' }}>
      <div className="w-3/5">
        <h4 style={{ margin: '0', textAlign: 'left' }}>特性</h4>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <DropdownSearchBox
            suggestions={removeDuplicates([...pokeAbilities, ...defenceAbilities])}
            value={ability}
            onClick={onAbilitySelect}
          />
          <div className="mx-1.5 sm:mx-2.5">
            <SwitchButton isOn={abilityOn} handleChange={toggleSwitch} />
          </div>
        </div>
      </div>
      <div className="w-full flex justify-start">
        <Effect
          title="持ち物"
          initialPos={0}
          selected={effect}
          options={effects}
          onSelect={(option) => effectChanged(option)}
        />
      </div>
    </div>
  );
};

export default DfAbilityEffect;
