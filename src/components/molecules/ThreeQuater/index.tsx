import CheckBox from '@/components/atoms/CheckBox';
import { RootState, setThreeQuaters } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';

const ThreeQuaters: React.FC = () => {
  const dispatch = useDispatch();
  const threeQuaters = useSelector((state: RootState) => state.stats.threeQuaters);
  const skill = useSelector((state: RootState) => state.stats.selectedSkill);

  if (skill.name === 'はたきおとす') {
    return (
      <div>
        <CheckBox
          content="技威力3/2倍"
          checked={threeQuaters}
          handleChange={(e) => dispatch(setThreeQuaters(e.target.checked))}
        />
      </div>
    );
  } else {
    dispatch(setThreeQuaters(false));
  }
};

export default ThreeQuaters;
