import { Pokemon } from '@/components/atoms/SearchBox';
import { ArrowUpLeftBold, CatchingPokemon, MiniArrowUpLeftBold, MiniCatchingPokemon } from '@/components/icons/Icons';
import { useWindowSize } from '@/function/GetWindowSize';
import React from 'react';

interface suggestionProps {
  poke: Pokemon;
}

const PokeSuggestion: React.FC<suggestionProps> = ({ poke }) => {
  const windowSize = useWindowSize();
  const tribe = `${poke.hp}-${poke.attack}-${poke.defence}-${poke.spAttack}-${poke.spDefence}-${poke.speed}`;
  return (
    <div className="flex items-center justify-between w-full border-b-gray-400">
      <div className="flex items-center">
        {windowSize.width < 640 ? <MiniCatchingPokemon /> : <CatchingPokemon />}
        <div className="text-sm sm:text-base first-letter:block items-start justify-items-start text-start ml-2">
          {poke.name}
          <div className="text-xs sm:text-base">{tribe}</div>
        </div>
      </div>
      {windowSize.width < 640 ? <MiniArrowUpLeftBold /> : <ArrowUpLeftBold />}
    </div>
  );
};

export default PokeSuggestion;
