import CheckBox from '@/components/atoms/CheckBox';
import { RootState, setBurn } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';

const Burn: React.FC = () => {
  const dispatch = useDispatch();
  const referAt = useSelector((state: RootState) => state.stats.referAt);
  const burn = useSelector((state: RootState) => state.stats.burn);

  if (referAt) {
    return <CheckBox content="やけど" checked={burn} handleChange={(e) => dispatch(setBurn(e.target.checked))} />;
  }
};

export default Burn;
