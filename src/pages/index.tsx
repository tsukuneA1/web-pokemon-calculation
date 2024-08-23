import Attacker from '@/components/organisms/Attacker';
import Defender from '@/components/organisms/Defender';
import Env from '@/components/organisms/Env';
import Damage from '@/components/organisms/Damage';
import ExtraDamageComponent from '@/components/organisms/ExtraDamage';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setAtPoke, setBaseStat, setReferAt, setSkill, Skill } from '@/app/store';
import { setDfPoke } from '@/app/defenderSlice';
import { customSkill } from '@/components/atoms/SkillSearch';
import { useEffect, useState } from 'react';
import { Type, typeInterface } from '@/interfaces';
import { SwitchHorizontal, SwitchVertical } from '@/components/icons/Icons';
import { deleteAll } from '@/app/damageSlice';
import { Tooltip, Button } from '@nextui-org/react';
import { useWindowSize } from '@/function/GetWindowSize';

export default function Home() {
  const dispatch = useDispatch();
  const atPoke = useSelector((state: RootState) => state.stats.atPoke);
  const dfPoke = useSelector((state: RootState) => state.defender.poke);

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

  function reversal() {
    const skill = skillSearch(dfPoke.skill1);
    dispatch(setAtPoke(dfPoke));
    dispatch(setSkill({ skill: skill, dfPoke: dfPoke }));
    dispatch(setDfPoke(atPoke));
    if (skill.classification === '物理') {
      dispatch(setReferAt(true));
      dispatch(setBaseStat(dfPoke.attack));
    } else {
      dispatch(setReferAt(false));
      dispatch(setBaseStat(dfPoke.specialAttack));
    }
    dispatch(deleteAll());
  }

  const windowSize = useWindowSize();

  return (
    <div>
      {windowSize.width > 1024 ? (
        <div className="pb-40 bg-gray-100">
          <div style={{ textAlign: 'center', paddingTop: '50px' }} className="lg:flex justify-items-center">
            <div className="flex items-center lg:w-1/2 flex-col">
              <Attacker />
              <ExtraDamageComponent />
            </div>
            <div className="mt-7">
              <Tooltip
                showArrow={true}
                content="攻守反転"
                color="warning"
                className="capitalize bg-gray-10 p-3 rounded-lg"
              >
                <Button onClick={reversal}>
                  <SwitchHorizontal />
                </Button>
              </Tooltip>
            </div>
            <div className="flex items-center lg:w-1/2 flex-col">
              <Defender />
              <div className="mt-10 w-full items-center justify-center">
                <Env />
              </div>
            </div>
          </div>
          <Damage />
        </div>
      ) : (
        <div className="pt-10 pb-32  bg-gray-100">
          <div style={{ textAlign: 'center' }} className="lg:flex justify-items-center">
            <div className="flex items-center lg:w-1/2 flex-col">
              <Attacker />
            </div>
            <div className="my-5">
              <Tooltip
                showArrow={true}
                content="攻守反転"
                color="warning"
                className="capitalize bg-gray-10 p-3 rounded-lg"
              >
                <Button onClick={reversal}>
                  <SwitchVertical />
                </Button>
              </Tooltip>
            </div>
            <div className="flex items-center lg:w-1/2 flex-col">
              <Defender />
              <div className="mt-10 w-full items-center justify-center">
                <Env />
              </div>
              <ExtraDamageComponent />
            </div>
          </div>
          <Damage />
        </div>
      )}
    </div>
  );
}
