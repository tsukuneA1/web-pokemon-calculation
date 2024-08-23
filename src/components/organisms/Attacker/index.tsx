import React from 'react';
import Header from '@/components/molecules/Header';
import { DoubleSword, MiniDoubleSword } from '@/components/icons/Icons';
import PokeInfo from '@/components/molecules/PokeInfo';
import Numerical from '@/components/molecules/Numerical';
import AbilityEffect from '@/components/molecules/AbilityEffect';
import { useDispatch, useSelector } from 'react-redux';
import {
  RootState,
  setAbility,
  setAtPoke,
  setAtStella,
  setAtTera,
  setBaseStat,
  setCritical,
  setEffect,
  setEffortValue,
  setNatureMultiplier,
  setReferAt,
  setSkill,
  Skill,
} from '@/app/store';
import SkillParameter from '@/components/molecules/SkillParameter';
import { Pokemon } from '@/components/atoms/SearchBox';
import { Type, typeInterface } from '@/interfaces';
import { customSkill } from '@/components/atoms/SkillSearch';
import { useState, useEffect } from 'react';
import SelectedClassification from '@/components/molecules/SelectClassification';
import SerialSkillContainer from '@/components/molecules/SerialSkillContainer';
import DoublePowerComponent from '@/components/molecules/DoublePower';
import Burn from '@/components/molecules/Burn';
import ThreeQuaters from '@/components/molecules/ThreeQuater';
import { setAtFold } from '@/app/foldSlice';
import Preeminence from '@/components/molecules/Preeminence';
import { useWindowSize } from '@/function/GetWindowSize';
import CheckBox from '@/components/atoms/CheckBox';

const Attacker: React.FC = () => {
  const dispatch = useDispatch();
  const poke = useSelector((state: RootState) => state.stats.atPoke);
  const atTera = useSelector((state: RootState) => state.stats.atTera);
  const referAt = useSelector((state: RootState) => state.stats.referAt);
  const atFold = useSelector((state: RootState) => state.fold.atFold);
  const dfPoke = useSelector((state: RootState) => state.defender.poke);
  const critical = useSelector((state: RootState) => state.stats.critical);

  const [skills, setSkills] = useState<customSkill[]>([]);
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/model');
        const data = await response.json();
        if (Array.isArray(data.skill)) {
          setSkills(data.skill);
        } else {
          console.error('Expected an array but got:', data.skill);
        }
      } catch (error) {
        console.error('Failed to fetch skills:', error);
      }
    };

    fetchSkills();
  }, []);
  const headerIconClick = () => {
    dispatch(setAtFold(!atFold));
  };
  var tribes = `${poke.hp}-${poke.attack}-${poke.defence}-${poke.specialAttack}-${poke.specialDefence}-${poke.speed}`;
  var atOrSpe = '攻撃';
  if (!referAt) {
    atOrSpe = '特攻';
  }

  function typeSearch(name: string): Type {
    const type = typeInterface.find((type) => type.name === name);
    if (!type) {
      return typeInterface[0];
    }
    return type;
  }

  function skillSearch(name: string): Skill {
    const ret = skills.find((skill) => skill.name === name);
    if (!ret) {
      return {
        name: skills[0].name,
        power: skills[0].power,
        type: typeSearch(skills[0].type),
        classification: skills[0].classification,
      };
    }
    return { name: ret.name, power: ret.power, type: typeSearch(ret.type), classification: ret.classification };
  }

  function teraClicked(type: Type) {
    dispatch(setAtTera(type));
  }

  const windowSize = useWindowSize();
  if (!atFold) {
    return (
      <div style={{ width: '95%' }}>
        <Header
          title="Attacker"
          icon={windowSize.width < 640 ? <MiniDoubleSword /> : <DoubleSword />}
          onIconClick={headerIconClick}
          width={windowSize.width}
          fold={atFold}
        />
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
            terastalSrc={atTera.typeTagSrc}
            onSearchClicked={(poke: Pokemon) => {
              const types: Type[] = [poke.type1, poke.type2]
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
              var baseStat = poke.attack;
              dispatch(setReferAt(true));
              if (poke.attack < poke.spAttack) {
                baseStat = poke.spAttack;
                dispatch(setReferAt(false));
              }
              dispatch(
                setAtPoke({
                  id: poke.id,
                  name: poke.name,
                  src: poke.src,
                  types: types,
                  abilities: [poke.ability1, poke.ability2, poke.ability3].filter((ability) => ability !== null),
                  hp: poke.hp,
                  attack: poke.attack,
                  defence: poke.defence,
                  specialAttack: poke.spAttack,
                  specialDefence: poke.spDefence,
                  speed: poke.speed,
                  weight: poke.weight,
                  anotherName: poke.anotherName,
                  rank: poke.rank,
                  skill1: poke.skill1,
                  skill2: poke.skill2,
                  skill3: poke.skill3,
                  skill4: poke.skill4,
                  skill5: poke.skill5,
                }),
              );
              dispatch(setBaseStat(baseStat)),
                dispatch(setAbility(poke.ability1)),
                dispatch(setEffortValue(0)),
                dispatch(setEffect('持ち物なし')),
                dispatch(setNatureMultiplier(1)),
                dispatch(setSkill({ skill: skillSearch(poke.skill1), dfPoke: dfPoke }));
            }}
            onTerastalClicked={(type: Type) => {
              teraClicked(type);
            }}
          />
          <Numerical
            AtOrSpe={atOrSpe}
            tagFontSize={20}
            valFontSize={15}
            effortVal={0}
            buttonWidth="60px"
            buttonHeight="35px"
            buttonColor="#6652b5"
            buttonBackground="#ece9fb"
            buttonRadius="20px"
            buttonFontSize={16}
            seekbarWidth="300px"
            tribeVal={135}
          />
          <AbilityEffect onAbilitySelect={(select: string) => dispatch(setAbility(select))} />
          <SkillParameter />
          <CheckBox
            content="急所"
            checked={critical}
            handleChange={(e) => {
              dispatch(setCritical(e.target.checked));
            }}
          />
          <SelectedClassification />
          <SerialSkillContainer />
          <DoublePowerComponent />
          <Burn />
          <ThreeQuaters />
          <Preeminence />
        </div>
      </div>
    );
  } else {
    return (
      <div style={{ width: '95%' }}>
        <Header
          title="Attacker"
          icon={windowSize.width <= 768 ? <MiniDoubleSword /> : <DoubleSword />}
          onIconClick={headerIconClick}
          fold={atFold}
          width={windowSize.width}
        />
      </div>
    );
  }
};

export default Attacker;
