/**
 * v0 by Vercel.
 * @see https://v0.dev/t/4LcqOUIdcIY
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { JSX, SVGProps, useEffect, useState } from 'react';
import { Poke, Type, typeInterface } from '@/interfaces';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, Skill } from '@/app/store';
import { useRouter } from 'next/router';
import PokeInfo from '@/components/molecules/PokeInfo';
import { Pokemon } from '@/components/atoms/SearchBox';
import SavedSkillSearch from '@/components/atoms/Search';
import { customSkill } from '@/components/atoms/SkillSearch';
import NumericalTop from '@/components/molecules/NumericalTop';
import { setAEffort, setAIndividual, setBEffort, setBIndividual, setCEffort, setCIndividual, setDEffort, setDIndividual, setHEffort, setSEffort, setSIndividual } from '@/app/saveSlice';
import { setHIndividual } from '@/app/saveSlice';

export default function Component(query: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [poke, setPoke] = useState(useSelector((state: RootState) => state.savePoke.poke));
  const attacker = useSelector((state: RootState) => state.savePoke.attacker);
  const defender = useSelector((state: RootState) => state.savePoke.defender);
  const atTera = useSelector((state: RootState) => state.stats.atTera);
  const dfTera = useSelector((state: RootState) => state.defender.dfTera);
  const atSkill = useSelector((state: RootState) => state.stats.selectedSkill);
  const atEffect = useSelector((state: RootState) => state.stats.effect);
  const dfEffect = useSelector((state: RootState) => state.defender.effect);
  const [tera, setTera] = useState(attacker ? atTera : defender ? dfTera : typeInterface[0]);
  const hEffort = useSelector((state: RootState) => state.savePoke.hEffort);
  const aEffort = useSelector((state: RootState) => state.savePoke.aEffort);
  const bEffort = useSelector((state: RootState) => state.savePoke.bEffort);
  const cEffort = useSelector((state: RootState) => state.savePoke.cEffort);
  const dEffort = useSelector((state: RootState) => state.savePoke.dEffort);
  const sEffort = useSelector((state: RootState) => state.savePoke.sEffort);
  const hIndividual = useSelector((state: RootState) => state.savePoke.hIndividual);
  const aIndividual = useSelector((state: RootState) => state.savePoke.aIndividual);
  const bIndividual = useSelector((state: RootState) => state.savePoke.bIndividual);
  const cIndividual = useSelector((state: RootState) => state.savePoke.cIndividual);
  const dIndividual = useSelector((state: RootState) => state.savePoke.dIndividual);
  const sIndividual = useSelector((state: RootState) => state.savePoke.sIndividual);
  const [skill1, setSkill1] = useState<Skill | undefined>(attacker ? atSkill : undefined);
  const [skills, setSkills] = useState<customSkill[]>([]);
  const [skill2, setSkill2] = useState<Skill>();
  const [skill3, setSkill3] = useState<Skill>();
  const [skill4, setSkill4] = useState<Skill>();
  const [effect, setEffect] = useState<string>(attacker ? atEffect : defender ? dfEffect : '持ち物なし');
  const [ability, setAbility] = useState<string>(poke.abilities[0]);
  const hActual = Math.floor(((poke.hp * 2 + hIndividual + hEffort / 4) * 50) / 100 + 50 + 10);
  const aActual = Math.floor((Math.floor(((poke.attack * 2 + aIndividual + Math.floor(aEffort / 4)) * 1) / 2) + 5));
  const bActual = Math.floor((Math.floor(((poke.defence * 2 + bIndividual + Math.floor(bEffort / 4)) * 1) / 2) + 5));
  const cActual = Math.floor((Math.floor(((poke.specialAttack * 2 + cIndividual + Math.floor(cEffort / 4)) * 1) / 2) + 5));
  const dActual = Math.floor((Math.floor(((poke.specialDefence * 2 + dIndividual + Math.floor(dEffort / 4)) * 1) / 2) + 5));
  const sActual = Math.floor((Math.floor(((poke.speed * 2 + sIndividual + Math.floor(sEffort / 4)) * 1) / 2) + 5));

  const topSkills: customSkill[] = [
    customSKillSearch(poke.skill1),
    customSKillSearch(poke.skill2),
    customSKillSearch(poke.skill3),
    customSKillSearch(poke.skill4),
    customSKillSearch(poke.skill5),
  ];

  useEffect(() => {

  })

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

  function customSKillSearch(name: string): customSkill {
    const ret = skills.find((skill) => skill.name === name);
    if (!ret) {
      return skills[0];
    }
    return ret;
  }

  function removeDuplicates(array: customSkill[]): customSkill[] {
    const seen = new Set<string>();
    return array.filter((skill) => {
      if (!skill || !skill.name) {
        return false;
      }
      const duplicate = seen.has(skill.name);
      seen.add(skill.name);
      return !duplicate;
    });
  }

  const customed = removeDuplicates([...topSkills, ...skills]);

  function deleteElement(str1?: string, str2?: string, str3?: string): customSkill[] {
    return customed.filter(item => ![str1, str2, str3].includes(item.name));
  }

  const handleClick = () => {
    router.push({
      pathname: '/',
      query: { attack: 'attack' },
    });
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
            teraTagSrc: '/images/types/bef_tera_img.png',
            bgColor: '#a1abb3',
          }
        );
      });

    const newPoke = {
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

    setPoke(newPoke);
  };
  
  return (
    <div className="w-full mx-auto p-4 bg-white">
      <header className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <MenuIcon className="w-6 h-6" />
          <h1 className="text-lg font-bold"></h1>
        </div>
        <div className="flex items-center space-x-2">
          <SunIcon className="w-6 h-6" />
          <SettingsIcon className="w-6 h-6" />
          <BellIcon className="w-6 h-6" />
          <UserIcon className="w-6 h-6" />
        </div>
      </header>
      <div className="flex items-center justify-between mb-4">
        <Button variant="default" className="flex items-center space-x-2 bg-zinc-400">
          <SaveIcon className="w-4 h-4" />
          <span>保存</span>
        </Button>
        <Button
          variant="destructive"
          className="flex items-center space-x-2"
          onClick={() => {
            handleClick();
          }}
        >
          <DeleteIcon className="w-4 h-4" />
          <span>キャンセル</span>
        </Button>
      </div>
      <div className="flex items-center space-x-4 mb-4">
        <PokeInfo
          imageWidth={200}
          imageHeight={200}
          imageRadius="20px"
          typeHeight={22}
          pokeSrc={poke.src}
          searchText={poke.name}
          tribeText={`${poke.hp}-${poke.attack}-${poke.defence}-${poke.specialAttack}-${poke.specialDefence}-${poke.speed}`}
          type1={poke.types[0]}
          type2={poke.types[1]}
          terastalType={tera}
          onSearchClicked={(poke: Pokemon) => {searchClicked(poke)}}
          onTerastalClicked={(type: Type) => {
            {
              setTera(type);
            }
          }}
          onRouterPush={() => {}}
        />
      </div>
      <form className="space-y-4">
        <NumericalTop
          tag="HP"
          effortVal={hEffort}
          individualVal={hIndividual}
          actualVal={hActual}
          seekBarPos={hEffort === 0 ? 0 : (hEffort+4)/8}
          effortMax={() => {dispatch(setHEffort(252))}}
          effortZero={() => {dispatch(setHEffort(0))}}
          effortPlus={() => {dispatch(setHEffort(hEffort === 0 ? 4 : hEffort !== 252 ? hEffort + 8 : hEffort))}}
          effortMinus={() => {dispatch(setHEffort(hEffort === 4 ? 0 : hEffort !== 0 ? hEffort -8 : hEffort))}}
          setIndividual={(val: number) => {dispatch(setHIndividual(val))}}
          seekBarChange={(value: number) => {
            dispatch(setHEffort(value === 0 ? 0 : value*8-4));
          }}
        />
        <NumericalTop
          tag='攻撃'
          effortVal={aEffort}
          individualVal={aIndividual}
          actualVal={aActual}
          seekBarPos={aEffort === 0 ? 0 : (aEffort+4)/8}
          effortMax={() => {dispatch(setAEffort(252))}}
          effortZero={() => {dispatch(setAEffort(0))}}
          effortPlus={() => {dispatch(setAEffort(aEffort === 0 ? 4 : aEffort !== 252 ? aEffort + 8 : aEffort))}}
          effortMinus={() => {dispatch(setAEffort(aEffort === 4 ? 0 : aEffort !== 0 ? aEffort -8 : aEffort))}}
          setIndividual={(val: number) => {dispatch(setAIndividual(val))}}
          seekBarChange={(value: number) => {
            dispatch(setAEffort(value === 0 ? 0 : value*8-4));
          }}
        />
        <NumericalTop
          tag='防御'
          effortVal={bEffort}
          individualVal={bIndividual}
          actualVal={bActual}
          seekBarPos={bEffort === 0 ? 0 : (bEffort+4)/8}
          effortMax={() => {dispatch(setBEffort(252))}}
          effortZero={() => {dispatch(setBEffort(0))}}
          effortPlus={() => {dispatch(setBEffort(bEffort === 0 ? 4 : bEffort !== 252 ? bEffort + 8 : bEffort))}}
          effortMinus={() => {dispatch(setBEffort(bEffort === 4 ? 0 : bEffort !== 0 ? bEffort -8 : bEffort))}}
          setIndividual={(val: number) => {dispatch(setBIndividual(val))}}
          seekBarChange={(value: number) => {
            dispatch(setBEffort(value === 0 ? 0 : value*8-4));
          }}
        />
        <NumericalTop
          tag='特攻'
          effortVal={cEffort}
          individualVal={cIndividual}
          actualVal={cActual}
          seekBarPos={cEffort === 0 ? 0 : (cEffort+4)/8}
          effortMax={() => {dispatch(setCEffort(252))}}
          effortZero={() => {dispatch(setCEffort(0))}}
          effortPlus={() => {dispatch(setCEffort(cEffort === 0 ? 4 : cEffort !== 252 ? cEffort + 8 : cEffort))}}
          effortMinus={() => {dispatch(setCEffort(cEffort === 4 ? 0 : cEffort !== 0 ? cEffort -8 : cEffort))}}
          setIndividual={(val: number) => {dispatch(setCIndividual(val))}}
          seekBarChange={(value: number) => {
            dispatch(setCEffort(value === 0 ? 0 : value*8-4));
          }}
        />
        <NumericalTop
          tag='特防'
          effortVal={dEffort}
          individualVal={dIndividual}
          actualVal={dActual}
          seekBarPos={dEffort === 0 ? 0 : (dEffort+4)/8}
          effortMax={() => {dispatch(setDEffort(252))}}
          effortZero={() => {dispatch(setDEffort(0))}}
          effortPlus={() => {dispatch(setDEffort(dEffort === 0 ? 4 : dEffort !== 252 ? dEffort + 8 : dEffort))}}
          effortMinus={() => {dispatch(setDEffort(dEffort === 4 ? 0 : dEffort !== 0 ? dEffort -8 : dEffort))}}
          setIndividual={(val: number) => {dispatch(setDIndividual(val))}}
          seekBarChange={(value: number) => {
            dispatch(setDEffort(value === 0 ? 0 : value*8-4));
          }}
        />
        <NumericalTop
          tag='素早さ'
          effortVal={sEffort}
          individualVal={sIndividual}
          actualVal={sActual}
          seekBarPos={sEffort === 0 ? 0 : (sEffort+4)/8}
          effortMax={() => {dispatch(setSEffort(252))}}
          effortZero={() => {dispatch(setSEffort(0))}}
          effortPlus={() => {dispatch(setSEffort(sEffort === 0 ? 4 : sEffort !== 252 ? sEffort + 8 : sEffort))}}
          effortMinus={() => {dispatch(setSEffort(sEffort === 4 ? 0 : sEffort !== 0 ? sEffort -8 : sEffort))}}
          setIndividual={(val: number) => {dispatch(setSIndividual(val))}}
          seekBarChange={(value: number) => {
            dispatch(setSEffort(value === 0 ? 0 : value*8-4));
          }}
        />

        <div className="space-y-2">
          <Label htmlFor="move1">技1</Label>
          <SavedSkillSearch
            initialSkill={skill1}
            skills={deleteElement(skill2?.name, skill3?.name, skill4?.name)}
            setSkill={(skill: Skill) => setSkill1(skill)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="move2">技2</Label>
          <SavedSkillSearch
            initialSkill={skill2}
            skills={deleteElement(skill1?.name, skill3?.name, skill4?.name)}
            setSkill={(skill: Skill) => setSkill2(skill)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="move3">技3</Label>
          <SavedSkillSearch
            initialSkill={skill3}
            skills={deleteElement(skill2?.name, skill1?.name, skill4?.name)}
            setSkill={(skill: Skill) => setSkill3(skill)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="move4">技4</Label>
          <SavedSkillSearch
            initialSkill={skill4}
            skills={deleteElement(skill2?.name, skill3?.name, skill1?.name)}
            setSkill={(skill: Skill) => setSkill4(skill)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="teratype">テラスタイプ</Label>
            <Select>
              <SelectTrigger id="teratype">
                <SelectValue placeholder="ステラ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ステラ">ステラ</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="ability">特性</Label>
            <Select>
              <SelectTrigger id="ability">
                <SelectValue placeholder="こだいかっせい" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="こだいかっせい">こだいかっせい</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="item">もちもの</Label>
            <Input id="item" placeholder="こだわりメガネ" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nature">せいかく</Label>
            <Input id="nature" placeholder="おくびょう" />
          </div>
        </div>
      </form>
    </div>
  );
}

function BellIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  );
}

function DeleteIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M20 5H9l-7 7 7 7h11a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z" />
      <line x1="18" x2="12" y1="9" y2="15" />
      <line x1="12" x2="18" y1="9" y2="15" />
    </svg>
  );
}

function MenuIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function SaveIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z" />
      <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7" />
      <path d="M7 3v4a1 1 0 0 0 1 1h7" />
    </svg>
  );
}

function SettingsIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function SunIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function UserIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}
