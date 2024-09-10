import BigButton from '@/components/atoms/BigButton';
import CustomSlider from '@/components/molecules/DamageSlider';
import {
  damageStrCalc,
  finalAtActualCalc,
  finalDamageMagnification,
  finalDfActualCalc,
  finalSkillPowerCalc,
  strCalc,
} from '@/function/function';
import { useWindowSize } from '@/function/GetWindowSize';
import { typeInterface } from '@/interfaces';
import { addStats } from '@/app/damageSlice';
import { RootState, Skill } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';

const Damage: React.FC = () => {
  const dispatch = useDispatch();
  const atPoke = useSelector((state: RootState) => state.stats.atPoke);
  const dfPoke = useSelector((state: RootState) => state.defender.poke);
  const befAtActual = useSelector((state: RootState) => state.stats.atActual);
  const atAbility = useSelector((state: RootState) => state.stats.currentAbility);
  const atAbilityOn = useSelector((state: RootState) => state.stats.abilityChecked);
  const dfAbility = useSelector((state: RootState) => state.defender.currentAbility);
  const dfAbilityOn = useSelector((state: RootState) => state.defender.onAbility);
  const atRank = useSelector((state: RootState) => state.stats.atRank);
  const bRank = useSelector((state: RootState) => state.defender.bRank);
  const dRank = useSelector((state: RootState) => state.defender.dRank);
  const atTera = useSelector((state: RootState) => state.stats.atTera);
  const befSkill = useSelector((state: RootState) => state.stats.selectedSkill);
  const atEffect = useSelector((state: RootState) => state.stats.effect);
  const dfEffect = useSelector((state: RootState) => state.defender.effect);
  const referAt = useSelector((state: RootState) => state.stats.referAt);
  const hActual = useSelector((state: RootState) => state.defender.hActual);
  const bActual = useSelector((state: RootState) => state.defender.bActual);
  const dActual = useSelector((state: RootState) => state.defender.dActual);
  const weather = useSelector((state: RootState) => state.env.weather);
  const field = useSelector((state: RootState) => state.env.field);
  const reflect = useSelector((state: RootState) => state.env.reflect);
  const lightScreen = useSelector((state: RootState) => state.env.lightScreen);
  const dfTera = useSelector((state: RootState) => state.defender.dfTera);
  const savedDamages = useSelector((state: RootState) => state.saved.stats);
  const sixteenDamage = useSelector((state: RootState) => state.env.sixteenthDamage);
  const tenthDamage = useSelector((state: RootState) => state.env.tenthDamage);
  const eighthDamage = useSelector((state: RootState) => state.env.eighthDamage);
  const sixthDamage = useSelector((state: RootState) => state.env.sixthDamage);
  const fourthDamage = useSelector((state: RootState) => state.env.fourthDamage);
  const halfDamage = useSelector((state: RootState) => state.env.halfDamage);
  const attackTime = useSelector((state: RootState) => state.stats.attackTime);
  const critical = useSelector((state: RootState) => state.stats.critical);
  const doublePowerFlag = useSelector((state: RootState) => state.stats.doublePower);
  const burn = useSelector((state: RootState) => state.stats.burn);
  const threeQuaters = useSelector((state: RootState) => state.stats.threeQuaters);
  const preeminence = useSelector((state: RootState) => state.stats.stellaPreeminence);

  let atActual = burn && befSkill.classification === '物理' ? Math.floor(befAtActual / 2) : befAtActual;

  let skill = befSkill;
  if (doublePowerFlag) {
    skill = {
      name: befSkill.name,
      power: befSkill.power * 2,
      type: befSkill.type,
      classification: befSkill.classification,
    };
  } else if (threeQuaters) {
    skill = {
      name: befSkill.name,
      power: Math.floor((befSkill.power * 3) / 2),
      type: befSkill.type,
      classification: befSkill.classification,
    };
  } else {
    skill = befSkill;
  }

  let dfType1 = dfPoke.types[0].name;
  let dfType2 = dfPoke.types[1].name;
  if (dfTera != typeInterface[0] && dfTera != typeInterface[19]) {
    dfType1 = dfTera.name;
    dfType2 = 'null';
  } else {
    dfType1 = dfPoke.types[0].name;
    dfType2 = dfPoke.types[1].name;
  }

  let atSpCh = atAbility;
  if (!atAbilityOn) {
    atSpCh = 'null';
  } else {
    atSpCh = atAbility;
  }

  let dfSpCh = dfAbility;
  if (!dfAbilityOn) {
    dfSpCh = 'null';
  }

  let dfRank = bRank;
  var dfActual = bActual;
  if (!referAt) {
    dfRank = dRank;
    dfActual = dActual;
  }

  const typeMag = preeminence
    ? 2
    : typeMagnification(skill, dfType1, atSpCh) * typeMagnification(skill, dfType2, atSpCh);
  const finalDamageMag = finalDamageMagnification(
    atPoke,
    dfPoke,
    skill,
    reflect,
    lightScreen,
    atSpCh,
    atEffect,
    dfSpCh,
    dfEffect,
    typeMag,
  );

  const calculatedDamage = damageCalculate(
    finalAtActualCalc(atPoke, dfPoke, atActual, atSpCh, dfSpCh, skill, atRank, atEffect),
    finalDfActualCalc(dfActual, atSpCh, dfSpCh, dfEffect, dfRank, skill, dfType1, dfType2, weather),
    typeMag,
    atMagnification(skill.type.name, atPoke.types[0].name, atPoke.types[1].name, atTera.name),
    skill,
    finalSkillPowerCalc(atPoke, skill, atSpCh, atEffect, field),
    critical,
    weather,
    finalDamageMag,
  );

  for (let i = 0; i < calculatedDamage.length; i++) {
    calculatedDamage[i] =
      calculatedDamage[i] * attackTime +
      Math.floor(hActual / 16) * sixteenDamage +
      Math.floor(hActual / 10) * tenthDamage +
      Math.floor(hActual / 8) * eighthDamage +
      Math.floor(hActual / 6) * sixthDamage +
      Math.floor(hActual / 4) * fourthDamage +
      Math.floor(hActual / 2) * halfDamage;
  }

  let plusDamage: number[] = [];

  for (let item of savedDamages) {
    let plusActual = bActual;
    !item.referAt && (plusActual = dActual);

    let actual = item.atActual;
    item.burn && item.selectedSkill.classification === '物理' && (actual = Math.floor(item.atActual / 2));

    let plusDfType1 = dfPoke.types[0].name;
    let plusDfType2 = dfPoke.types[1].name;
    if (item.dfTera != typeInterface[0] && item.dfTera != typeInterface[19]) {
      plusDfType1 = item.dfTera.name;
      plusDfType2 = 'null';
    } else {
      plusDfType1 = dfPoke.types[0].name;
      plusDfType2 = dfPoke.types[1].name;
    }

    const plusTypeMag = item.preeminence
      ? 2
      : typeMagnification(item.selectedSkill, plusDfType1, item.currentAbility) *
        typeMagnification(item.selectedSkill, plusDfType2, item.currentAbility);
    const plusFinalDamageMag = finalDamageMagnification(
      item.atPoke,
      dfPoke,
      item.selectedSkill,
      item.reflect,
      item.lightScreen,
      item.currentAbility,
      item.effect,
      item.dfAbility,
      item.dfEffect,
      plusTypeMag,
    );
    plusDamage = damageCalculate(
      finalAtActualCalc(
        item.atPoke,
        dfPoke,
        actual,
        item.currentAbility,
        item.dfAbility,
        item.selectedSkill,
        item.atRank,
        item.effect,
      ),
      finalDfActualCalc(
        plusActual,
        item.currentAbility,
        dfSpCh,
        item.dfEffect,
        item.dfRank,
        item.selectedSkill,
        plusDfType1,
        plusDfType2,
        item.weather,
      ),
      plusTypeMag,
      atMagnification(
        item.selectedSkill.type.name,
        item.atPoke.types[0].name,
        item.atPoke.types[1].name,
        item.atTera.name,
      ),
      item.selectedSkill,
      finalSkillPowerCalc(item.atPoke, item.selectedSkill, item.currentAbility, item.effect, item.field),
      item.critical,
      item.weather,
      plusFinalDamageMag,
    );

    for (let i = 0; i < plusDamage.length; i++) {
      plusDamage[i] *= item.attackTime;
    }

    for (let i = 0; i < calculatedDamage.length; i++) {
      calculatedDamage[i] = +calculatedDamage[i] + plusDamage[i];
    }
  }

  const maxDamage = Math.round(calculatedDamage[calculatedDamage.length - 1]);
  const minDamage = Math.round(calculatedDamage[0]);
  const minStr = strCalc(minDamage, hActual);
  const maxStr = strCalc(maxDamage, hActual);
  const randText = damageStrCalc(minStr, maxStr, hActual, maxDamage, calculatedDamage);
  const damageText = `${minDamage}~${maxDamage} ${randText} (${Math.ceil((minDamage / hActual) * 1000) / 10}%~${Math.ceil((maxDamage / hActual) * 1000) / 10}%)`;

  let pos1 = (1 - maxDamage / hActual) * 100;
  if (maxDamage > hActual) {
    pos1 = 0;
  }
  let pos2 = (1 - minDamage / hActual) * 100;
  if (minDamage > hActual) {
    pos2 = 0;
  }

  function damagePlus() {
    dispatch(
      addStats({
        atPoke: atPoke,
        referAt: referAt,
        atActual: befAtActual,
        atRank: atRank,
        currentAbility: atSpCh,
        effect: atEffect,
        selectedSkill: skill,
        atTera: atTera,
        reflect: reflect,
        lightScreen: lightScreen,
        weather: weather,
        field: field,
        critical: critical,
        attackTime: attackTime,
        burn: burn,
        dfAbility: dfSpCh,
        dfEffect: dfEffect,
        dfTera: dfTera,
        dfRank: dfRank,
        preeminence: preeminence,
      }),
    );
  }

  const windowSize = useWindowSize();

  return (
    <div className="flex w-full fixed bottom-0 left-0 bg-white mr-0 justify-between border-t-1">
      <div className="pt-5 pl-5 my-2 w-5/6 ">
        <CustomSlider
          min={0}
          max={100}
          color1="#4caf50"
          color2="#ff5722"
          backgroundColor="#e0e0e0"
          position1={pos1}
          position2={pos2}
        />
        <div className="pt-2"></div>
        <div className="text-sm sm:text-base mt-2 md:text-lg lg:mt-3">{damageText}</div>
      </div>
      <div className="flex items-center w-1/6 ml-2 sm:ml-10">
        <BigButton
          width="100px"
          height="35px"
          text={windowSize.width > 1024 ? 'ダメージ加算' : '加算'}
          color="#6652b5"
          backgroundColor="#ece9fb"
          borderRadius="20px"
          fontSize={14}
          onClick={damagePlus}
        />
      </div>
    </div>
  );
};

export function damageCalculate(
  atActual: number,
  dfActual: number,
  typeMag: number,
  atMag: number,
  skill: Skill,
  finalSkillPower: number,
  critical: boolean,
  weather: string,
  finalDamageMag: number,
): number[] {
  var maxDamage = Math.floor(Math.floor((22 * finalSkillPower * atActual) / dfActual) / 50 + 2);
  maxDamage *= weatherMagnification(skill, weather);
  if (critical) {
    maxDamage = Math.floor((maxDamage * 6144) / 4096);
  }
  var damageList: number[] = [];
  for (let i: number = 85; i <= 100; i++) {
    let damage = Math.floor((maxDamage * i) / 100);
    let item = Math.floor(specialRound(damage * atMag) * typeMag);
    item = Math.round(item * finalDamageMag);
    damageList.push(item);
  }

  return damageList;
}

export function typeMagnification(skill: Skill, type1: string, atSpCh: string): number {
  let magnification = 1.0;
  const skillType: string = skill.type.name;

  switch (skillType) {
    case 'ノーマル':
      if (type1 === 'ゴースト') {
        magnification = 0;
        if (atSpCh === 'しんがん') {
          magnification = 1;
        }
      } else if (type1 === 'はがね' || type1 === 'いわ') {
        magnification *= 0.5;
      }
      break;
    case 'ほのお':
      if (type1 === 'ほのお' || type1 === 'みず' || type1 === 'いわ' || type1 === 'ドラゴン') {
        magnification *= 0.5;
      } else if (type1 === 'くさ' || type1 === 'こおり' || type1 === 'むし' || type1 === 'はがね') {
        magnification *= 2.0;
      }
      break;
    case 'みず':
      if (type1 === 'みず' || type1 === 'くさ' || type1 === 'ドラゴン') {
        magnification *= 0.5;
      } else if (type1 === 'ほのお' || type1 === 'じめん' || type1 === 'いわ') {
        magnification *= 2.0;
      }
      break;
    case 'でんき':
      if (type1 === 'みず' || type1 === 'ひこう') {
        magnification *= 2.0;
      } else if (type1 === 'でんき' || type1 === 'くさ' || type1 === 'ドラゴン') {
        magnification *= 0.5;
      } else if (type1 === 'じめん') {
        magnification = 0.0;
      }
      break;
    case 'くさ':
      if (
        type1 === 'ほのお' ||
        type1 === 'くさ' ||
        type1 === 'どく' ||
        type1 === 'ひこう' ||
        type1 === 'むし' ||
        type1 === 'ドラゴン' ||
        type1 === 'はがね'
      ) {
        magnification *= 0.5;
      } else if (type1 === 'みず' || type1 === 'じめん' || type1 === 'いわ') {
        magnification *= 2.0;
      }
      break;
    case 'こおり':
      if (type1 === 'くさ' || type1 === 'じめん' || type1 === 'ひこう' || type1 === 'ドラゴン') {
        magnification *= 2.0;
      } else if (type1 === 'ほのお' || type1 === 'みず' || type1 === 'こおり' || type1 === 'はがね') {
        magnification *= 0.5;
        if (skill.name === 'フリーズドライ' && type1 === 'みず') {
          magnification *= 4.0;
        }
      }
      break;
    case 'どく':
      if (type1 === 'どく' || type1 === 'いわ' || type1 === 'ゴースト' || type1 === 'じめん') {
        magnification *= 0.5;
      } else if (type1 === 'くさ' || type1 === 'フェアリー') {
        magnification *= 2.0;
      } else if (type1 === 'はがね') {
        magnification = 0.0;
      }
      break;
    case 'かくとう':
      if (type1 === 'ノーマル' || type1 === 'こおり' || type1 === 'あく' || type1 === 'いわ' || type1 === 'はがね') {
        magnification *= 2.0;
      } else if (
        type1 === 'どく' ||
        type1 === 'ひこう' ||
        type1 === 'エスパー' ||
        type1 === 'むし' ||
        type1 === 'フェアリー'
      ) {
        magnification *= 0.5;
      } else if (type1 === 'ゴースト') {
        if (atSpCh !== 'しんがん') {
          magnification = 0.0;
        }
      }
      break;
    case 'じめん':
      if (type1 === 'ほのお' || type1 === 'でんき' || type1 === 'どく' || type1 === 'いわ' || type1 === 'はがね') {
        magnification *= 2.0;
      } else if (type1 === 'くさ' || type1 === 'むし') {
        magnification *= 0.5;
      } else if (type1 === 'ひこう') {
        magnification = 0.0;
      }
      break;
    case 'ひこう':
      if (type1 === 'でんき' || type1 === 'いわ' || type1 === 'はがね') {
        magnification *= 0.5;
      } else if (type1 === 'くさ' || type1 === 'かくとう' || type1 === 'むし') {
        magnification *= 2.0;
      }
      break;
    case 'エスパー':
      if (type1 === 'かくとう' || type1 === 'どく') {
        magnification *= 2.0;
      } else if (type1 === 'エスパー' || type1 === 'はがね') {
        magnification *= 0.5;
      } else if (type1 === 'あく') {
        magnification = 0.0;
      }
      break;
    case 'むし':
      if (
        type1 === 'ほのお' ||
        type1 === 'かくとう' ||
        type1 === 'どく' ||
        type1 === 'ひこう' ||
        type1 === 'ゴースト' ||
        type1 === 'はがね' ||
        type1 === 'フェアリー'
      ) {
        magnification *= 0.5;
      } else if (type1 === 'くさ' || type1 === 'エスパー' || type1 === 'むし') {
        magnification *= 2.0;
      }
      break;
    case 'いわ':
      if (type1 === 'ほのお' || type1 === 'こおり' || type1 === 'ひこう' || type1 === 'むし') {
        magnification *= 2.0;
      } else if (type1 === 'かくとう' || type1 === 'じめん' || type1 === 'はがね' || type1 === 'いわ') {
        magnification *= 0.5;
      }
      break;
    case 'ゴースト':
      if (type1 === 'エスパー' || type1 === 'ゴースト') {
        magnification *= 2.0;
      } else if (type1 === 'あく') {
        magnification *= 0.5;
      } else if (type1 === 'ノーマル') {
        magnification *= 0;
      }
      break;
    case 'ドラゴン':
      if (type1 === 'ドラゴン') {
        magnification *= 2.0;
      } else if (type1 === 'はがね') {
        magnification *= 0.5;
      } else if (type1 === 'フェアリー') {
        magnification *= 0.0;
      }
      break;
    case 'あく':
      if (type1 === 'エスパー' || type1 === 'ゴースト') {
        magnification *= 2.0;
      } else if (type1 === 'かくとう' || type1 === 'あく' || type1 === 'フェアリー') {
        magnification *= 0.5;
      }
      break;
    case 'はがね':
      if (type1 === 'ほのお' || type1 === 'みず' || type1 === 'でんき' || type1 === 'はがね') {
        magnification *= 0.5;
      } else if (type1 === 'こおり' || type1 === 'いわ' || type1 === 'フェアリー') {
        magnification *= 2.0;
      }
      break;
    case 'フェアリー':
      if (type1 === 'ほのお' || type1 === 'どく' || type1 === 'はがね') {
        magnification = 0.5;
      } else if (type1 === 'かくとう' || type1 === 'ドラゴン' || type1 === 'あく') {
        magnification = 2.0;
      }
      break;
  }

  return magnification;
}

export function atMagnification(skillType: string, type1: string, type2: string, atTera: string): number {
  var magnification = 1.0;
  if (
    (atTera == skillType && (atTera == type1 || atTera == type2)) ||
    (atTera == 'ステラ' && (skillType == type1 || skillType == type2))
  ) {
    if (skillType != 'ステラ') {
      magnification *= 2.0;
    }
  } else if (skillType == atTera && skillType != 'ステラ') {
    magnification *= 6144 / 4096;
  } else if (atTera == 'ステラ') {
    magnification *= 1.2;
  } else {
    if (skillType == type1 || skillType == type2) {
      magnification *= 6144 / 4096;
    }
  }

  return magnification;
}

export function weatherMagnification(skill: Skill, weather: string): number {
  var retMag = 1.0;
  if (skill.type.name == 'ほのお') {
    if (weather == 'はれ') {
      retMag *= 1.5;
    } else if (weather == 'あめ') {
      retMag *= 0.5;
    }
  } else if (skill.type.name == 'みず') {
    if (weather == 'あめ') {
      retMag *= 1.5;
    } else if (weather == 'はれ') {
      retMag *= 0.5;
    }
  }
  return retMag;
}

export function specialRound(input: number): number {
  var retAct = input;
  if (input - Math.floor(input) == 0.5) {
    retAct = Math.floor(input);
  } else {
    retAct = Math.round(input);
  }
  return retAct;
}

export default Damage;
