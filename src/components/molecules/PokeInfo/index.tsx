import React from 'react';
import ImageComponent from '@/components/atoms/Image';
import SearchBox, { Pokemon } from '@/components/atoms/SearchBox';
import TribeComponent from '@/components/atoms/Tribe';
import Types from '@/components/atoms/Types';
import TerastalTag from '@/components/atoms/TerastalTag';
import { Type } from '@/interfaces';
import { useRouter } from 'next/router';

interface PokeInfoProps {
  pokeSrc: string;
  imageWidth: number;
  imageHeight: number;
  imageRadius: string;
  searchText: string;
  tribeText: string;
  type1: Type;
  type2: Type;
  typeHeight: number;
  terastalType: Type;
  onSearchClicked: (poke: Pokemon) => void;
  onTerastalClicked: (type: Type) => void;
}

const PokeInfo: React.FC<PokeInfoProps> = ({
  pokeSrc,
  imageHeight,
  imageRadius,
  searchText,
  tribeText,
  type1,
  type2,
  terastalType,
  onSearchClicked,
  onTerastalClicked,
}) => {
  const router = useRouter();

  const handleClick = () => {
    router.push({
      pathname: '../../../../SavedPokePage/',
      query: { attack: 'attack' },
    });
  };
  return (
    <div style={styles.pokeInfo} className="w-full">
      <div
        onClick={() => {
          handleClick();
        }}
        className="cursor-pointer"
      >
        <ImageComponent
          src={pokeSrc}
          width={200}
          height={imageHeight}
          alt="poke Image"
          backgroundColor="#e2e2e2"
          borderRadius={imageRadius}
        />
      </div>

      <div className="w-auto mt-0 ml-2 sm:ml-3 md:ml-4 lg:ml-5">
        <SearchBox text={searchText} onClick={onSearchClicked} />
        <div className="mt-0 sm:mt-1 md:mt-2">
          <TribeComponent tribe={tribeText} />
        </div>
        <div className="mt-0 sm:mt-1 md:mt-2 flex">
          <Types type1={type1} type2={type2} />
          <TerastalTag type={terastalType} onClick={() => {}} teraSelected={(type: Type) => onTerastalClicked(type)} />
        </div>
      </div>
    </div>
  );
};

const styles = {
  pokeInfo: {
    display: 'flex',
  },
};

export default PokeInfo;
