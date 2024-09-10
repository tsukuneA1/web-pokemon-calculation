import AutoTypeImage from '@/components/atoms/AutoTypeImage';
import TribeComponent from '@/components/atoms/Tribe';
import TypeImage from '@/components/atoms/TypeImage';
import Types from '@/components/atoms/Types';
import { Type, typeInterface } from '@/interfaces';
import Image from 'next/image';

interface savedPokeInfoProps {
  pokeSrc: string;
  searchText: string;
  tribeText: string;
  type1: Type;
  type2: Type;
  terastalType: Type;
}

const SavedPokeInfo: React.FC<savedPokeInfoProps> = ({
  pokeSrc,
  searchText,
  tribeText,
  type1,
  type2,
  terastalType,
}) => {
  return (
    <div className="flex w-full">
      <div
        style={{
          ...styles.border,
          borderRadius: '20px',
          backgroundColor: '#e2e2e2',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        className="w-20 h-20 md:w-28 md:h-28"
      >
        <Image src={pokeSrc} width={100} height={100} alt={'src'} layout="responsive" objectFit="cover" />
      </div>
      <div className="w-3/4 mt-0 ml-2 sm:ml-3 md:ml-5">
        <div className="border-b-2 text-base sm:text-lg text-start">{searchText}</div>
        <div className="mt-0 sm:mt-1">
          <TribeComponent tribe={tribeText} />
        </div>
        <div className="mt-0 sm:mt-1 flex">
          <AutoTypeImage type={type1}/>
          {(typeInterface.includes(type2))
            ? (<AutoTypeImage type={type2}/>)
            : (<></>)
          }
          <AutoTypeImage
            type={terastalType}
          />
        </div>
      </div>
    </div>
  );
};

const styles = {
  terastal: {
    display: 'flex',
    alignItems: 'center',
  },
  button: {
    border: 'none',
    backgroundColor: '#ffffff',
    cursor: 'pointer',
  },
  border: {
    border: '2px solid ##540909',
  },
};

export default SavedPokeInfo;
