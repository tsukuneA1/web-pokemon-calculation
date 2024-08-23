import TribeComponent from '@/components/atoms/Tribe';
import Types from '@/components/atoms/Types';
import Image from 'next/image';

interface savedPokeInfoProps {
  pokeSrc: string;
  searchText: string;
  tribeText: string;
  typeSrc1: string;
  typeSrc2: string;
  terastalSrc: string;
}

const SavedPokeInfo: React.FC<savedPokeInfoProps> = ({
  pokeSrc,
  searchText,
  tribeText,
  typeSrc1,
  typeSrc2,
  terastalSrc,
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
        className="w-24 h-24 md:w-36 md:h-36"
      >
        <Image src={pokeSrc} width={100} height={100} alt={'src'} layout="responsive" objectFit="cover" />
      </div>
      <div className="w-2/3 md: 3/4 mt-0 ml-2 sm:ml-3 md:ml-5">
        <div className="border-b-2 text-lg sm:text-xl md:text-2xl text-start">{searchText}</div>
        <div className="mt-0 sm:mt-1 md:mt-2">
          <TribeComponent tribe={tribeText} />
        </div>
        <div className="mt-0 sm:mt-1 md:mt-2">
          <Types src1={typeSrc1} src2={typeSrc2} fontSize="16px" />
        </div>
        <div className="mt-0 sm:mt-1 md:mt-2">
          <div style={styles.terastal}>
            <p style={{ margin: '0px' }} className="text-sm sm:text-base md:text-lg mr-4">
              テラスタル:
            </p>
            <div
              style={{
                ...styles.button,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              className="h-4 w-16 sm:h-5 sm:w-20 md:h-6.4 md:w-24"
            >
              <Image
                src={terastalSrc}
                alt="テラスタルImage"
                layout="responsive"
                width={80}
                height={20}
                objectFit="contain"
              />
            </div>
          </div>
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
