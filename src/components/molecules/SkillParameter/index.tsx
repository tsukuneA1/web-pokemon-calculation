import React from 'react';
import ImageButton from '@/components/atoms/ImageButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, setAtTera } from '@/app/store';
import SkillSearchBox from '@/components/atoms/SkillSearch';
import { typeInterface } from '@/interfaces';
import StellaButton from '@/components/atoms/StellaButton';
import { useWindowSize } from '@/function/GetWindowSize';

const SkillParameter: React.FC = () => {
  const dispatch = useDispatch();
  const skill = useSelector((state: RootState) => state.stats.selectedSkill);
  const atTera = useSelector((state: RootState) => state.stats.atTera);

  function buttonClicked() {
    atTera === typeInterface[0] ? dispatch(setAtTera(skill.type)) : dispatch(setAtTera(typeInterface[0]));
  }

  const src = atTera === typeInterface[19] ? typeInterface[0].typeIconSrc : atTera.typeIconSrc;

  const windowSize = useWindowSize();
  return (
    <div style={{ marginTop: '10px' }}>
      <h4 style={{ textAlign: 'left' }}>技</h4>
      <div style={{ display: 'flex' }}>
        <SkillSearchBox />
        <div className="mx-2">
          <ImageButton
            width={windowSize.width < 640 ? 40 : 50}
            onClick={buttonClicked}
            src={src}
            ariaLabel={atTera.name}
          />
        </div>
        <StellaButton width={50} />
      </div>
    </div>
  );
};

export default SkillParameter;
