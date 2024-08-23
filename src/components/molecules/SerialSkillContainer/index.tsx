import DropdownNumber from '@/components/atoms/DropdownNumberButton';
import { RootState, setAttackTime } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';

const serialOneToFive = [
  'スイープビンタ',
  'スケイルショット',
  'タネマシンガン',
  'つっぱり',
  'ボーンラッシュ',
  'ミサイルばり',
  'みずしゅりけん',
  'みだれづき',
  'みだれひっかき',
  'ロックブラスト',
  'つららばり',
];
const serialOneToTwo = [
  'タキオンカッター',
  'ダブルアッタク',
  'ダブルウイング',
  'ツインビーム',
  'ドラゴンアロー',
  'にどげり',
];
const serialOneToThree = ['すいりゅうれんだ', 'トリプルダイブ', 'トリプルアクセル', 'トリプルキック'];

const SerialSkillContainer: React.FC = () => {
  const dispatch = useDispatch();
  const skill = useSelector((state: RootState) => state.stats.selectedSkill);
  function onClick(option: number) {
    dispatch(setAttackTime(option));
  }

  if (serialOneToFive.includes(skill.name)) {
    dispatch(setAttackTime(5));
    return (
      <div className="flex items-start justify-start my-3">
        <DropdownNumber
          title="攻撃回数"
          width="120px"
          initialPos={4}
          options={[1, 2, 3, 4, 5]}
          selected={0}
          onSelect={(selectedOption: number) => onClick(selectedOption)}
        />
      </div>
    );
  } else if (serialOneToTwo.includes(skill.name)) {
    dispatch(setAttackTime(2));
    return (
      <div className="flex items-start justify-start my-3">
        <DropdownNumber
          title="攻撃回数"
          width="50%"
          initialPos={1}
          options={[1, 2]}
          selected={0}
          onSelect={(selectedOption: number) => onClick(selectedOption)}
        />
      </div>
    );
  } else if (serialOneToThree.includes(skill.name)) {
    dispatch(setAttackTime(3));
    return (
      <div className="flex items-start justify-start my-3">
        <DropdownNumber
          title="攻撃回数"
          width="50%"
          initialPos={2}
          options={[1, 2, 3]}
          selected={0}
          onSelect={(selectedOption: number) => onClick(selectedOption)}
        />
      </div>
    );
  } else if (skill.name === 'ネズミざん') {
    dispatch(setAttackTime(10));
    return (
      <div className="flex items-start justify-start my-3">
        <DropdownNumber
          title="攻撃回数"
          width="50%"
          initialPos={9}
          options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          selected={0}
          onSelect={(selectedOption: number) => onClick(selectedOption)}
        />
      </div>
    );
  } else {
    dispatch(setAttackTime(1));
  }
};

export default SerialSkillContainer;
