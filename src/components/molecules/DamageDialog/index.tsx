import { ranks } from '@/components/atoms/DropdownAndButtons';
import ImageComponent from '@/components/atoms/Image';
import { ChevronDoubleRight } from '@/components/icons/Icons';
import { SavedDamage } from '@/app/damageSlice';
import { RootState } from '@/app/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import DamageBar from '../DamageBar';
import SavedDamageBar from '../SavedDamageBar';
import { useWindowSize } from '@/function/GetWindowSize';

const overlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  minWidth: '380px',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const dialogBoxStyle: React.CSSProperties = {
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
};

const buttonStyle: React.CSSProperties = {
  marginTop: '10px',
};

interface DamageDialogProps {
  isOpen: boolean;
  onClose: () => void;
  stat: SavedDamage;
  pos1: number;
  pos2: number;
  damageText: string;
}

const DamageDialog: React.FC<DamageDialogProps> = ({ isOpen, onClose, stat, pos1, pos2, damageText }) => {
  const dfPoke = useSelector((state: RootState) => state.defender.poke);
  const bActual = useSelector((state: RootState) => state.defender.bActual);
  const dActual = useSelector((state: RootState) => state.defender.dActual);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  let dfActual = bActual;
  if (!stat.referAt) {
    dfActual = dActual;
  }

  return (
    <div style={overlayStyle} onClick={onClose} className="z-50">
      <div
        style={dialogBoxStyle}
        className="p-3 min-w-[360px] md:min-w-[400px]"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <h4 className="text-center">詳細</h4>
        <div className="flex justify-between items-center">
          <ImageComponent
            src={stat.atPoke.src}
            width={100}
            height={100}
            alt="poke Image"
            backgroundColor="#e2e2e2"
            borderRadius="10px"
          />
          <ChevronDoubleRight />
          <ImageComponent
            src={dfPoke.src}
            width={50}
            height={50}
            alt="poke Image"
            backgroundColor="#e2e2e2"
            borderRadius="10px"
          />
        </div>
        <div className="flex text-xs sm:text-sm w-full">
          <div className="text-start w-1/3">
            <div className="my-2">{stat.atPoke.name}</div>
            <div className="my-2">{stat.atActual}</div>
            <div className="my-2">{ranks[stat.atRank]}</div>
            <div className="my-2">{stat.currentAbility === 'null' ? 'なし' : stat.currentAbility}</div>
            <div className="my-2">{stat.effect}</div>
            <div className="my-2">{stat.atTera.name}</div>
          </div>
          <div className="text-center items-center w-1/3">
            <div className="my-2 text-center">ポケモン名</div>
            <div className="my-2">実数値</div>
            <div className="my-2">ランク補正</div>
            <div className="my-2">特性(適用中)</div>
            <div className="my-2">持ち物</div>
            <div className="my-2">テラスタル</div>
          </div>
          <div className="text-end items-end justify-items-end w-1/3">
            <div className="my-2 text-end">{dfPoke.name}</div>
            <div className="my-2 text-end">{dfActual}</div>
            <div className="my-2 text-end">{ranks[stat.dfRank]}</div>
            <div className="my-2 text-end">{stat.dfAbility === 'null' ? 'なし' : stat.dfAbility}</div>
            <div className="my-2 text-end">{stat.dfEffect}</div>
            <div className="my-2 text-end">{stat.dfTera.name}</div>
          </div>
        </div>
        <div className="border-t-2 py-3 text-sm md:text-base">
          <h4 className="text-center">環境</h4>
          <div className="flex justify-center text-xs sm:text-sm">
            <div>天候: {stat.weather}</div>
            <div className="ml-5">フィールド: {stat.field}</div>
          </div>
          <div className="flex justify-center text-xs sm:text-sm">
            <div>リフレクター: {stat.reflect ? 'あり' : 'なし'}</div>
            <div className="ml-5">光の壁: {stat.lightScreen ? 'あり' : 'なし'}</div>
          </div>
        </div>

        <div className="flex items-start border-t-2 pt-3 text-sm sm:text-base">
          {stat.selectedSkill.name}
          <div className="ml-2">{stat.selectedSkill.type.name}</div>
          <div className="ml-2">{stat.selectedSkill.power}</div>
          <div className="ml-2">{stat.selectedSkill.classification}</div>
          <div className="ml-2">{stat.burn && stat.selectedSkill.classification === '物理' ? 'やけど' : ''}</div>
        </div>
        <SavedDamageBar pos1={pos1} pos2={pos2} damageText={damageText} />
      </div>
    </div>
  );
};

export default DamageDialog;
