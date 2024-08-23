import { customSkill } from '@/components/atoms/SkillSearch';
import { ArrowUpLeftBold, FireCircle, MiniArrowUpLeftBold, MiniFireCircle } from '@/components/icons/Icons';
import { useWindowSize } from '@/function/GetWindowSize';
import React from 'react';

interface skillSuggestionProps {
  skill: customSkill;
}

const SkillSuggestion: React.FC<skillSuggestionProps> = ({ skill }) => {
  const skillInfo = `${skill.power} ${skill.type} ${skill.classification}`;
  const windowSize = useWindowSize();
  return (
    <div className="flex items-center justify-between w-full border-b-gray-400">
      <div className="flex items-center">
        {windowSize.width < 640 ? <MiniFireCircle/> : <FireCircle />}
        <div className="text-sm sm:text-base block items-start justify-items-start text-start ml-2">
          {skill.name}
          <div className='text-xs sm:text-base'>{skillInfo}</div>
        </div>
      </div>
      {windowSize.width < 640 ? <MiniArrowUpLeftBold /> : <ArrowUpLeftBold />}
    </div>
  );
};

export default SkillSuggestion;
