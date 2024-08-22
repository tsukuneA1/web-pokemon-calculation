import DropdownButtons from '@/components/atoms/DropdownAndButtons';
import ExtraDamageDropdown from '@/components/atoms/ExtraDamageDropdown';
import { setEighth, setFourth, setHalf, setSixteenth, setSixth, setTenth } from '@/pages/app/envSlice';
import { RootState } from '@/pages/app/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const ExtraDamage: React.FC = () => {
  const dispatch = useDispatch();
  const sixteenth = useSelector((state: RootState) => state.env.sixteenthDamage);
  const tenth = useSelector((state: RootState) => state.env.tenthDamage);
  const eighth = useSelector((state: RootState) => state.env.eighthDamage);
  const sixth = useSelector((state: RootState) => state.env.sixthDamage);
  const fourth = useSelector((state: RootState) => state.env.fourthDamage);
  const half = useSelector((state: RootState) => state.env.halfDamage);

  return (
    <div>
      <div className="flex">
        <ExtraDamageDropdown
          title="¹⁄₁₆ダメージ"
          selected={sixteenth}
          options={[0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 10, 11, 12, 13, 14, 15]}
          onSelect={(option) => dispatch(setSixteenth(option))}
          width="120px"
          buttonWidth="60px"
          buttonHeight="35px"
          buttonColor="#6652b5"
          buttonBackground="#ece9fb"
          buttonRadius="20px"
          buttonFontSize={16}
        />
        <ExtraDamageDropdown
          title="¹⁄₁₀ダメージ"
          selected={tenth}
          options={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
          onSelect={(option) => dispatch(setTenth(option))}
          width="120px"
          buttonWidth="60px"
          buttonHeight="35px"
          buttonColor="#6652b5"
          buttonBackground="#ece9fb"
          buttonRadius="20px"
          buttonFontSize={16}
        />
      </div>
      <div className="flex">
        <ExtraDamageDropdown
          title="¹⁄₈ダメージ"
          selected={eighth}
          options={[0, 1, 2, 3, 4, 5, 6, 7]}
          onSelect={(option) => dispatch(setEighth(option))}
          width="120px"
          buttonWidth="60px"
          buttonHeight="35px"
          buttonColor="#6652b5"
          buttonBackground="#ece9fb"
          buttonRadius="20px"
          buttonFontSize={16}
        />
        <ExtraDamageDropdown
          title="¹⁄₆ダメージ"
          selected={sixth}
          options={[0, 1, 2, 3, 4, 5]}
          onSelect={(option) => dispatch(setSixth(option))}
          width="120px"
          buttonWidth="60px"
          buttonHeight="35px"
          buttonColor="#6652b5"
          buttonBackground="#ece9fb"
          buttonRadius="20px"
          buttonFontSize={16}
        />
      </div>
      <div className="flex">
        <ExtraDamageDropdown
          title="¹⁄₄ダメージ"
          selected={fourth}
          options={[0, 1, 2, 3]}
          onSelect={(option) => dispatch(setFourth(option))}
          width="120px"
          buttonWidth="60px"
          buttonHeight="35px"
          buttonColor="#6652b5"
          buttonBackground="#ece9fb"
          buttonRadius="20px"
          buttonFontSize={16}
        />
        <ExtraDamageDropdown
          title="¹⁄₂ダメージ"
          selected={half}
          options={[0, 1]}
          onSelect={(option) => dispatch(setHalf(option))}
          width="120px"
          buttonWidth="60px"
          buttonHeight="35px"
          buttonColor="#6652b5"
          buttonBackground="#ece9fb"
          buttonRadius="20px"
          buttonFontSize={16}
        />
      </div>
    </div>
  );
};

export default ExtraDamage;
