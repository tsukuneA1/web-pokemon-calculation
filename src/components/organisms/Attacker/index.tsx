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
import { Input } from '@/components/ui/input';
import { setAttacker, setPoke } from '@/app/saveSlice';

const Attacker: React.FC = () => {
  const dispatch = useDispatch();
  const poke = useSelector((state: RootState) => state.stats.atPoke);
  const atTera = useSelector((state: RootState) => state.stats.atTera);
  const referAt = useSelector((state: RootState) => state.stats.referAt);
  const atFold = useSelector((state: RootState) => state.fold.atFold);
  const dfPoke = useSelector((state: RootState) => state.defender.poke);
  const critical = useSelector((state: RootState) => state.stats.critical);
  const skill = useSelector((state: RootState) => state.stats.selectedSkill);
  const hp = useSelector((state: RootState) => state.defender.hActual);

  const [skills, setSkills] = useState<customSkill[]>([]);
  const [initialHp, setInitialHp] = useState(Math.floor((Math.floor(poke.hp * 2 + 31) * 1) / 2) + 60);
  const [currentHp, setCurrentHp] = useState(Math.floor((Math.floor(poke.hp * 2 + 31) * 1) / 2) + 60);
  const [dfCurrentHp, setDfCurrentHp] = useState(hp);

  useEffect(() => {
    if (['ふんか', 'しおふき', 'ドラゴンエナジー'].includes(skill.name)) {
      dispatch(
        setSkill({
          skill: {
            name: skill.name,
            power:
              Math.floor((150 * currentHp) / initialHp) < 1
                ? 1
                : Math.floor((150 * currentHp) / initialHp) > 150
                  ? 150
                  : Math.floor((150 * currentHp) / initialHp),
            classification: skill.classification,
            type: skill.type,
          },
          dfPoke: dfPoke,
        }),
      );
    } else if (['じたばた', 'きしかいせい'].includes(skill.name)) {
      let power = 200;
      const rate = currentHp / initialHp;
      power =
        rate < 2 / 48
          ? 200
          : rate < 5 / 48
            ? 150
            : rate < 10 / 48
              ? 100
              : rate < 17 / 48
                ? 80
                : rate < 33 / 48
                  ? 40
                  : 20;
      dispatch(
        setSkill({
          skill: {
            name: skill.name,
            power: power,
            classification: skill.classification,
            type: skill.type,
          },
          dfPoke: dfPoke,
        }),
      );
    } else if (skill.name === 'ハードプレス') {
      dispatch(
        setSkill({
          skill: {
            name: skill.name,
            power:
              Math.floor((100 * dfCurrentHp) / hp) < 1
                ? 1
                : Math.floor((100 * dfCurrentHp) / hp) > 100
                  ? 100
                  : Math.floor((100 * dfCurrentHp) / hp),
            type: skill.type,
            classification: skill.classification,
          },
          dfPoke: dfPoke,
        }),
      );
    } else if (skill.name === 'にぎりつぶす') {
      dispatch(
        setSkill({
          skill: {
            name: skill.name,
            power:
              Math.floor((120 * dfCurrentHp) / hp) < 1
                ? 1
                : Math.floor((120 * dfCurrentHp) / hp) > 120
                  ? 120
                  : Math.floor((120 * dfCurrentHp) / hp),
            type: skill.type,
            classification: skill.classification,
          },
          dfPoke: dfPoke,
        }),
      );
    } else {
      dispatch(
        setSkill({
          skill: {
            name: skill.name,
            power: skill.power,
            classification: skill.classification,
            type: skill.type,
          },
          dfPoke: dfPoke,
        }),
      );
    }
  }, [initialHp, currentHp, dfCurrentHp]);

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

  function onPush() {
    dispatch(setPoke(poke));
    dispatch(setAttacker(true));
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
            tribeText={tribes}
            type1={poke.types[0]}
            type2={poke.types[1]}
            terastalType={atTera}
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
                      teraTagSrc: '/images/types/bef_tera_img.png',
                      bgColor: '#a1abb3',
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
            onRouterPush={onPush}
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
          {['ふんか', 'しおふき', 'ドラゴンエナジー', 'じたばた', 'きしかいせい'].includes(skill.name) ? (
            <div className="w-60 justify-start mt-3">
              <div className="flex justify-between items-center">
                <p>最大HP</p>
                <Input
                  className="w-28"
                  type="number"
                  value={initialHp}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setInitialHp(event.target.value as unknown as number);
                  }}
                />
              </div>
              <div className="flex justify-between items-center mt-3">
                <p>現在のHP</p>
                <Input
                  className="w-28"
                  value={currentHp}
                  type="number"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setCurrentHp(event.target.value as unknown as number);
                  }}
                />
              </div>
              <p className="text-start">技威力 {skill.power}</p>
            </div>
          ) : (
            <div></div>
          )}
          {['ハードプレス', 'にぎりつぶす'].includes(skill.name) ? (
            <div className="w-60 justify-start mt-3">
              <div className="flex justify-between items-center">
                <p>相手の最大HP</p>
                <Input className="w-28" type="number" value={hp} />
              </div>
              <div className="flex justify-between items-center mt-3">
                <p>相手の現在のHP</p>
                <Input
                  className="w-28"
                  value={dfCurrentHp}
                  type="number"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setDfCurrentHp(event.target.value as unknown as number);
                  }}
                />
              </div>
              <p className="text-start">技威力 {skill.power}</p>
            </div>
          ) : (
            <div></div>
          )}
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
