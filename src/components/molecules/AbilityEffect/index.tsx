import DropdownSearchBox from '@/components/atoms/DropdownSearchBox';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setAbilityChecked, setEffect } from '@/app/store';
import SwitchButton from '@/components/atoms/SwitchButton';
import { attackAbilities } from '@/interfaces';
import Effect from '@/components/atoms/Effect';

interface AbilityEffectProps {
  onAbilitySelect: (select: string) => void;
}

const AbilityEffect: React.FC<AbilityEffectProps> = ({ onAbilitySelect }) => {
  const dispatch = useDispatch();
  const effect = useSelector((state: RootState) => state.stats.effect);
  const atPoke = useSelector((state: RootState) => state.stats.atPoke);
  let pokeAbilities = [];
  for (let i = 0; i < atPoke.abilities.length; i++) {
    if (atPoke.abilities[i] !== '') {
      pokeAbilities.push(atPoke.abilities[i]);
    } else {
      break;
    }
  }

  const effectChanged = (currentEffect: string) => {
    dispatch(setEffect(currentEffect));
  };

  const abilityOn = useSelector((state: RootState) => state.stats.abilityChecked);
  const ability = useSelector((state: RootState) => state.stats.currentAbility);

  const toggleSwitch = () => {
    dispatch(setAbilityChecked(!abilityOn));
  };

  function removeDuplicates(array: string[]): string[] {
    const seen = new Set<string>();
    return array.filter((ability) => {
      const duplicate = seen.has(ability);
      seen.add(ability);
      return !duplicate;
    });
  }

  const effects = [
    '持ち物なし',
    '命の珠',
    'こだわりハチマキ',
    'こだわりメガネ',
    'パンチグローブ',
    'タイプ強化系',
    'たつじんのおび',
    'ちからのハチマキ',
    'ものしりメガネ',
    'でんきだま',
    'ばんのうがさ',
  ];

  return (
    <div style={{ display: 'flex', marginTop: '10px' }}>
      <div className="w-3/5">
        <h4 style={{ margin: '0', textAlign: 'left' }}>特性</h4>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'start',
          }}
        >
          <DropdownSearchBox
            suggestions={removeDuplicates([...pokeAbilities, ...attackAbilities])}
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

export default AbilityEffect;
