import CheckBox from '@/components/atoms/CheckBox';
import { setLightScreen, setReflect } from '@/app/envSlice';
import { RootState } from '@/app/store';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const Screen: React.FC = () => {
  const dispatch = useDispatch();
  const reflect = useSelector((state: RootState) => state.env.reflect);
  const lightScreen = useSelector((state: RootState) => state.env.lightScreen);

  function reflectHandle(check: boolean) {
    dispatch(setReflect(check));
  }

  function lightScreenHandle(check: boolean) {
    dispatch(setLightScreen(check));
  }

  return (
    <div className="flex my-3 items-center">
      <CheckBox checked={reflect} handleChange={(e) => reflectHandle(e.target.checked)} content="リフレクター" />
      <div className="ml-3">
        <CheckBox checked={lightScreen} handleChange={(e) => lightScreenHandle(e.target.checked)} content="光の壁" />
      </div>
    </div>
  );
};

export default Screen;
