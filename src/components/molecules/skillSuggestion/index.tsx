import { customSkill } from '@/components/atoms/SkillSearch';
import { ArrowUpLeftBold, FireCircle } from '@/components/icons/Icons';
import React from 'react';

interface skillSuggestionProps {
  skill: customSkill;
}

const SkillSuggestion: React.FC<skillSuggestionProps> = ({ skill }) => {
  const skillInfo = `${skill.power} ${skill.type} ${skill.classification}`;
  return (
    <div className="flex items-center justify-between w-full border-b-gray-400">
      <div className="flex items-center">
        <FireCircle />
        <div className="block items-start justify-items-start text-start ml-2">
          {skill.name}
          <div>{skillInfo}</div>
        </div>
      </div>
      <ArrowUpLeftBold />
    </div>
  );
};

export default SkillSuggestion;
