import { RootState, setAtTera } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';
import Image from 'next/image';
import { typeInterface } from '@/interfaces';

interface StellaButtonProps {
  width: number;
}

const StellaButton: React.FC<StellaButtonProps> = () => {
  const dispatch = useDispatch();
  const atTera = useSelector((state: RootState) => state.stats.atTera);

  function buttonClicked() {
    if (atTera === typeInterface[19]) {
      dispatch(setAtTera(typeInterface[0]));
    } else {
      dispatch(setAtTera(typeInterface[19]));
    }
  }

  let src = '/images/types/stella.png';
  atTera === typeInterface[19] ? (src = typeInterface[19].typeIconSrc) : (src = '/images/types/stella.png');

  return (
    <div
      style={{
        borderRadius: '50%',
        backgroundColor: '#e2e2e2',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      className="w-10 h-10 sm:w-12 sm:h-12"
    >
      <button onClick={buttonClicked} style={{ backgroundColor: '#e2e2e2', borderRadius: '50%', border: 'none' }}>
        <div
          style={{
            borderRadius: '50%',
            backgroundColor: '#e2e2e2',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          className="w-8 h-8 sm:w-10 sm:h-10"
        >
          <Image
            src={src}
            width={100}
            height={100}
            layout="responsive"
            alt="alt"
            objectFit="cover"
            className="w-4/5 h-4/5"
          />
        </div>
      </button>
    </div>
  );
};

export default StellaButton;
