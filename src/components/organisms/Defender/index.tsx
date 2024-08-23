import React, { useState } from 'react';
import Header from '@/components/molecules/Header';
import { MiniShieldPlus, ShieldPlus } from '@/components/icons/Icons';
import PokeInfo from '@/components/molecules/PokeInfo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setSkill } from '@/app/store';
import { setDfPoke, setDfTera } from '@/app/defenderSlice';
import { Pokemon } from '@/components/atoms/SearchBox';
import { Type, typeInterface } from '@/interfaces';
import DfNumerical from '@/components/molecules/DfNumerical';
import DfAbilityEffect from '@/components/molecules/DfAbilityEffect';
import { setCurrentAbility } from '@/app/defenderSlice';
import { deleteAll } from '@/app/damageSlice';
import { useWindowSize } from '@/function/GetWindowSize';

interface DefenderProps {}

const Defender: React.FC<DefenderProps> = () => {
  const dispatch = useDispatch();
  const poke = useSelector((state: RootState) => state.defender.poke);
  const dfTera = useSelector((state: RootState) => state.defender.dfTera);
  const [fold, setFold] = useState(false);
  const skill = useSelector((state: RootState) => state.stats.selectedSkill);
  const handlerIconClick = () => {
    setFold(!fold);
  };

  const searchClicked = (selectPoke: Pokemon) => {
    const types: Type[] = [selectPoke.type1, selectPoke.type2]
      .filter((typeName) => typeName !== null)
      .map((typeName) => {
        return (
          typeInterface.find((type) => type.name === typeName) || {
            name: '非選択',
            typeTagSrc: '/images/types/not_selected.png',
            typeIconSrc: '/images/types/bef_teras.png',
            num: 0,
          }
        );
      });

    const dfPoke = {
      id: selectPoke.id,
      name: selectPoke.name,
      src: selectPoke.src,
      types: types,
      abilities: [selectPoke.ability1, selectPoke.ability2, selectPoke.ability3].filter((ability) => ability !== null),
      hp: selectPoke.hp,
      attack: selectPoke.attack,
      defence: selectPoke.defence,
      specialAttack: selectPoke.spAttack,
      specialDefence: selectPoke.spDefence,
      speed: selectPoke.speed,
      weight: selectPoke.weight,
      anotherName: selectPoke.anotherName,
      rank: selectPoke.rank,
      skill1: selectPoke.skill1,
      skill2: selectPoke.skill2,
      skill3: selectPoke.skill3,
      skill4: selectPoke.skill4,
      skill5: selectPoke.skill5,
    };

    dispatch(setDfPoke(dfPoke));

    dispatch(deleteAll());
    dispatch(setSkill({ skill: skill, dfPoke: dfPoke }));
  };

  var tribes = `${poke.hp}-${poke.attack}-${poke.defence}-${poke.specialAttack}-${poke.specialDefence}-${poke.speed}`;

  const windowSize = useWindowSize();
  return (
    <div style={{ width: '95%' }}>
      <Header
        title="Defender"
        icon={windowSize.width < 640 ? <MiniShieldPlus /> : <ShieldPlus />}
        onIconClick={handlerIconClick}
        fold={fold}
        width={windowSize.width}
      />
      {fold ? (
        <></>
      ) : (
        <div className="w-full p-1 sm:p-2 md:p-3 bg-gray-10 pb-10 rounded-b-2xl">
          <PokeInfo
            imageWidth={200}
            imageHeight={200}
            imageRadius="20px"
            typeHeight={22}
            pokeSrc={poke.src}
            searchText={poke.name}
            searchTextHeight={30}
            searchTextFontSize="24px"
            tribeText={tribes}
            height={25}
            fontSize="20px"
            typeSrc1={poke.types[0].typeTagSrc}
            typeSrc2={poke.types[1].typeTagSrc}
            terastalSrc={dfTera.typeTagSrc}
            onSearchClicked={(poke: Pokemon) => searchClicked(poke)}
            onTerastalClicked={(type: Type) => {
              dispatch(setDfTera(type));
            }}
          />
          <div className="my-3">
            <DfNumerical poke={poke} />
          </div>
          <DfAbilityEffect onAbilitySelect={(select: string) => dispatch(setCurrentAbility(select))} />
        </div>
      )}
    </div>
  );
};

export default Defender;
