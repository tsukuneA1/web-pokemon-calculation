import React from 'react';
import ImageComponent from '@/components/atoms/Image';
import SearchBox, { Pokemon } from '@/components/atoms/SearchBox';
import TribeComponent from '@/components/atoms/Tribe';
import Types from '@/components/atoms/Types';
import TerastalTag from '@/components/atoms/TerastalTag';
import { Type } from '@/interfaces';

interface PokeInfoProps {
  pokeSrc: string;
  imageWidth: number;
  imageHeight: number;
  imageRadius: string;
  searchText: string;
  searchTextHeight: number;
  searchTextFontSize: string;
  tribeText: string;
  height: number;
  fontSize: string;
  typeSrc1: string;
  typeSrc2: string;
  typeHeight: number;
  terastalSrc: string;
  onSearchClicked: (poke: Pokemon) => void;
  onTerastalClicked: (type: Type) => void;
}

const PokeInfo: React.FC<PokeInfoProps> = ({
  pokeSrc,
  imageWidth,
  imageHeight,
  imageRadius,
  searchText,
  searchTextHeight,
  searchTextFontSize,
  tribeText,
  height,
  fontSize,
  typeSrc1,
  typeSrc2,
  typeHeight,
  terastalSrc,
  onSearchClicked,
  onTerastalClicked,
}) => {
  return (
    <div style={styles.pokeInfo} className="w-full">
      <ImageComponent
        src={pokeSrc}
        width={200}
        height={imageHeight}
        alt="poke Image"
        backgroundColor="#e2e2e2"
        borderRadius={imageRadius}
      />
      <div className="w-2/3 md:3/4 mt-0 ml-2 sm:ml-3 md:ml-4 lg:ml-5">
        <SearchBox
          width={100}
          height={searchTextHeight}
          text={searchText}
          fontSize={searchTextFontSize}
          onClick={onSearchClicked}
        />
        <div className="mt-0 sm:mt-1 md:mt-2">
          <TribeComponent tribe={tribeText} />
        </div>
        <div className="mt-0 sm:mt-1 md:mt-2">
          <Types src1={typeSrc1} src2={typeSrc2} fontSize={fontSize} />
        </div>

        <div className="mt-0 sm:mt-1 md:mt-2">
          <TerastalTag src={terastalSrc} onClick={() => {}} teraSelected={(type: Type) => onTerastalClicked(type)} />
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
