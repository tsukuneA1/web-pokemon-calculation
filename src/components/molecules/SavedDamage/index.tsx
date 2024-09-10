import React, { useState } from 'react';
import { SavedDamage } from '@/app/damageSlice';
import { atMagnification, damageCalculate, typeMagnification } from '@/components/organisms/Damage';
import {
  damageStrCalc,
  finalAtActualCalc,
  finalDamageMagnification,
  finalDfActualCalc,
  finalSkillPowerCalc,
  strCalc,
} from '@/function/function';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { typeInterface } from '@/interfaces';
import DamageDialog from '../DamageDialog';
import Header from '../Header';
import {
  BookmarkAddSharp,
  DeleteForeverRounded,
  Detail,
  MiddleDeleteForeverRounded,
  MiddleDetail,
  MiniBookmarkAddSharp,
  MiniDeleteForeverRounded,
  MiniDetail,
} from '@/components/icons/Icons';
import SavedPokeInfo from '../SavedPokeInfo';
import SavedDamageBar from '../SavedDamageBar';
import { Tooltip } from '@nextui-org/tooltip';
import { Button } from '@nextui-org/react';
import { useWindowSize } from '@/function/GetWindowSize';
import ExtraHeader from '../ExtraHeader';

interface savedDamageProps {
  stat: SavedDamage;
  del: () => void;
}

const SavedDamageComponent: React.FC<savedDamageProps> = ({ stat, del }) => {
  const dfPoke = useSelector((state: RootState) => state.defender.poke);
  const hActual = useSelector((state: RootState) => state.defender.hActual);
  const bActual = useSelector((state: RootState) => state.defender.bActual);
  const dActual = useSelector((state: RootState) => state.defender.dActual);
  const dfTera = stat.dfTera;

  const [fold, setFold] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);

  const atPoke = stat.atPoke;
  const tribes = `${atPoke.hp}-${atPoke.attack}-${atPoke.defence}-${atPoke.specialAttack}-${atPoke.specialDefence}-${atPoke.speed}`;
  const atSpCh = stat.currentAbility;
  const skill = stat.selectedSkill;

  let atActual = stat.atActual;
  stat.burn && stat.selectedSkill.classification === '物理' && (atActual = Math.floor(atActual / 2));

  let dfType1 = dfPoke.types[0].name;
  let dfType2 = dfPoke.types[1].name;
  if (dfTera != typeInterface[0] && dfTera != typeInterface[19]) {
    dfType1 = dfTera.name;
    dfType2 = 'null';
  } else {
    dfType1 = dfPoke.types[0].name;
    dfType2 = dfPoke.types[1].name;
  }

  let dfRank = stat.dfRank;
  var dfActual = bActual;
  if (!stat.referAt) {
    dfActual = dActual;
  }

  let dfSpCh = stat.dfAbility;

  const typeMag = stat.preeminence
    ? 2
    : typeMagnification(skill, dfType1, atSpCh) * typeMagnification(skill, dfType2, atSpCh);
  const finalDamageMag = finalDamageMagnification(
    atPoke,
    dfPoke,
    skill,
    stat.reflect,
    stat.lightScreen,
    atSpCh,
    stat.effect,
    dfSpCh,
    stat.dfEffect,
    typeMag,
  );

  let calculatedDamage = damageCalculate(
    finalAtActualCalc(atPoke, dfPoke, atActual, atSpCh, dfSpCh, skill, stat.atRank, stat.effect),
    finalDfActualCalc(dfActual, atSpCh, dfSpCh, stat.dfEffect, dfRank, skill, dfType1, dfType2, stat.weather),
    typeMag,
    atMagnification(skill.type.name, atPoke.types[0].name, atPoke.types[1].name, stat.atTera.name),
    skill,
    finalSkillPowerCalc(atPoke, skill, atSpCh, stat.effect, stat.field),
    stat.critical,
    stat.weather,
    finalDamageMag,
  );

  for (let i = 0; i < calculatedDamage.length; i++) {
    calculatedDamage[i] *= stat.attackTime;
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

  const skillText = `${stat.selectedSkill.name} ${stat.selectedSkill.type.name} ${stat.selectedSkill.power} ${stat.selectedSkill.classification}`;

  const windowSize = useWindowSize();
  return (
    <div className="w-full mt-10">
      <ExtraHeader
      title="追加ダメージ"
      icon={windowSize.width < 640 ? <MiniBookmarkAddSharp /> : <BookmarkAddSharp />}
      fold={fold}
      onIconClick={() => setFold(!fold)}
      width={windowSize.width}
      openDialog={openDialog}
      del={del}
      />
      {fold ? (
        <>
        <DamageDialog
            isOpen={isDialogOpen}
            onClose={closeDialog}
            stat={stat}
            pos1={pos1}
            pos2={pos2}
            damageText={damageText}
          />
        </>
      ) : (
        <div>
          <div className="flex bg-gray-10 rounded-b-2xl p-1 sm:p-2 md:p-5 lg:pr-7 w-full justify-between">
            <div className="w-full pointer-events-none">
              <SavedPokeInfo
                pokeSrc={stat.atPoke.src}
                searchText={stat.atPoke.name}
                tribeText={tribes}
                type1={stat.atPoke.types[0]}
                type2={stat.atPoke.types[1]}
                terastalType={stat.atTera}
              />
              <div className="text-sm sm:text-base md:text-lg text-start mt-5 mb-0 pb-0 ">{skillText}</div>
              <div className='pr-5'>
              <SavedDamageBar pos1={pos1} pos2={pos2} damageText={damageText} />
              </div>
              
            </div>
            {/* <div className="flex justify-items-end">
              <Tooltip showArrow={true} content="詳細" color="warning" className="capitalize bg-gray-10 rounded-lg">
                <Button onClick={openDialog} className="pl-1 py-0 pr-0">
                  {windowSize.width < 640 ? <MiniDetail /> : windowSize.width < 1280 ? <MiddleDetail /> : <Detail />}
                </Button>
              </Tooltip>
              <div className="w-10">
                <Tooltip showArrow={true} content="消去" color="warning" className="capitalize bg-gray-10 rounded-lg">
                  <Button onClick={del} className="pl-1 py-0 pr-0 md:pl-2">
                    {windowSize.width < 640 ? (
                      <MiniDeleteForeverRounded />
                    ) : windowSize.width < 1280 ? (
                      <MiddleDeleteForeverRounded />
                    ) : (
                      <DeleteForeverRounded />
                    )}
                  </Button>
                </Tooltip>
              </div>
            </div> */}
          </div>
          <DamageDialog
            isOpen={isDialogOpen}
            onClose={closeDialog}
            stat={stat}
            pos1={pos1}
            pos2={pos2}
            damageText={damageText}
          />
        </div>
      )}
    </div>
  );
};

export default SavedDamageComponent;
